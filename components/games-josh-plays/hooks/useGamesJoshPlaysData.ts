'use client'

import { useEffect, useState } from 'react'
import type { JoshGame } from '@/components/games-josh-plays/types'
import { fetchGamesJoshPlays } from '@/components/games-josh-plays/utils/fetchGamesJoshPlays'
import { createLocalStorageCache } from '@/lib/browser/local-storage-cache'

const CACHE_KEY = 'josh_games_cache'
const CACHE_MAX_AGE_MS = 3 * 60 * 60 * 1000 // 3 hours

type CachedGames = {
    games: JoshGame[]
}

const gamesCache = createLocalStorageCache<CachedGames>(CACHE_KEY, CACHE_MAX_AGE_MS)

function loadFromCache(): JoshGame[] | null {
    return gamesCache.load()?.games ?? null
}

function saveToCache(games: JoshGame[]) {
    gamesCache.save({ games })
}

export function useGamesJoshPlaysData() {
    const [games, setGames] = useState<JoshGame[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [degradedNotice, setDegradedNotice] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        fetchGamesJoshPlays()
            .then((data) => {
                if (!mounted) return

                setGames(data.games)
                setFetchError(null)

                const notice = data.isDegraded
                    ? (data.message ?? 'Showing cached game insights while YouTube is temporarily limited.')
                    : null
                setDegradedNotice(notice)

                // Save fresh (non-degraded) data to localStorage for future fallback
                if (!data.isDegraded && data.games.length > 0) {
                    saveToCache(data.games)
                }
            })
            .catch((error) => {
                if (!mounted) return

                const cached = loadFromCache()
                if (cached && cached.length > 0) {
                    // Show stale cache silently while surfacing a soft notice
                    setGames(cached)
                    setFetchError(null)
                    setDegradedNotice('Showing saved game data. Live data is temporarily unavailable.')
                } else {
                    setFetchError(error instanceof Error ? error.message : 'Unexpected games error')
                }
            })
            .finally(() => {
                if (mounted) setIsLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [])

    return {
        games,
        isLoading,
        fetchError,
        degradedNotice,
    }
}