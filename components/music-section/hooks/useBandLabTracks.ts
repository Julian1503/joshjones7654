'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { BandLabTrack } from '@/components/music-section/types'

const BANDLAB_REFRESH_INTERVAL_MS = 5 * 60 * 1000

export function useBandLabTracks() {
    const [tracks, setTracks] = useState<BandLabTrack[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const isMountedRef = useRef(true)

    const fetchTracks = useCallback(async (isInitialLoad: boolean) => {
        if (isInitialLoad) {
            setLoading(true)
        }

        try {
            const response = await fetch('/api/bandlab', {
                method: 'GET',
                cache: 'no-store',
            })
            const data = (await response.json()) as { error?: string; tracks?: BandLabTrack[] }
            if (!isMountedRef.current) return

            if (!response.ok || data.error) {
                setError(data.error ?? 'Could not load tracks')
                return
            }

            setTracks(data.tracks ?? [])
            setError(null)
        } catch {
            if (!isMountedRef.current) return
            setError('Could not load tracks')
        } finally {
            if (isInitialLoad && isMountedRef.current) {
                setLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        isMountedRef.current = true

        const run = async (isInitialLoad: boolean) => {
            await fetchTracks(isInitialLoad)
        }

        void run(true)

        const intervalId = window.setInterval(() => {
            void run(false)
        }, BANDLAB_REFRESH_INTERVAL_MS)

        return () => {
            isMountedRef.current = false
            window.clearInterval(intervalId)
        }
    }, [fetchTracks])

    return {
        tracks,
        loading,
        error,
    }
}