'use client'

import { useCallback, useEffect, useState } from 'react'
import { LIVE_POLL_INTERVAL_MS } from '@/lib/youtube/youtube.types'
import type { LiveStreamData } from '@/components/live-banner/types'
import { formatElapsedLiveTime } from '@/components/live-banner/utils/formatters'

export function useLiveStreamData() {
    const [data, setData] = useState<LiveStreamData | null>(null)
    const [elapsed, setElapsed] = useState('')
    const [dismissed, setDismissed] = useState(false)

    const checkLiveStatus = useCallback(async () => {
        try {
            const response = await fetch('/api/youtube/live', { cache: 'no-store' })
            if (!response.ok) return

            const payload = (await response.json()) as LiveStreamData
            setData(payload)
        } catch {
            // Intentionally silent. A live status check should never disrupt the page.
        }
    }, [])

    useEffect(() => {
        checkLiveStatus()

        const intervalId = setInterval(checkLiveStatus, LIVE_POLL_INTERVAL_MS)
        return () => clearInterval(intervalId)
    }, [checkLiveStatus])

    useEffect(() => {
        if (!data?.isLive) return

        setElapsed(formatElapsedLiveTime(data.startedAt))

        const timerId = setInterval(() => {
            setElapsed(formatElapsedLiveTime(data.startedAt))
        }, 60_000)

        return () => clearInterval(timerId)
    }, [data])

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