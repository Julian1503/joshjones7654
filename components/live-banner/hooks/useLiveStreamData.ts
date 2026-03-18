'use client'

import { useCallback, useEffect, useState } from 'react'
import { LIVE_POLL_INTERVAL_MS } from '@/lib/youtube/youtube.types'
import type { LiveStreamData } from '@/components/live-banner/types'
import { formatElapsedLiveTime } from '@/components/live-banner/utils/formatters'

const MIN_FETCH_GAP_MS = 10_000
let inFlightLiveRequest: Promise<LiveStreamData | null> | null = null
let lastLivePayload: LiveStreamData | null = null
let lastFetchAt = 0

async function fetchLiveStatus() {
    const now = Date.now()
    if (lastLivePayload && now - lastFetchAt < MIN_FETCH_GAP_MS) {
        return lastLivePayload
    }

    if (inFlightLiveRequest) {
        return inFlightLiveRequest
    }

    inFlightLiveRequest = (async () => {
        try {
            const response = await fetch('/api/youtube/live')
            if (!response.ok) return null

            const payload = (await response.json()) as LiveStreamData
            lastLivePayload = payload
            lastFetchAt = Date.now()
            return payload
        } catch {
            // Intentionally silent. A live status check should never disrupt the page.
            return null
        } finally {
            inFlightLiveRequest = null
        }
    })()

    return inFlightLiveRequest
}

export function useLiveStreamData() {
    const [data, setData] = useState<LiveStreamData | null>(null)
    const [elapsed, setElapsed] = useState('')
    const [dismissed, setDismissed] = useState(false)

    const checkLiveStatus = useCallback(async () => {
        const payload = await fetchLiveStatus()
        if (!payload) return

        setData(payload)
        setElapsed(payload.isLive ? formatElapsedLiveTime(payload.startedAt) : '')
    }, [])

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null

        const poll = () => {
            void checkLiveStatus()
        }

        const startPolling = () => {
            if (intervalId !== null) return
            poll()
            intervalId = setInterval(poll, LIVE_POLL_INTERVAL_MS)
        }

        const stopPolling = () => {
            if (intervalId === null) return
            clearInterval(intervalId)
            intervalId = null
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopPolling()
                return
            }

            startPolling()
        }

        startPolling()
        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            stopPolling()
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [checkLiveStatus])

    useEffect(() => {
        if (!data?.isLive) return

        const timerId = setInterval(() => {
            setElapsed(formatElapsedLiveTime(data.startedAt))
        }, 60_000)

        return () => clearInterval(timerId)
    }, [data?.isLive, data?.startedAt])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDismissed(true)
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [])

    return {
        data,
        elapsed,
        dismissed,
        setDismissed,
    }
}