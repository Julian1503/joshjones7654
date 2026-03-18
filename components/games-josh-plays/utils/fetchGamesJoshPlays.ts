import type { GamesJoshPlaysResponse } from '@/components/games-josh-plays/types'

export async function fetchGamesJoshPlays(): Promise<GamesJoshPlaysResponse> {
    const response = await fetch('/api/youtube/games', { method: 'GET' })
    const payload = (await response.json()) as GamesJoshPlaysResponse | { message?: string }

    if (!response.ok) {
        throw new Error(payload.message ?? 'Failed to fetch games Josh plays')
    }

    return payload as GamesJoshPlaysResponse
}

