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
                More than
                <br />
                <span style={{ color: ABOUT_JOSHUA_COLORS.accent }}>a diagnosis</span>
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
                Joshua is a creator shaped by struggle, imagination, and ambition. He lives
                with schizophrenia, but his story is not only about symptoms. It is about
                being understood, finding identity, and holding onto a dream that still burns
                very clearly.
            </p>
        </div>
    )
}