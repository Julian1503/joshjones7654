'use client'

import { useEffect, useState } from 'react'
import type { JoshGame } from '@/components/games-josh-plays/types'
import { fetchGamesJoshPlays } from '@/components/games-josh-plays/utils/fetchGamesJoshPlays'

export function useGamesJoshPlaysData(enabled = true) {
    const [games, setGames] = useState<JoshGame[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [degradedNotice, setDegradedNotice] = useState<string | null>(null)

    useEffect(() => {
        if (!enabled) return

        let mounted = true

        fetchGamesJoshPlays()
            .then((data) => {
                if (!mounted) return

                setGames(data.games)
                setFetchError(null)
                setDegradedNotice(
                    data.isDegraded
                        ? data.message ?? 'Showing cached game insights while YouTube is temporarily limited.'
                        : null
                )
            })
            .catch((error) => {
                if (!mounted) return
                setFetchError(error instanceof Error ? error.message : 'Unexpected games error')
            })
            .finally(() => {
                if (mounted) setIsLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [enabled])

    return {
        games,
        isLoading,
        fetchError,
        degradedNotice,
    }
}
