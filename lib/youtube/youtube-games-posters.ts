import type { YoutubeGameMention } from '@/lib/youtube/youtube.types'

export function resolveGamePoster({
    catalogPosterUrl,
    latestMention,
}: {
    catalogPosterUrl: string | null
    latestMention: YoutubeGameMention | null
}): { posterUrl: string | null; posterSource: 'catalog' | 'fallback' | 'none' } {
    if (catalogPosterUrl) {
        return { posterUrl: catalogPosterUrl, posterSource: 'catalog' }
    }

    if (latestMention?.thumbnail) {
        return { posterUrl: latestMention.thumbnail, posterSource: 'fallback' }
    }

    return { posterUrl: null, posterSource: 'none' }
}

