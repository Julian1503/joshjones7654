'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { MUSIC_VISIBLE_TRACKS } from '@/components/music-section/constants'
import type { BandLabTrack } from '@/components/music-section/types'

export function useTrackWindow(tracks: BandLabTrack[]) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        setActiveIndex(0)
        setStartIndex(0)
    }, [tracks])

    const visibleTracks = useMemo(
        () => tracks.slice(startIndex, startIndex + MUSIC_VISIBLE_TRACKS),
        [tracks, startIndex]
    )

    const canGoUp = startIndex > 0
    const canGoDown = startIndex + MUSIC_VISIBLE_TRACKS < tracks.length

    const showPreviousTracks = useCallback(() => {
        if (!canGoUp) return
        setStartIndex((previous) => Math.max(0, previous - 1))
    }, [canGoUp])

    const showNextTracks = useCallback(() => {
        if (!canGoDown) return
        setStartIndex((previous) =>
            Math.min(Math.max(0, tracks.length - MUSIC_VISIBLE_TRACKS), previous + 1)
        )
    }, [canGoDown, tracks.length])

    useEffect(() => {
        setStartIndex((previous) => {
            if (activeIndex < previous) return activeIndex
            if (activeIndex >= previous + MUSIC_VISIBLE_TRACKS) {
                return activeIndex - MUSIC_VISIBLE_TRACKS + 1
            }
            return previous
        })
    }, [activeIndex])

    return {
        activeIndex,
        setActiveIndex,
        visibleTracks,
        startIndex,
        canGoUp,
        canGoDown,
        showPreviousTracks,
        showNextTracks,
        activeTrack: tracks[activeIndex] ?? null,
    }
}