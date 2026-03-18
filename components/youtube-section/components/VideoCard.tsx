'use client'

import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { CategoryPill } from '@/components/youtube-section/components/CategoryPill'
import { PlayIcon } from '@/components/youtube-section/components/PlayIcon'

type VideoCardVariant = 'featured' | 'medium' | 'small'

type VideoCardProps = {
    video: YoutubeVideo
    variant: VideoCardVariant
    cardRefAction?: (element: HTMLDivElement | null) => void
    onPlayAction: (video: YoutubeVideo) => void
}

export function VideoCard({
                              video,
                              variant,
                              cardRefAction,
                              onPlayAction,
                          }: VideoCardProps) {
    const innerRef = useRef<HTMLDivElement>(null)
    const thumbnailRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const playRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const combinedRef = useCallback(
        (element: HTMLDivElement | null) => {
            innerRef.current = element
            cardRefAction?.(element)
        },
        [cardRefAction]
    )

    const isFeatured = variant === 'featured'
    const isSmall = variant === 'small'

    useEffect(() => {
        const card = innerRef.current
        if (!card) return

        const timeline = gsap.timeline({ paused: true })

        timeline
            .to(thumbnailRef.current, { scale: 1.06, duration: 0.55, ease: 'power2.out' }, 0)
            .to(glowRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
            .to(
                playRef.current,
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.38,
                    ease: 'back.out(1.4)',
                },
                0.05
            )
            .to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
            .to(card, { borderColor: 'rgba(255,45,45,0.35)', duration: 0.3, ease: 'power2.out' }, 0)

        const handleEnter = () => timeline.play()
        const handleLeave = () => timeline.reverse()

        card.addEventListener('mouseenter', handleEnter)
        card.addEventListener('mouseleave', handleLeave)

        return () => {
            card.removeEventListener('mouseenter', handleEnter)
            card.removeEventListener('mouseleave', handleLeave)
            timeline.kill()
        }
    }, [])

    return (
        <div
            ref={combinedRef}
            role='button'
            tabIndex={0}
            aria-label={`Play video: ${video.title}`}
            style={{
                position: 'relative',
                borderRadius: isFeatured ? 20 : 14,
                border: '1px solid rgba(255,255,255,0.07)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#0c0e0f',
                transition: 'box-shadow 0.3s ease',
            }}
            onClick={() => onPlayAction(video)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onPlayAction(video)
                }
            }}
        >
            <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                <div
                    ref={thumbnailRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${video.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        willChange: 'transform',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.0) 100%)',
                        pointerEvents: 'none',
                    }}
                />

                <div
                    ref={overlayRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.32)',
                        opacity: 0,
                        pointerEvents: 'none',
                    }}
                />

                <div
                    ref={glowRef}
                    style={{
                        position: 'absolute',
                        bottom: -20,
                        left: 0,
                        right: 0,
                        height: '55%',
                        background:
                            'radial-gradient(ellipse at bottom center, rgba(220,30,30,0.45) 0%, transparent 68%)',
                        filter: 'blur(12px)',
                        opacity: 0,
                        pointerEvents: 'none',
                    }}
                />

                <div
                    ref={playRef}
                    aria-hidden='true'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        scale: '0.75',
                        y: 12,
                        pointerEvents: 'none',
                    } as React.CSSProperties}
                >
                    <PlayIcon size={isFeatured ? 64 : 44} />
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(8px)',
                        color: 'rgba(255,255,255,0.9)',
                        fontFamily: 'monospace',
                        fontSize: isSmall ? '0.65rem' : '0.72rem',
                        letterSpacing: '0.06em',
                        padding: '3px 7px',
                        borderRadius: 5,
                    }}
                >
                    {video.duration}
                </div>

                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                    <CategoryPill label={video.category} />
                </div>
            </div>

            <div style={{ padding: isFeatured ? '16px 18px 18px' : '12px 14px 14px' }}>
                <h3
                    style={{
                        margin: '0 0 8px',
                        color: 'rgba(255,255,255,0.92)',
                        fontSize: isFeatured
                            ? 'clamp(1rem, 1.4vw, 1.18rem)'
                            : isSmall
                                ? '0.88rem'
                                : '0.96rem',
                        lineHeight: 1.3,
                        letterSpacing: '-0.02em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {video.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span
              style={{
                  fontFamily: 'monospace',
                  fontSize: '0.67rem',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.1em',
              }}
          >
            {video.views} views
          </span>

                    <span
                        style={{
                            width: 2,
                            height: 2,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                        }}
                    />

                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '0.67rem',
                            color: 'rgba(255,255,255,0.25)',
                            letterSpacing: '0.08em',
                        }}
                    >
            {video.date}
          </span>
                </div>
            </div>
        </div>
    )
}