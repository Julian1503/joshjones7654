'use client'

import type { JoshGame } from '@/components/games-josh-plays/types'
import { GAMES_SECTION_COLORS } from '@/components/games-josh-plays/constants'
import { useCardAnimation } from '@/components/games-josh-plays/hooks/useCardAnimation'

type GameCardProps = {
    game: JoshGame
    isMobile: boolean
}

export function GameCard({ game, isMobile }: GameCardProps) {
    const { cardRef, shimmerRef, contentRef, handlers } = useCardAnimation()

    return (
        <article
            ref={cardRef}
            data-game-card
            style={{
                position: 'relative',
                borderRadius: 16,
                border: `1px solid ${GAMES_SECTION_COLORS.border}`,
                overflow: 'hidden',
                background: GAMES_SECTION_COLORS.surface,
                minHeight: isMobile ? 280 : 360,
                cursor: 'default',
                willChange: 'transform',
            }}
            onMouseEnter={handlers.onMouseEnter}
            onMouseLeave={handlers.onMouseLeave}
            onMouseMove={handlers.onMouseMove}
        >
            {/* Poster / gradient background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: game.posterUrl
                        ? `linear-gradient(to top, rgba(7,8,9,0.95) 22%, rgba(7,8,9,0.45) 62%, rgba(7,8,9,0.12) 100%), url(${game.posterUrl}) center/cover no-repeat`
                        : 'linear-gradient(135deg, rgba(255,69,69,0.18), rgba(255,122,80,0.08) 55%, rgba(7,8,9,0.9))',
                }}
                aria-hidden
            />

            {/* Noise texture */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                    opacity: 0.03,
                    pointerEvents: 'none',
                }}
                aria-hidden
            />

            {/* Mouse-tracking shimmer */}
            <div
                ref={shimmerRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'background 0.08s ease',
                }}
                aria-hidden
            />

            <div
                ref={contentRef}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    gap: 8,
                }}
            >
                <span
                    style={{
                        alignSelf: 'flex-start',
                        padding: '4px 8px',
                        borderRadius: 999,
                        border: '1px solid rgba(255,69,69,0.35)',
                        background: 'rgba(255,69,69,0.12)',
                        color: GAMES_SECTION_COLORS.textPrimary,
                        fontFamily: 'monospace',
                        fontSize: '0.55rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                    }}
                >
                    {game.mentionCount} mentions
                </span>

                <h3
                    style={{
                        margin: 0,
                        color: GAMES_SECTION_COLORS.textPrimary,
                        fontSize: isMobile ? '1.05rem' : '1.15rem',
                        lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                    }}
                >
                    {game.gameName}
                </h3>

                <p
                    style={{
                        margin: 0,
                        color: GAMES_SECTION_COLORS.textSecondary,
                        fontFamily: 'monospace',
                        fontSize: '0.58rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                    }}
                >
                    {game.latestMention ? `Latest: ${game.latestMention.videoDate}` : 'Recent mention unavailable'}
                </p>
            </div>
        </article>
    )
}
