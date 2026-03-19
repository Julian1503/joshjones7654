'use client'

import { useGamesJoshPlaysData } from '@/components/games-josh-plays/hooks/useGamesJoshPlaysData'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { useSectionAnimation } from '@/components/games-josh-plays/hooks/useSectionAnimation'
import { GAMES_SECTION_COLORS, GAMES_SECTION_ID } from '@/components/games-josh-plays/constants'
import { GamesSectionHeader } from '@/components/games-josh-plays/components/GamesSectionHeader'
import { GamesGrid } from '@/components/games-josh-plays/components/GamesGrid'
import { GamesEmptyState } from '@/components/games-josh-plays/components/GamesEmptyState'
import { GamesSkeleton } from '@/components/games-josh-plays/components/GamesSkeleton'
import { SOCIAL_LINKS } from '@/lib/navigation/site-navigation'

export default function GamesJoshPlaysSection() {
    const { isMobile, isTablet } = useResponsiveSection()
    const { sectionRef, bgGlowRef } = useSectionAnimation()
    const { games, isLoading, fetchError, degradedNotice } = useGamesJoshPlaysData()

    return (
        <section
            ref={sectionRef}
            id={GAMES_SECTION_ID}
            style={{
                position: 'relative',
                background: GAMES_SECTION_COLORS.background,
                padding: 'clamp(4.8rem, 8.4vw, 8rem) 0',
                overflow: 'hidden',
                opacity: 0,
            }}
        >
            {/* Parallax radial glow */}
            <div
                ref={bgGlowRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(circle at 75% 20%, rgba(255,69,69,0.12) 0%, transparent 50%)',
                    backgroundSize: '200% 200%',
                    backgroundPosition: '75% 20%',
                    pointerEvents: 'none',
                }}
                aria-hidden
            />

            {/* Subtle scan-line texture */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)',
                    pointerEvents: 'none',
                    zIndex: 0,
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

                {/* Degraded notice (server cache or localStorage fallback) */}
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

                {isLoading ? (
                    <GamesSkeleton isMobile={isMobile} isTablet={isTablet} />
                ) : fetchError ? (
                    /* Hard error — no server cache, no localStorage cache */
                    <div
                        style={{
                            border: '1px solid rgba(255,107,107,0.36)',
                            borderRadius: 16,
                            background: 'rgba(255,107,107,0.06)',
                            padding: isMobile ? '1.4rem 1rem' : '2rem 1.4rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 12,
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                color: 'rgba(255,155,155,0.92)',
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.62rem' : '0.68rem',
                                letterSpacing: '0.08em',
                            }}
                        >
                            Game insights are temporarily unavailable.
                        </p>
                        <a
                            href={SOCIAL_LINKS.youtubeJoshua.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 18px',
                                borderRadius: 999,
                                border: '1px solid rgba(255,69,69,0.4)',
                                background: 'rgba(255,69,69,0.1)',
                                color: '#ff6b6b',
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.58rem' : '0.62rem',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                            }}
                        >
                            Watch on YouTube ↗
                        </a>
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