'use client'

import type React from 'react'
import type { Pillar } from '../types'

type PillarPanelProps = {
    pillar: Pillar
    index: number
    panelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    bgRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    wordRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    numRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    labelRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
    titleRefs: React.MutableRefObject<(HTMLHeadingElement | null)[]>
    bodyRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>
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
                alignItems: 'center',
                overflow: 'hidden',
                clipPath: 'inset(100% 0% 0% 0%)',
                opacity: 0,
                zIndex: 20 + index,
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

            <div
                ref={(element) => {
                    wordRefs.current[index] = element
                }}
                style={{
                    position: 'absolute',
                    right: '-2vw',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(10rem, 24vw, 22rem)',
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

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '0 clamp(2rem, 8vw, 10rem)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 'clamp(2rem, 5vw, 6rem)',
                    alignItems: 'center',
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
                    }}
                >
          <span
              style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(6rem, 14vw, 13rem)',
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
                            height: 'clamp(3rem, 8vh, 7rem)',
                            background: `linear-gradient(to bottom, ${pillar.color}, ${pillar.color}00)`,
                            borderRadius: 2,
                        }}
                    />
                </div>

                <div style={{ maxWidth: '52ch' }}>
          <span
              ref={(element) => {
                  labelRefs.current[index] = element
              }}
              style={{
                  display: 'inline-block',
                  marginBottom: 'clamp(0.8rem, 1.5vw, 1.2rem)',
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.6rem, 0.88vw, 0.74rem)',
                  letterSpacing: '0.4em',
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
                            fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                            lineHeight: 0.92,
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
                            fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                            lineHeight: 1.85,
                            opacity: 0,
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