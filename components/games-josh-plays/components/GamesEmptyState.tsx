'use client'

import { GAMES_EMPTY_MESSAGE, GAMES_SECTION_COLORS } from '@/components/games-josh-plays/constants'

type GamesEmptyStateProps = {
    isMobile: boolean
}

export function GamesEmptyState({ isMobile }: GamesEmptyStateProps) {
    return (
        <div
            style={{
                border: `1px solid ${GAMES_SECTION_COLORS.border}`,
                borderRadius: 16,
                padding: isMobile ? '1rem' : '1.4rem',
                background: 'rgba(12,14,16,0.6)',
                textAlign: 'center',
            }}
        >
            <p
                style={{
                    margin: 0,
                    color: GAMES_SECTION_COLORS.textSecondary,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.62rem' : '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    lineHeight: 1.8,
                }}
            >
                {GAMES_EMPTY_MESSAGE}
            </p>
        </div>
    )
}

