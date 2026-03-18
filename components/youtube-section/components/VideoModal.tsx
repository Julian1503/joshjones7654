'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { CategoryPill } from '@/components/youtube-section/components/CategoryPill'

type VideoModalProps = {
    video: YoutubeVideo
    onClose: () => void
}

export function VideoModal({ video, onClose }: VideoModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const backdropElement = backdropRef.current
        const panelElement = panelRef.current

        if (!backdropElement || !panelElement) return

        const timeline = gsap.timeline()

        timeline.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )

        timeline.fromTo(
            panelRef.current,
            { y: 40, opacity: 0, scale: 0.96, filter: 'blur(12px)' },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.45,
                ease: 'power3.out',
            },
            '-=0.15'
        )

        return () => {
            timeline.kill()
        }
    }, [])

    const handleClose = () => {
        const timeline = gsap.timeline({ onComplete: onClose })

        timeline.to(panelRef.current, {
            y: 24,
            opacity: 0,
            scale: 0.97,
            duration: 0.3,
            ease: 'power2.in',
        })

        timeline.to(
            backdropRef.current,
            { opacity: 0, duration: 0.25, ease: 'power2.in' },
            '-=0.15'
        )
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    return (
        <div
            ref={backdropRef}
            onClick={handleClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(12px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'clamp(1rem, 4vw, 3rem)',
            }}
        >
            <div
                ref={panelRef}
                onClick={(event) => event.stopPropagation()}
                style={{
                    width: 'min(900px, 100%)',
                    background: '#0c0e10',
                    borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(220,30,30,0.12)',
                }}
            >
                <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    />
                </div>

                <div
                    style={{
                        padding: 'clamp(1rem, 2.5vw, 1.6rem)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 16,
                    }}
                >
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                            style={{
                                margin: '0 0 8px',
                                color: 'rgba(255,255,255,0.92)',
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
                                lineHeight: 1.3,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {video.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <CategoryPill label={video.category} />
                            <span
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.67rem',
                                    color: 'rgba(255,255,255,0.35)',
                                    letterSpacing: '0.1em',
                                }}
                            >
                {video.views} views · {video.date}
              </span>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        style={{
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.6)',
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'background 0.2s, color 0.2s',
                        }}
                        onMouseEnter={(event) => {
                            event.currentTarget.style.background = 'rgba(255,69,69,0.15)'
                            event.currentTarget.style.color = '#ff6b6b'
                        }}
                        onMouseLeave={(event) => {
                            event.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                            event.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M1 1L13 13M13 1L1 13"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}