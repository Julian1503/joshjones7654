'use client'

import { ABOUT_JOSHUA_COLORS } from '@/components/about-joshua/constants'

type PullQuoteProps = {
    quoteRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function PullQuote({ quoteRef, isMobile }: PullQuoteProps) {
    return (
        <div
            ref={quoteRef}
            style={{
                marginTop: 'clamp(4rem, 8vw, 8rem)',
                padding: isMobile ? '1.4rem 1.2rem 1.5rem' : 'clamp(2rem, 4vw, 3.5rem)',
                position: 'relative',
                borderLeft: `2px solid ${ABOUT_JOSHUA_COLORS.accent}`,
                background: 'linear-gradient(120deg, rgba(77,227,255,0.05) 0%, transparent 60%)',
            }}
        >
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: isMobile ? '-0.4rem' : '-1.2rem',
                    left: isMobile ? '1rem' : 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontFamily: 'Georgia, serif',
                    fontSize: isMobile ? 'clamp(3.5rem, 18vw, 5rem)' : 'clamp(6rem, 10vw, 9rem)',
                    lineHeight: 1,
                    color: ABOUT_JOSHUA_COLORS.accent,
                    opacity: 0.14,
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
            >
                "
            </div>

            <p
                style={{
                    position: 'relative',
                    margin: 0,
                    maxWidth: isMobile ? '100%' : '48ch',
                    color: ABOUT_JOSHUA_COLORS.text,
                    fontSize: isMobile
                        ? 'clamp(1.15rem, 6vw, 1.6rem)'
                        : 'clamp(1.45rem, 2.8vw, 2.4rem)',
                    lineHeight: 1.28,
                    letterSpacing: '-0.03em',
                }}
            >
                He does not want pity. He wants presence, a voice, an audience, and a future
                big enough to hold his name.
            </p>

            <p
                style={{
                    margin: '1.4rem 0 0',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.62rem' : '0.7rem',
                    letterSpacing: isMobile ? '0.18em' : '0.3em',
                    color: ABOUT_JOSHUA_COLORS.accent,
                    textTransform: 'uppercase',
                    opacity: 0.7,
                }}
            >
                — On Joshua
            </p>
        </div>
    )
}