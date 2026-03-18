'use client'

import { MUSIC_REST_HEIGHTS, MUSIC_WAVEFORM_BAR_COUNT } from '@/components/music-section/constants'

type MusicWaveformProps = {
    waveRef: React.RefObject<HTMLDivElement | null>
    barRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    isMobile: boolean
}

export function MusicWaveform({
                                  waveRef,
                                  barRefs,
                                  isMobile,
                              }: MusicWaveformProps) {
    return (
        <div
            ref={waveRef}
            style={{
                position: 'relative',
                height: isMobile ? 84 : 120,
                display: 'flex',
                alignItems: 'flex-end',
                gap: 3,
                cursor: isMobile ? 'default' : 'crosshair',
                opacity: 0,
            }}
        >
            {Array.from({ length: MUSIC_WAVEFORM_BAR_COUNT }).map((_, index) => {
                const centerDistance = Math.abs(index / MUSIC_WAVEFORM_BAR_COUNT - 0.5) * 2
                const redValue = Math.round(120 + (1 - centerDistance) * 135)

                return (
                    <div
                        key={index}
                        ref={(element) => {
                            barRefs.current[index] = element
                        }}
                        style={{
                            flex: 1,
                            height: isMobile ? 84 : 120,
                            borderRadius: 2,
                            background: `rgba(${redValue},20,20,0.75)`,
                            transformOrigin: 'bottom center',
                            transform: `scaleY(${MUSIC_REST_HEIGHTS[index]})`,
                            willChange: 'transform',
                        }}
                    />
                )
            })}

            <div
                style={{
                    position: 'absolute',
                    bottom: -8,
                    left: '10%',
                    right: '10%',
                    height: 20,
                    background: 'radial-gradient(ellipse,rgba(200,0,0,0.35) 0%,transparent 70%)',
                    filter: 'blur(8px)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}