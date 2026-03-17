'use client'

import type React from 'react'
import type { Pillar } from '../types'

type IntroPanelProps = {
    pillars: readonly Pillar[]
    introRef: React.RefObject<HTMLDivElement | null>
    logoWrapRef: React.RefObject<HTMLDivElement | null>
    introCopyRef: React.RefObject<HTMLDivElement | null>
}

export function IntroPanel({
                               pillars,
                               introRef,
                               logoWrapRef,
                               introCopyRef,
                           }: IntroPanelProps) {
    return (
        <div
            ref={introRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '0 clamp(2rem, 8vw, 10rem)',
                zIndex: 10,
                opacity: 0,
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(3rem, 6vw, 8rem)',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                }}
            >
                <div ref={logoWrapRef}>
                    <img
                        src="/logo.png"
                        alt="The Better Day"
                        style={{
                            width: 'min(360px, 90%)',
                            height: 'auto',
                            filter:
                                'drop-shadow(0 0 40px rgba(114,196,74,0.3)) drop-shadow(0 0 80px rgba(74,159,212,0.2))',
                            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                            display: 'block',
                        }}
                    />

                    <div
                        style={{
                            height: 2,
                            width: '100%',
                            maxWidth: 360,
                            background: `linear-gradient(90deg,
                ${pillars[0].color} 0%,
                ${pillars[1].color} 25%,
                ${pillars[2].color} 50%,
                ${pillars[3].color} 75%,
                ${pillars[4].color} 100%)`,
                            borderRadius: 2,
                            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
                        }}
                    />

                    <p
                        style={{
                            margin: 0,
                            fontFamily: 'monospace',
                            fontSize: 'clamp(0.58rem, 0.85vw, 0.72rem)',
                            letterSpacing: '0.35em',
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
                            fontSize: 'clamp(0.58rem, 0.85vw, 0.72rem)',
                            letterSpacing: '0.38em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.28)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
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
                            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                            lineHeight: 0.92,
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
                            fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                            lineHeight: 1.8,
                            maxWidth: '44ch',
                        }}
                    >
                        The Better Day is not just an organisation. For Joshua, they are the
                        people who make living with schizophrenia something he can face —
                        day by day, pillar by pillar.
                    </p>

                    <div
                        style={{
                            marginTop: 'clamp(2rem, 4vw, 3.5rem)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <div
                            style={{
                                width: 1,
                                height: 40,
                                background:
                                    'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3))',
                            }}
                        />
                        <span
                            style={{
                                fontFamily: 'monospace',
                                fontSize: '0.6rem',
                                letterSpacing: '0.3em',
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