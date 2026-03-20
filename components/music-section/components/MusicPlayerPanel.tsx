'use client'

import type { BandLabTrack } from '@/components/music-section/types'
import { formatViews } from '@/lib/youtube/youtube.utils'

type MusicPlayerPanelProps = {
    playerRef: React.RefObject<HTMLDivElement | null>
    activeTrack: BandLabTrack | null
    initiallyVisible?: boolean
}

export function MusicPlayerPanel({
                                     playerRef,
                                     activeTrack,
                                     initiallyVisible = false,
                                 }: MusicPlayerPanelProps) {
    if (!activeTrack) return null

    return (
        <div
            ref={playerRef}
            style={{
                opacity: initiallyVisible ? 1 : 0,
                transform: initiallyVisible ? 'translateY(0)' : undefined,
            }}
        >
            <div
                style={{
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.02)',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background:
                            'linear-gradient(90deg,transparent,rgba(255,69,69,0.4) 50%,transparent)',
                        zIndex: 2,
                    }}
                />

                <iframe
                    key={activeTrack.embedId}
                    src={`https://www.bandlab.com/embed/?id=${activeTrack.embedId}&blur=false`}
                    title={`BandLab embedded player for ${activeTrack.title}`}
                    width="100%"
                    height="240"
                    allow="autoplay"
                    style={{
                        border: 'none',
                        display: 'block',
                        borderRadius: 10,
                    }}
                    loading="lazy"
                />
            </div>

            <div
                aria-live='polite'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 4px 0',
                    flexWrap: 'wrap',
                    gap: 8,
                }}
            >
        <span
            style={{
                fontFamily: '"Bebas Neue",sans-serif',
                fontSize: 'clamp(1rem,1.5vw,1.4rem)',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.7)',
            }}
        >
          {activeTrack.title}
        </span>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
          <span
              style={{
                  fontFamily: 'monospace',
                  fontSize: '0.52rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.22)',
              }}
          >
            ▶ {formatViews(activeTrack.plays)}
          </span>

                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.52rem',
                            letterSpacing: '0.15em',
                            color: 'rgba(255,255,255,0.2)',
                        }}
                    >
            {activeTrack.duration}
          </span>
                </div>
            </div>
        </div>
    )
}