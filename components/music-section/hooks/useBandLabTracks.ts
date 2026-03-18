'use client'

import { useEffect, useState } from 'react'
import type { BandLabTrack } from '@/components/music-section/types'

export function useBandLabTracks() {
    const [tracks, setTracks] = useState<BandLabTrack[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/bandlab')
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    setLoading(false)
                    return
                }

                setTracks(data.tracks ?? [])
                setLoading(false)
            })
            .catch(() => {
                setError('Could not load tracks')
                setLoading(false)
            })
    }, [])

    return {
        tracks,
        loading,
        error,
    }
}