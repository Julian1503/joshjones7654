'use client'

import { GAMES_SECTION_COLORS } from '@/components/games-josh-plays/constants'

type GamesSectionHeaderProps = {
    isMobile: boolean
}

export function GamesSectionHeader({ isMobile }: GamesSectionHeaderProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginBottom: 'clamp(1.6rem, 3.5vw, 3rem)',
            }}
        >
            <div>
                <p
                    style={{
                        margin: '0 0 0.9rem',
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.58rem' : '0.64rem',
                        letterSpacing: isMobile ? '0.22em' : '0.35em',
                        textTransform: 'uppercase',
                        color: GAMES_SECTION_COLORS.accent,
                    }}
                >
                    Games Josh Plays
                </p>

                <h2
                    style={{
                        margin: 0,
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile ? 'clamp(2.4rem, 12vw, 3.5rem)' : 'clamp(3rem, 6vw, 5.8rem)',
                        letterSpacing: '0.04em',
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        color: GAMES_SECTION_COLORS.textPrimary,
                    }}
                >
                    Worlds He
                    <br />
                    <span style={{ color: GAMES_SECTION_COLORS.accent }}>lives in</span>
                </h2>
            </div>

            <p
                style={{
                    margin: 0,
                    maxWidth: isMobile ? '100%' : '38ch',
                    color: GAMES_SECTION_COLORS.textSecondary,
                    fontSize: isMobile ? '0.92rem' : '1rem',
                    lineHeight: 1.7,
                }}
            >
                Inferred from recent YouTube uploads. This highlights the games that show up most
                in Josh&apos;s content right now.
            </p>
        </div>
    )
}

