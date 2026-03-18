'use client'

import { useGamesJoshPlaysData } from '@/components/games-josh-plays/hooks/useGamesJoshPlaysData'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { GAMES_SECTION_COLORS, GAMES_SECTION_ID } from '@/components/games-josh-plays/constants'
import { GamesSectionHeader } from '@/components/games-josh-plays/components/GamesSectionHeader'
import { GamesGrid } from '@/components/games-josh-plays/components/GamesGrid'
import { GamesEmptyState } from '@/components/games-josh-plays/components/GamesEmptyState'

export default function GamesJoshPlaysSection() {
    const { isMobile, isTablet } = useResponsiveSection()
    const { games, isLoading, fetchError, degradedNotice } = useGamesJoshPlaysData()

    return (
        <section
            id={GAMES_SECTION_ID}
            style={{
                position: 'relative',
                background: GAMES_SECTION_COLORS.background,
                padding: 'clamp(4.8rem, 8.4vw, 8rem) 0',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(circle at 75% 20%, rgba(255,69,69,0.12) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }}
                aria-hidden
            />

            <div
                style={{
                    width: isMobile ? 'calc(100% - 2rem)' : 'min(1200px, calc(100% - 3rem))',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <GamesSectionHeader isMobile={isMobile} />

                {degradedNotice && (
                    <div
                        style={{
                            marginBottom: '1rem',
                            border: '1px solid rgba(255,69,69,0.3)',
                            borderRadius: 12,
                            background: 'rgba(255,69,69,0.08)',
                            padding: isMobile ? '0.62rem 0.75rem' : '0.72rem 0.9rem',
                            color: GAMES_SECTION_COLORS.textSecondary,
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.56rem' : '0.62rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {degradedNotice}
                    </div>
                )}

                {fetchError && (
                    <div
                        style={{
                            marginBottom: '1rem',
                            border: '1px solid rgba(255,107,107,0.36)',
                            borderRadius: 12,
                            background: 'rgba(255,107,107,0.1)',
                            padding: isMobile ? '0.62rem 0.75rem' : '0.72rem 0.9rem',
                            color: 'rgba(255,155,155,0.92)',
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.56rem' : '0.62rem',
                            letterSpacing: '0.08em',
                        }}
                    >
                        {`Could not refresh game insights right now. ${fetchError}`}
                    </div>
                )}

                {isLoading ? (
                    <div
                        style={{
                            border: `1px solid ${GAMES_SECTION_COLORS.border}`,
                            borderRadius: 16,
                            padding: isMobile ? '1rem' : '1.4rem',
                            color: GAMES_SECTION_COLORS.textMuted,
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.62rem' : '0.68rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Loading game insights...
                    </div>
                ) : games.length > 0 ? (
                    <GamesGrid games={games} isMobile={isMobile} isTablet={isTablet} />
                ) : (
                    <GamesEmptyState isMobile={isMobile} />
                )}
            </div>
        </section>
    )
}

