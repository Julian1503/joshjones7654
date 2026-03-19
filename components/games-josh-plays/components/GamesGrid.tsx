'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import type { JoshGame } from '@/components/games-josh-plays/types'
import { GameCard } from '@/components/games-josh-plays/components/GameCard'
import { useGridAnimation, PAGE_SIZE } from '@/components/games-josh-plays/hooks/useGridAnimation'
import { GAMES_SECTION_COLORS } from '@/components/games-josh-plays/constants'

type GamesGridProps = {
    games: JoshGame[]
    isMobile: boolean
    isTablet: boolean
}

export function GamesGrid({ games, isMobile, isTablet }: GamesGridProps) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const { gridRef } = useGridAnimation(games, visibleCount)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const visibleGames = games.slice(0, visibleCount)
    const hasMore = visibleCount < games.length
    const remaining = games.length - visibleCount

    const columns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, minmax(0, 1fr))'

    const handleLoadMore = () => {
        if (!buttonRef.current) return

        // Button press feedback before expanding
        gsap.timeline()
            .to(buttonRef.current, {
                scale: 0.95,
                duration: 0.1,
                ease: 'power2.in',
            })
            .to(buttonRef.current, {
                scale: 1,
                duration: 0.2,
                ease: 'back.out(2)',
                onComplete: () => {
                    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, games.length))
                },
            })
    }

    const handleButtonEnter = () => {
        gsap.to(buttonRef.current, {
            borderColor: 'rgba(255,69,69,0.6)',
            color: 'rgba(255,255,255,0.95)',
            duration: 0.2,
            ease: 'power2.out',
        })
    }

    const handleButtonLeave = () => {
        gsap.to(buttonRef.current, {
            borderColor: 'rgba(255,69,69,0.25)',
            color: GAMES_SECTION_COLORS.textSecondary,
            duration: 0.25,
            ease: 'power2.out',
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            <div
                ref={gridRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: columns,
                    gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                }}
            >
                {visibleGames.map((game) => (
                    <GameCard key={game.id} game={game} isMobile={isMobile} />
                ))}
            </div>

            {hasMore && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                        ref={buttonRef}
                        onClick={handleLoadMore}
                        onMouseEnter={handleButtonEnter}
                        onMouseLeave={handleButtonLeave}
                        style={{
                            padding: isMobile ? '0.65rem 1.8rem' : '0.72rem 2.2rem',
                            borderRadius: 999,
                            border: '1px solid rgba(255,69,69,0.25)',
                            background: 'transparent',
                            color: GAMES_SECTION_COLORS.textSecondary,
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.6rem' : '0.65rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            willChange: 'transform',
                        }}
                    >
                        Load more — {remaining} remaining
                    </button>

                    <p
                        style={{
                            margin: 0,
                            color: GAMES_SECTION_COLORS.textMuted,
                            fontFamily: 'monospace',
                            fontSize: '0.52rem',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {visibleCount} of {games.length} games
                    </p>
                </div>
            )}
        </div>
    )
}