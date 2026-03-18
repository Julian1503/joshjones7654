'use client'

import type { BandLabTrack } from '@/components/music-section/types'
import { TrackListNav } from '@/components/music-section/components/TrackListNav'
import { TrackRow } from '@/components/music-section/components/TrackRow'

type TrackListProps = {
    visibleTracks: BandLabTrack[]
    startIndex: number
    activeIndex: number
    canGoUp: boolean
    canGoDown: boolean
    onShowPreviousAction: () => void
    onShowNextAction: () => void
    onSelectTrackAction: (index: number) => void
}

export function TrackList({
                              visibleTracks,
                              startIndex,
                              activeIndex,
                              canGoUp,
                              canGoDown,
                              onShowPreviousAction,
                              onShowNextAction,
                              onSelectTrackAction,
                          }: TrackListProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                overflow: 'hidden',
            }}
        >
            <TrackListNav direction="up" onClickAction={onShowPreviousAction} disabled={!canGoUp} />

            {visibleTracks.map((track, visibleIndex) => {
                const realIndex = startIndex + visibleIndex

                return (
                    <TrackRow
                        key={track.postId}
                        track={track}
                        index={realIndex}
                        isActive={activeIndex === realIndex}
                        onClickAction={() => onSelectTrackAction(realIndex)}
                    />
                )
            })}

            <TrackListNav direction="down" onClickAction={onShowNextAction} disabled={!canGoDown} />
        </div>
    )
}