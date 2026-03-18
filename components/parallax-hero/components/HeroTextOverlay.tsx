'use client'

import type { CSSProperties, RefObject } from 'react'
import { COLORS } from '@/components/parallax-hero/constants'
import { RoleTags } from '@/components/parallax-hero/components/RoleTags'
import type { HeroViewport } from '@/components/parallax-hero/types'

type HeroTextOverlayProps = {
    fullLayerStyle: CSSProperties
    textGroupRef: RefObject<HTMLDivElement | null>
    eyebrowRef: RefObject<HTMLParagraphElement | null>
    titleRef: RefObject<HTMLHeadingElement | null>
    rolesRef: RefObject<HTMLDivElement | null>
    viewport: HeroViewport
}

export function HeroTextOverlay({
                                    fullLayerStyle,
                                    textGroupRef,
                                    eyebrowRef,
                                    titleRef,
                                    rolesRef,
                                    viewport,
                                }: HeroTextOverlayProps) {
    const isMobile = viewport === 'mobile'
    const isTablet = viewport === 'tablet'

    return (
        <div
            style={{
                ...fullLayerStyle,
                zIndex: 5,
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                paddingTop: isMobile ? '5.5rem' : 0,
                paddingInline: isMobile ? '1rem' : isTablet ? '2rem' : 0,
            }}
        >
            <div
                ref={textGroupRef}
                style={{
                    willChange: 'transform, opacity',
                    textAlign: 'center',
                    transform: isMobile
                        ? 'translateY(0)'
                        : isTablet
                            ? 'translateY(-10vh)'
                            : 'translateY(-18vh)',
                    maxWidth: isMobile ? '100%' : 'none',
                }}
            >
                <p
                    ref={eyebrowRef}
                    className="font-mono"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? 8 : 10,
                        margin: '0 0 8px',
                        color: COLORS.accent,
                        fontSize: isMobile
                            ? '0.52rem'
                            : isTablet
                                ? '0.64rem'
                                : 'clamp(0.55rem, 1vw, 0.8rem)',
                        letterSpacing: isMobile ? '0.22em' : '0.4em',
                        textTransform: 'uppercase',
                        textShadow: '0 0 14px rgba(255,69,69,0.5)',
                        animation: 'flicker 8s ease-in-out infinite',
                        willChange: 'transform, opacity, filter',
                        flexWrap: 'wrap',
                    }}
                >
          <span
              style={{
                  display: 'inline-block',
                  width: isMobile ? 18 : 28,
                  height: 1,
                  background: 'currentColor',
                  opacity: 0.55,
              }}
          />
                    THIS IS ME
                    <span
                        style={{
                            display: 'inline-block',
                            width: isMobile ? 18 : 28,
                            height: 1,
                            background: 'currentColor',
                            opacity: 0.55,
                        }}
                    />
                </p>

                <h1
                    ref={titleRef}
                    className="font-bebas"
                    style={{
                        margin: 0,
                        fontSize: isMobile
                            ? 'clamp(3.2rem, 18vw, 5.4rem)'
                            : isTablet
                                ? 'clamp(4.5rem, 12vw, 7.5rem)'
                                : 'clamp(4.5rem, 13vw, 12rem)',
                        lineHeight: 0.9,
                        letterSpacing: isMobile ? '0.03em' : '0.06em',
                        background: 'linear-gradient(180deg, #ffffff 15%, #ffb3b3 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        WebkitTextStroke: `1px ${COLORS.titleStroke}`,
                        textShadow:
                            '0 0 32px rgba(255,69,69,0.2), 0 4px 16px rgba(0,0,0,0.8)',
                        willChange: 'transform, opacity, filter',
                    }}
                >
                    JOSHUA
                </h1>

                <div
                    ref={rolesRef}
                    className="font-mono"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? 6 : 10,
                        marginTop: isMobile ? 8 : 10,
                        color: 'rgba(255,255,255,0.38)',
                        fontSize: isMobile
                            ? '0.46rem'
                            : isTablet
                                ? '0.58rem'
                                : 'clamp(0.48rem, 0.85vw, 0.7rem)',
                        letterSpacing: isMobile ? '0.16em' : '0.32em',
                        textTransform: 'uppercase',
                        willChange: 'transform, opacity, filter',
                        flexWrap: 'wrap',
                    }}
                >
                    <RoleTags viewport={viewport} />
                </div>
            </div>
        </div>
    )
}