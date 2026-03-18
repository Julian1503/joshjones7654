'use client'

import type React from 'react'
import type { Pillar } from '@/components/the-better-day/types'

type OutroPanelProps = {
    pillars: readonly Pillar[]
    outroRef: React.RefObject<HTMLDivElement | null>
    ctaRef: React.RefObject<HTMLAnchorElement | null>
    isMobile: boolean
    isTablet: boolean
}

export function OutroPanel({
                               pillars,
                               outroRef,
                               ctaRef,
                               isMobile,
                               isTablet,
                           }: OutroPanelProps) {
    return (
        <div
            ref={outroRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: 40,
                opacity: 0,
                padding: isMobile
                    ? '0 1.25rem'
                    : isTablet
                        ? '0 2rem'
                        : '0 clamp(2rem, 8vw, 8rem)',
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    width: isMobile ? 'min(260px, 80vw)' : 'min(400px, 80vw)',
                    height: 1,
                    marginBottom: isMobile ? '1.8rem' : 'clamp(2.5rem, 5vw, 4rem)',
                    background: `linear-gradient(90deg,
            ${pillars[0].color} 0%,
            ${pillars[1].color} 25%,
            ${pillars[2].color} 50%,
            ${pillars[3].color} 75%,
            ${pillars[4].color} 100%)`,
                }}
            />

            <p
                style={{
                    margin: '0 0 clamp(1rem, 2vw, 1.5rem)',
                    fontFamily: 'monospace',
                    fontSize: isMobile
                        ? '0.55rem'
                        : isTablet
                            ? '0.62rem'
                            : 'clamp(0.58rem, 0.88vw, 0.74rem)',
                    letterSpacing: isMobile ? '0.22em' : '0.38em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.28)',
                }}
            >
                The Better Day
            </p>

            <blockquote
                style={{
                    margin: '0 0 clamp(2rem, 5vw, 4rem)',
                    maxWidth: isMobile ? '22ch' : '50ch',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: isMobile
                        ? 'clamp(1.2rem, 7vw, 2rem)'
                        : isTablet
                            ? 'clamp(1.6rem, 4vw, 2.4rem)'
                            : 'clamp(1.5rem, 3.5vw, 3rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.03em',
                    fontStyle: 'normal',
                }}
            >
                &quot;Not just surviving the day.{' '}
                <span
                    style={{
                        background: `linear-gradient(90deg, ${pillars[0].color}, ${pillars[1].color})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
          Living it.&quot;
        </span>
            </blockquote>

            <a
                ref={ctaRef}
                href="https://thebetterday.com.au"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: isMobile
                        ? '12px 18px'
                        : isTablet
                            ? '14px 24px'
                            : 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)',
                    borderRadius: 100,
                    border: `1px solid ${pillars[0].color}50`,
                    background: `${pillars[0].color}0e`,
                    color: pillars[0].color,
                    fontFamily: 'monospace',
                    fontSize: isMobile
                        ? '0.62rem'
                        : 'clamp(0.65rem, 0.9vw, 0.78rem)',
                    letterSpacing: isMobile ? '0.18em' : '0.3em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    opacity: 0,
                    transition:
                        'background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s',
                }}
                onMouseEnter={(event) => {
                    const element = event.currentTarget
                    element.style.background = `${pillars[0].color}1e`
                    element.style.borderColor = `${pillars[0].color}80`
                    element.style.boxShadow = `0 0 28px ${pillars[0].color}30`
                    element.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(event) => {
                    const element = event.currentTarget
                    element.style.background = `${pillars[0].color}0e`
                    element.style.borderColor = `${pillars[0].color}50`
                    element.style.boxShadow = 'none'
                    element.style.transform = 'translateY(0)'
                }}
            >
                Discover The Better Day
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                        d="M2 8L8 2M4 2H8V6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>

            <div
                style={{
                    display: 'flex',
                    gap: isMobile ? 8 : 10,
                    marginTop: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3.5rem)',
                }}
            >
                {pillars.map((pillar) => (
                    <div
                        key={pillar.index}
                        style={{
                            width: isMobile ? 5 : 6,
                            height: isMobile ? 5 : 6,
                            borderRadius: '50%',
                            background: pillar.color,
                            boxShadow: `0 0 8px ${pillar.color}88`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}