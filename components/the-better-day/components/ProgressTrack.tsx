'use client'

import type { Pillar } from '@/components/the-better-day/types'
import React from 'react'

type ProgressTrackProps = {
    pillars: readonly Pillar[]
    trackRef: React.RefObject<HTMLDivElement | null>
    fillRef: React.RefObject<HTMLDivElement | null>
    dotRefs: React.RefObject<(HTMLDivElement | null)[]>
    isMobile: boolean
    isTablet: boolean
}

export function ProgressTrack({
                                  pillars,
                                  trackRef,
                                  fillRef,
                                  dotRefs,
                                  isMobile,
                                  isTablet,
                              }: ProgressTrackProps) {
    if (isMobile) {
        return null
    }

    return (
        <div
            ref={trackRef}
            style={{
                position: 'fixed',
                right: isTablet ? '1rem' : 'clamp(1.4rem, 3vw, 2.6rem)',
                top: '50%',
                transform: `translateY(-50%) scale(${isTablet ? 0.9 : 1})`,
                transformOrigin: 'center center',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0,
                gap: 0,
                height: `${(pillars.length - 1) * 28 + 8}px`,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: '50%',
                    width: 1,
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(-50%)',
                }}
            />

            <div
                ref={fillRef}
                style={{
                    position: 'absolute',
                    top: 4,
                    left: '50%',
                    width: 2,
                    height: 0,
                    background: pillars[0]?.color ?? '#fff',
                    transform: 'translateX(-50%)',
                    transformOrigin: 'top center',
                    transition: 'background 0.5s',
                    borderRadius: 2,
                }}
            />

            {pillars.map((pillar, index) => (
                <div
                    key={pillar.index}
                    ref={(element) => {
                        dotRefs.current[index] = element
                    }}
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'transparent',
                        marginTop: index === 0 ? 0 : 20,
                        transition: 'all 0.4s ease',
                        position: 'relative',
                    }}
                >
          <span
              style={{
                  position: 'absolute',
                  right: 18,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'monospace',
                  fontSize: isTablet ? '0.52rem' : '0.58rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
              }}
          >
            {pillar.label}
          </span>
                </div>
            ))}
        </div>
    )
}