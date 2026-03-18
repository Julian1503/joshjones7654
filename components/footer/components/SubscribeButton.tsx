'use client'

import { useRef } from 'react'
import gsap from 'gsap'

export function SubscribeButton({ isMobile }: { isMobile: boolean }) {
    const buttonRef = useRef<HTMLAnchorElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    const handleEnter = () => {
        gsap.to(buttonRef.current, {
            scale: 1.04,
            duration: 0.3,
            ease: 'back.out(2)',
        })
        gsap.to(glowRef.current, {
            opacity: 1,
            duration: 0.3,
        })
        gsap.to(arrowRef.current, {
            x: 4,
            y: -4,
            duration: 0.25,
            ease: 'power2.out',
        })
    }

    const handleLeave = () => {
        gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
        })
        gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.3,
        })
        gsap.to(arrowRef.current, {
            x: 0,
            y: 0,
            duration: 0.3,
        })
    }

    return (
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: -12,
                    borderRadius: 100,
                    background: 'radial-gradient(ellipse, rgba(200,0,0,0.35) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            <a
                ref={buttonRef}
                href="https://youtube.com/@thebetterday"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: isMobile
                        ? '0.85rem 1.25rem'
                        : 'clamp(0.9rem, 1.5vw, 1.1rem) clamp(1.6rem, 2.5vw, 2.2rem)',
                    borderRadius: 100,
                    background: 'rgba(200,0,0,0.12)',
                    border: '1px solid rgba(255,69,69,0.35)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: 'center',
                }}
            >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                    <rect width="18" height="13" rx="3" fill="#FF0000" />
                    <path d="M7.5 9.1V3.9L12.5 6.5L7.5 9.1Z" fill="white" />
                </svg>

                <span
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.4vw, 1.25rem)',
                        letterSpacing: '0.14em',
                        color: 'rgba(255,255,255,0.88)',
                        lineHeight: 1,
                    }}
                >
          Subscribe on YouTube
        </span>

                <span
                    ref={arrowRef}
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.4)',
                    }}
                >
          ↗
        </span>
            </a>
        </div>
    )
}