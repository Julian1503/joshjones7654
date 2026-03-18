'use client'

import type { JoshGame } from '@/components/games-josh-plays/types'
import { GameCard } from '@/components/games-josh-plays/components/GameCard'

type GamesGridProps = {
    games: JoshGame[]
    isMobile: boolean
    isTablet: boolean
}

export function GamesGrid({ games, isMobile, isTablet }: GamesGridProps) {
    const columns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, minmax(0, 1fr))'

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: columns,
                gap: 'clamp(0.8rem, 2vw, 1.2rem)',
            }}
        >
            {games.map((game) => (
                <GameCard key={game.id} game={game} isMobile={isMobile} />
            ))}
        </div>
    )
}

