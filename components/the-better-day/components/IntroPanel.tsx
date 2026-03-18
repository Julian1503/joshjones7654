'use client'

import type React from 'react'
import type { Pillar } from '@/components/the-better-day/types'

type IntroPanelProps = {
    pillars: readonly Pillar[]
    introRef: React.RefObject<HTMLDivElement | null>
    logoWrapRef: React.RefObject<HTMLDivElement | null>
    introCopyRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
}

export function IntroPanel({
                               pillars,
                               introRef,
                               logoWrapRef,
                               introCopyRef,
                               isMobile,
                               isTablet,
                               isDesktop,
                           }: IntroPanelProps) {
    return (
        <div
            ref={introRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                padding: isMobile
                    ? '0 1.25rem'
                    : isTablet
                        ? '0 2rem'
                        : '0 clamp(2rem, 8vw, 10rem)',
                zIndex: 10,
                opacity: 0,
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                    gap: isMobile ? '1.5rem' : isTablet ? '2.5rem' : 'clamp(3rem, 6vw, 8rem)',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                    textAlign: isDesktop ? 'left' : 'center',
                }}
            >
                <div ref={logoWrapRef}>
                    <img
                        src="/logo.png"
                        alt="The Better Day"
                        style={{
                            width: isMobile
                                ? 'min(220px, 72vw)'
                                : isTablet
                                    ? 'min(280px, 78vw)'
                                    : 'min(360px, 90%)',
                            height: 'auto',
                            filter:
                                'drop-shadow(0 0 40px rgba(114,196,74,0.3)) drop-shadow(0 0 80px rgba(74,159,212,0.2))',
                            marginBottom: isMobile ? '1rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
                            display: 'block',
                            marginInline: isDesktop ? '0' : 'auto',
                        }}
                    />

                    <div
                        style={{
                            height: 2,
                            width: '100%',
                            maxWidth: isMobile ? 220 : isTablet ? 280 : 360,
                            background: `linear-gradient(90deg,
                ${pillars[0].color} 0%,
                ${pillars[1].color} 25%,
                ${pillars[2].color} 50%,
                ${pillars[3].color} 75%,
                ${pillars[4].color} 100%)`,
                            borderRadius: 2,
                            marginBottom: isMobile ? '1rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
                            marginInline: isDesktop ? '0' : 'auto',
                        }}
                    />

                    <p
                        style={{
                            margin: 0,
                            fontFamily: 'monospace',
                            fontSize: isMobile
                                ? '0.55rem'
                                : isTablet
                                    ? '0.62rem'
                                    : 'clamp(0.58rem, 0.85vw, 0.72rem)',
                            letterSpacing: isMobile ? '0.22em' : '0.35em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.3)',
                        }}
                    >
                        Queensland, Australia · Support organisation
                    </p>
                </div>

                <div ref={introCopyRef}>
                    <p
                        style={{
                            margin: '0 0 clamp(0.6rem, 1.5vw, 1rem)',
                            fontFamily: 'monospace',
                            fontSize: isMobile
                                ? '0.55rem'
                                : isTablet
                                    ? '0.62rem'
                                    : 'clamp(0.58rem, 0.85vw, 0.72rem)',
                            letterSpacing: isMobile ? '0.22em' : '0.38em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.28)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: isDesktop ? 'flex-start' : 'center',
                            gap: 10,
                            flexWrap: 'wrap',
                        }}
                    >
            <span
                style={{
                    display: 'inline-block',
                    width: 22,
                    height: 1,
                    background: pillars[0].color,
                    opacity: 0.7,
                }}
            />
                        How they care for Joshua
                    </p>

                    <h2
                        style={{
                            margin: '0 0 clamp(1rem, 2vw, 1.6rem)',
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: isMobile
                                ? 'clamp(2.2rem, 12vw, 3.6rem)'
                                : isTablet
                                    ? 'clamp(3rem, 7vw, 4.6rem)'
                                    : 'clamp(2.8rem, 6vw, 5.5rem)',
                            lineHeight: isMobile ? 0.98 : 0.92,
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.94)',
                        }}
                    >
                        Five pillars
                        <br />
                        <span
                            style={{
                                background: `linear-gradient(90deg, ${pillars[0].color}, ${pillars[1].color})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
              of a life made possible
            </span>
                    </h2>

                    <p
                        style={{
                            margin: 0,
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: isMobile
                                ? '0.95rem'
                                : isTablet
                                    ? '1rem'
                                    : 'clamp(0.95rem, 1.1vw, 1.05rem)',
                            lineHeight: isMobile ? 1.7 : 1.8,
                            maxWidth: isDesktop ? '44ch' : '100%',
                            marginInline: isDesktop ? '0' : 'auto',
                        }}
                    >
                        The Better Day is not just an organisation. For Joshua, they are the
                        people who make living with schizophrenia something he can face —
                        day by day, pillar by pillar.
                    </p>

                    <div
                        style={{
                            marginTop: isMobile ? '1.5rem' : 'clamp(2rem, 4vw, 3.5rem)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isDesktop ? 'flex-start' : 'center',
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                width: 1,
                                height: isMobile ? 28 : 40,
                                background:
                                    'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3))',
                            }}
                        />
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.56rem' : '0.6rem',
                                letterSpacing: isMobile ? '0.2em' : '0.3em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.22)',
                            }}
                        >
              Scroll to explore
            </span>
                    </div>
                </div>
            </div>
        </div>
    )
}