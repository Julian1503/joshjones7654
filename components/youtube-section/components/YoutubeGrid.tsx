'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { VideoCard } from '@/components/youtube-section/components/VideoCard'

type YoutubeGridProps = {
    videos: YoutubeVideo[]
    isPaging: boolean
    isMobile: boolean
    isTablet: boolean
    setCardRef: (index: number) => (element: HTMLDivElement | null) => void
    onPlay: (video: YoutubeVideo) => void
    direction?: 'next' | 'prev' | null
}

const OVERLAY_KEYFRAMES = `
    @keyframes yt-spin {
        0%   { transform: rotate(0deg);   }
        100% { transform: rotate(360deg); }
    }
    @keyframes yt-pulse {
        0%, 100% { opacity: 0.75; transform: scale(1);    }
        50%       { opacity: 1;    transform: scale(1.1); }
    }
    @keyframes yt-bar-shimmer {
        0%   { background-position: 0%   0%; }
        100% { background-position: 200% 0%; }
    }
`

export function YoutubeGrid({
                                videos,
                                isPaging,
                                isMobile,
                                isTablet,
                                setCardRef,
                                onPlay,
                                direction,
                            }: YoutubeGridProps) {
    const gridRef      = useRef<HTMLDivElement>(null)
    const overlayRef   = useRef<HTMLDivElement>(null)
    const progressRef  = useRef<HTMLDivElement>(null)
    const prevPagingRef = useRef(false)

    useLayoutEffect(() => {
        const wasPaging = prevPagingRef.current
        prevPagingRef.current = isPaging

        const gridEl    = gridRef.current
        const overlayEl = overlayRef.current
        const progressEl = progressRef.current

        if (!gridEl || !overlayEl) return

        const cards = Array.from(gridEl.children) as HTMLElement[]

        /* ── Cards EXIT ──────────────────────────────────────────── */
        if (isPaging && !wasPaging) {
            const xOut = direction === 'prev' ? 80 : -80

            gsap.killTweensOf(cards)
            gsap.to(cards, {
                x:       xOut,
                opacity: 0,
                scale:   0.92,
                filter:  'blur(5px)',
                stagger: { amount: 0.22, from: direction === 'prev' ? 'end' : 'start' },
                duration: 0.38,
                ease:    'power2.in',
            })

            // Show overlay
            gsap.set(overlayEl,  { display: 'flex', opacity: 0 })
            gsap.to(overlayEl,   { opacity: 1, duration: 0.3, delay: 0.12 })

            // Progress bar: crawl to ~72 % while loading
            if (progressEl) {
                gsap.set(progressEl,  { scaleX: 0, transformOrigin: 'left center' })
                gsap.to(progressEl,   { scaleX: 0.72, duration: 2, ease: 'power1.inOut' })
            }
        }

        /* ── Cards ENTER ─────────────────────────────────────────── */
        if (!isPaging && wasPaging) {
            const xIn = direction === 'prev' ? -80 : 80

            // Complete the progress bar, then fade overlay out
            if (progressEl) {
                gsap.to(progressEl, {
                    scaleX:   1,
                    duration: 0.25,
                    ease:     'power2.out',
                    onComplete: () =>
                        gsap.to(overlayEl, {
                            opacity:  0,
                            duration: 0.3,
                            onComplete: () => gsap.set(overlayEl, { display: 'none' }),
                        }),
                })
            }

            // Animate new cards in
            gsap.set(cards, { x: xIn, opacity: 0, scale: 0.92, filter: 'blur(5px)' })
            gsap.to(cards, {
                x:       0,
                opacity: 1,
                scale:   1,
                filter:  'blur(0px)',
                stagger: { amount: 0.28, from: direction === 'prev' ? 'end' : 'start' },
                duration: 0.52,
                ease:    'power3.out',
                delay:   0.08,
            })
        }
    }, [isPaging, direction])

    /* ── Grid layouts ─────────────────────────────────────────────── */
    const renderGrid = () => {
        if (isMobile) {
            return (
                <div
                    ref={gridRef}
                    style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}
                >
                    {videos.map((video, index) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            variant={index === 0 ? 'featured' : 'small'}
                            cardRef={setCardRef(index)}
                            onPlay={onPlay}
                        />
                    ))}
                </div>
            )
        }

        if (isTablet) {
            return (
                <div
                    ref={gridRef}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}
                >
                    {videos.map((video, index) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            variant={index === 0 ? 'featured' : 'medium'}
                            cardRef={setCardRef(index)}
                            onPlay={onPlay}
                        />
                    ))}
                </div>
            )
        }

        return (
            <div
                ref={gridRef}
                style={{
                    display:             'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows:    'auto auto auto',
                    gap:                 'clamp(0.75rem, 1.5vw, 1.2rem)',
                }}
            >
                {videos[0] && (
                    <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                        <VideoCard video={videos[0]} variant="featured" cardRef={setCardRef(0)} onPlay={onPlay} />
                    </div>
                )}
                {videos[1] && (
                    <div style={{ gridColumn: '3', gridRow: '1' }}>
                        <VideoCard video={videos[1]} variant="medium" cardRef={setCardRef(1)} onPlay={onPlay} />
                    </div>
                )}
                {videos[2] && (
                    <div style={{ gridColumn: '3', gridRow: '2' }}>
                        <VideoCard video={videos[2]} variant="medium" cardRef={setCardRef(2)} onPlay={onPlay} />
                    </div>
                )}
                {[3, 4, 5].map((videoIndex, gridIndex) => {
                    const video = videos[videoIndex]
                    if (!video) return null
                    return (
                        <div key={video.id} style={{ gridColumn: `${gridIndex + 1}`, gridRow: '3' }}>
                            <VideoCard video={video} variant="small" cardRef={setCardRef(videoIndex)} onPlay={onPlay} />
                        </div>
                    )
                })}
            </div>
        )
    }

    /* ── Render ───────────────────────────────────────────────────── */
    return (
        <div style={{ position: 'relative' }}>
            {renderGrid()}

            {/* ── YouTube loading overlay ──────────────────────────── */}
            <div
                ref={overlayRef}
                style={{
                    position:       'absolute',
                    inset:          0,
                    display:        'none',          // shown by GSAP
                    flexDirection:  'column',
                    alignItems:     'center',
                    justifyContent: 'center',
                    background:     'rgba(7,8,9,0.72)',
                    backdropFilter: 'blur(8px)',
                    borderRadius:   16,
                    zIndex:         10,
                    gap:            18,
                    pointerEvents:  'none',
                }}
            >
                <style>{OVERLAY_KEYFRAMES}</style>

                {/* Red progress bar */}
                <div
                    style={{
                        position:     'absolute',
                        top:          0,
                        left:         0,
                        right:        0,
                        height:       3,
                        background:   'rgba(255,255,255,0.05)',
                        borderRadius: '16px 16px 0 0',
                        overflow:     'hidden',
                    }}
                >
                    <div
                        ref={progressRef}
                        style={{
                            height:         '100%',
                            width:          '100%',
                            background:     'linear-gradient(90deg, #cc0000 0%, #ff4545 40%, #ff6b6b 60%, #cc0000 100%)',
                            backgroundSize: '200% 100%',
                            animation:      'yt-bar-shimmer 1.4s linear infinite',
                        }}
                    />
                </div>

                {/* YouTube spinner */}
                <div style={{ position: 'relative', width: 76, height: 76 }}>
                    {/* Pulsing YouTube logo */}
                    <div
                        style={{
                            position:       'absolute',
                            inset:          0,
                            display:        'flex',
                            alignItems:     'center',
                            justifyContent: 'center',
                        }}
                    >
                        <svg
                            width="42"
                            height="30"
                            viewBox="0 0 42 30"
                            fill="none"
                            style={{ animation: 'yt-pulse 1.3s ease-in-out infinite' }}
                        >
                            <rect width="42" height="30" rx="6.5" fill="#FF0000" />
                            <path d="M17 21V9L30 15L17 21Z" fill="white" />
                        </svg>
                    </div>

                    {/* Spinning arc */}
                    <svg
                        width="76"
                        height="76"
                        viewBox="0 0 76 76"
                        fill="none"
                        style={{
                            position: 'absolute',
                            inset:    0,
                            animation: 'yt-spin 1.1s linear infinite',
                        }}
                    >
                        <circle
                            cx="38" cy="38" r="34"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="3"
                        />
                        <circle
                            cx="38" cy="38" r="34"
                            stroke="#ff2020"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="213"
                            strokeDashoffset="168"
                        />
                    </svg>
                </div>

                {/* Label */}
                <span
                    style={{
                        fontFamily:    'monospace',
                        fontSize:      '0.58rem',
                        letterSpacing: '0.32em',
                        textTransform: 'uppercase',
                        color:         'rgba(255,255,255,0.22)',
                    }}
                >
                    cargando videos
                </span>
            </div>
        </div>
    )
}