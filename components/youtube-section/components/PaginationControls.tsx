'use client'

import { PAGE_SIZE } from '@/components/youtube-section/types'
import { NavArrow } from '@/components/youtube-section/components/NavArrow'

type PaginationControlsProps = {
    page: number
    hasPrev: boolean
    hasNext: boolean
    isLoading: boolean
    totalVideoCount: number
    onPrev: () => void
    onNext: () => void
    isMobile: boolean
}

export function PaginationControls({
                                       page,
                                       hasPrev,
                                       hasNext,
                                       isLoading,
                                       totalVideoCount,
                                       onPrev,
                                       onNext,
                                       isMobile,
                                   }: PaginationControlsProps) {
    const from = page * PAGE_SIZE + 1
    const to = Math.min((page + 1) * PAGE_SIZE, totalVideoCount)

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '1rem' : 'clamp(1rem, 3vw, 2rem)',
                marginTop: 'clamp(2rem, 4vw, 3.5rem)',
            }}
        >
            <NavArrow
                direction="prev"
                disabled={!hasPrev || isLoading}
                onClick={onPrev}
                isMobile={isMobile}
            />

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    minWidth: isMobile ? 96 : 120,
                }}
            >
        <span
            style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2vw, 1.5rem)',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.9)',
            }}
        >
          {totalVideoCount > 0 ? `${from} – ${to}` : '—'}
        </span>

                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.52rem' : '0.6rem',
                        letterSpacing: isMobile ? '0.18em' : '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.25)',
                        whiteSpace: 'nowrap',
                    }}
                >
          of {totalVideoCount} videos
        </span>

                <div
                    style={{
                        width: isMobile ? 64 : 80,
                        height: 2,
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.07)',
                        overflow: 'hidden',
                        marginTop: 4,
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: totalVideoCount > 0 ? `${(to / totalVideoCount) * 100}%` : '0%',
                            background: 'linear-gradient(90deg, #ff4545, rgba(255,69,69,0.5))',
                            borderRadius: 4,
                            transition: 'width 0.5s ease',
                        }}
                    />
                </div>
            </div>

            <NavArrow
                direction="next"
                disabled={!hasNext || isLoading}
                onClick={onNext}
                isMobile={isMobile}
            />
        </div>
    )
}