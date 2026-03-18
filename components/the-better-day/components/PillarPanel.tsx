'use client'

import type React from 'react'
import type { Pillar } from '@/components/the-better-day/types'

type PillarPanelProps = {
    pillar: Pillar
    index: number
    panelRefs: React.RefObject<(HTMLDivElement | null)[]>
    bgRefs: React.RefObject<(HTMLDivElement | null)[]>
    wordRefs: React.RefObject<(HTMLDivElement | null)[]>
    numRefs: React.RefObject<(HTMLDivElement | null)[]>
    labelRefs: React.RefObject<(HTMLSpanElement | null)[]>
    titleRefs: React.RefObject<(HTMLHeadingElement | null)[]>
    bodyRefs: React.RefObject<(HTMLParagraphElement | null)[]>
    isMobile: boolean
    isTablet: boolean
}

export function PillarPanel({
                                pillar,
                                index,
                                panelRefs,
                                bgRefs,
                                wordRefs,
                                numRefs,
                                labelRefs,
                                titleRefs,
                                bodyRefs,
                                isMobile,
                                isTablet,
                            }: PillarPanelProps) {
    return (
        <div
            ref={(element) => {
                panelRefs.current[index] = element
            }}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                zIndex: 20 + index,
                paddingTop: isMobile ? '5.5rem' : 0,
                paddingBottom: isMobile ? '3rem' : 0,
            }}
        >
            <div style={{ position: 'absolute', inset: 0, background: '#07090a' }} />

            <div
                ref={(element) => {
                    bgRefs.current[index] = element
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at 70% 50%, ${pillar.color}18 0%, ${pillar.color}06 40%, transparent 70%)`,
                    opacity: 0,
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.025,
                    pointerEvents: 'none',
                }}
            />

            {!isMobile && (
                <div
                    ref={(element) => {
                        wordRefs.current[index] = element
                    }}
                    style={{
                        position: 'absolute',
                        right: isTablet ? '-4vw' : '-2vw',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isTablet
                            ? 'clamp(7rem, 16vw, 12rem)'
                            : 'clamp(10rem, 24vw, 22rem)',
                        lineHeight: 0.85,
                        letterSpacing: '0.04em',
                        color: 'transparent',
                        WebkitTextStroke: `1px ${pillar.color}20`,
                        userSelect: 'none',
                        pointerEvents: 'none',
                        opacity: 0,
                        whiteSpace: 'nowrap',
                    }}
                >
                    {pillar.word}
                </div>
            )}

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: isMobile
                        ? '0 1.25rem'
                        : isTablet
                            ? '0 2rem'
                            : '0 clamp(2rem, 8vw, 10rem)',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '110px 1fr' : 'auto 1fr',
                    gap: isMobile ? '1.25rem' : isTablet ? '2rem' : 'clamp(2rem, 5vw, 6rem)',
                    alignItems: isMobile ? 'start' : 'center',
                }}
            >
                <div
                    ref={(element) => {
                        numRefs.current[index] = element
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        opacity: 0,
                        justifySelf: isMobile ? 'flex-start' : 'center',
                    }}
                >
          <span
              style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: isMobile
                      ? 'clamp(3.2rem, 16vw, 5rem)'
                      : isTablet
                          ? 'clamp(4.5rem, 10vw, 7rem)'
                          : 'clamp(6rem, 14vw, 13rem)',
                  lineHeight: 0.85,
                  color: 'transparent',
                  WebkitTextStroke: `2px ${pillar.color}`,
                  filter: `drop-shadow(0 0 30px ${pillar.color}55)`,
                  letterSpacing: '0.02em',
              }}
          >
            {pillar.index}
          </span>

                    <div
                        style={{
                            width: 2,
                            height: isMobile ? '2.5rem' : 'clamp(3rem, 8vh, 7rem)',
                            background: `linear-gradient(to bottom, ${pillar.color}, ${pillar.color}00)`,
                            borderRadius: 2,
                        }}
                    />
                </div>

                <div style={{ maxWidth: isMobile ? '100%' : '52ch' }}>
          <span
              ref={(element) => {
                  labelRefs.current[index] = element
              }}
              style={{
                  display: 'inline-block',
                  marginBottom: isMobile ? '0.8rem' : 'clamp(0.8rem, 1.5vw, 1.2rem)',
                  fontFamily: 'monospace',
                  fontSize: isMobile
                      ? '0.58rem'
                      : isTablet
                          ? '0.64rem'
                          : 'clamp(0.6rem, 0.88vw, 0.74rem)',
                  letterSpacing: isMobile ? '0.22em' : '0.4em',
                  textTransform: 'uppercase',
                  color: pillar.color,
                  opacity: 0,
                  padding: '4px 12px',
                  border: `1px solid ${pillar.color}35`,
                  borderRadius: 100,
                  background: `${pillar.color}0d`,
              }}
          >
            {pillar.label}
          </span>

                    <h3
                        ref={(element) => {
                            titleRefs.current[index] = element
                        }}
                        style={{
                            margin: '0 0 clamp(1rem, 2vw, 1.6rem)',
                            fontFamily: '"Bebas Neue", sans-serif',
                            fontSize: isMobile
                                ? 'clamp(2rem, 9vw, 3rem)'
                                : isTablet
                                    ? 'clamp(2.4rem, 5vw, 4rem)'
                                    : 'clamp(2.6rem, 6vw, 5.5rem)',
                            lineHeight: isMobile ? 0.98 : 0.92,
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.95)',
                            opacity: 0,
                        }}
                    >
                        {pillar.title}
                    </h3>

                    <p
                        ref={(element) => {
                            bodyRefs.current[index] = element
                        }}
                        style={{
                            margin: 0,
                            color: 'rgba(255,255,255,0.52)',
                            fontSize: isMobile
                                ? '0.98rem'
                                : isTablet
                                    ? '1rem'
                                    : 'clamp(1rem, 1.2vw, 1.1rem)',
                            lineHeight: isMobile ? 1.7 : 1.85,
                            opacity: 0,
                            maxWidth: '100%',
                        }}
                    >
                        {pillar.body}
                    </p>
                </div>
            </div>

            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${pillar.color}80, transparent)`,
                }}
            />
        </div>
    )
}