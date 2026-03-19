'use client'

import { ABOUT_JOSHUA_COLORS } from '@/components/about-joshua/constants'

type SectionHeaderProps = {
    headerRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function SectionHeader({ headerRef, isMobile }: SectionHeaderProps) {
    return (
        <div ref={headerRef} style={{ marginBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <p
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    margin: '0 0 1.2rem',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.58rem' : 'clamp(0.55rem, 0.9vw, 0.72rem)',
                    letterSpacing: isMobile ? '0.22em' : '0.4em',
                    color: ABOUT_JOSHUA_COLORS.accent,
                    textTransform: 'uppercase',
                    flexWrap: 'wrap',
                }}
            >
                <span
                    style={{
                        display: 'inline-block',
                        width: 28,
                        height: 1,
                        background: 'currentColor',
                        opacity: 0.5,
                    }}
                />
                About Joshua
            </p>

            <h2
                style={{
                    margin: 0,
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: isMobile
                        ? 'clamp(2.8rem, 14vw, 4.6rem)'
                        : 'clamp(4rem, 11vw, 9.5rem)',
                    lineHeight: 0.88,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: ABOUT_JOSHUA_COLORS.text,
                    maxWidth: isMobile ? '100%' : '14ch',
                }}
            >
                A creator
                <br />
                <span style={{ color: ABOUT_JOSHUA_COLORS.accent }}>with his own voice</span>
            </h2>

            <p
                style={{
                    margin: 'clamp(1.2rem, 2.5vw, 1.8rem) 0 0',
                    maxWidth: isMobile ? '100%' : '58ch',
                    color: ABOUT_JOSHUA_COLORS.textSoft,
                    fontSize: isMobile ? '1rem' : 'clamp(1rem, 1.3vw, 1.12rem)',
                    lineHeight: 1.85,
                }}
            >
                Joshua is a creator driven by personality, imagination, and ambition. Through
                gaming, videos, and music, he is building a space that feels true to who he
                is. He lives with schizophrenia, but that is only part of the picture. What
                matters here is his voice, his presence, and the future he is working toward.
            </p>
        </div>
    )
}