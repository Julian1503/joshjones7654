import type { GamesJoshPlaysResponse } from '@/components/games-josh-plays/types'
import { fetchJson } from '@/lib/api/fetch-json'

export async function fetchGamesJoshPlays(): Promise<GamesJoshPlaysResponse> {
    return fetchJson<GamesJoshPlaysResponse>('/api/youtube/games', 'Failed to fetch games Josh plays')
}

