'use client'

import { useRef } from 'react'
import gsap from 'gsap'

type ActionButtonProps = {
    href: string
    label: string
    ariaLabel: string
    isMobile: boolean
    variant: 'youtube' | 'paypal'
    icon: React.ReactNode
}

export default function ActionButton({
                                         href,
                                         label,
                                         ariaLabel,
                                         isMobile,
                                         variant,
                                         icon,
                                     }: ActionButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null)
    const arrowRef = useRef<HTMLSpanElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)

    const isYoutube = variant === 'youtube'

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
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: isMobile ? '22rem' : '30rem',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}
        >
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: -12,
                    borderRadius: 100,
                    background: isYoutube
                        ? 'radial-gradient(ellipse, rgba(200,0,0,0.35) 0%, transparent 70%)'
                        : 'radial-gradient(ellipse, rgba(0,48,135,0.28) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />

            <a
                ref={buttonRef}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '20px 1fr 20px' : '24px 1fr 24px',
                    alignItems: 'center',
                    columnGap: isMobile ? 10 : 12,
                    padding: isMobile
                        ? '0.82rem 1rem'
                        : 'clamp(0.9rem, 1.5vw, 1.1rem) clamp(1.6rem, 2.5vw, 2.2rem)',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRadius: 100,
                    background: isYoutube
                        ? 'rgba(200,0,0,0.12)'
                        : 'rgba(0,48,135,0.12)',
                    border: isYoutube
                        ? '1px solid rgba(255,69,69,0.35)'
                        : '1px solid rgba(0,156,222,0.28)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                }}
            >
                <span
                    aria-hidden="true"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    {icon}
                </span>

                <span
                    style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? '0.92rem' : 'clamp(1rem, 1.4vw, 1.25rem)',
                        letterSpacing: isMobile ? '0.1em' : '0.14em',
                        color: 'rgba(255,255,255,0.88)',
                        lineHeight: 1,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {label}
                </span>

                <span
                    ref={arrowRef}
                    aria-hidden="true"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        fontFamily: 'monospace',
                        fontSize: '0.65rem',
                        color: 'rgba(255,255,255,0.4)',
                        visibility: isMobile ? 'hidden' : 'visible',
                    }}
                >
                    ↗
                </span>
            </a>
        </div>
    )
}