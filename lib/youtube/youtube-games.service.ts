import { GAMES_SCAN_LIMIT } from '@/lib/youtube/youtube-games.constants'
import { DefaultGameCatalogResolver } from '@/lib/youtube/games/catalog/resolver'
import { LocalGameCatalogRepository } from '@/lib/youtube/games/catalog/repository'
import { RawgGameProviderClient } from '@/lib/youtube/games/providers/rawg.client'
import { extractGameCandidatesFromMetadata } from '@/lib/youtube/games/detection/extractor'
import { normalizeCandidateGameName } from '@/lib/youtube/games/detection/normalizer'
import { resolveGamePoster } from '@/lib/youtube/youtube-games-posters'
import { fetchYoutube, getChannelInfo } from '@/lib/youtube/youtube.service'
import {
    DEFAULT_YOUTUBE_HANDLE,
    YOUTUBE_API_BASE_URL,
    type YoutubeDetectedGame,
    type YoutubeGameMention,
    type YoutubeGamesResponse,
    type YoutubePlaylistItemsResponse,
    type YoutubeVideosSnippetListResponse,
} from '@/lib/youtube/youtube.types'
import {
    assertEnv,
    buildYoutubeWatchUrl,
    formatRelativeDate,
    pickBestThumbnail,
} from '@/lib/youtube/youtube.utils'

type GetDetectedGamesParams = {
    handle?: string
    scanLimit?: number
}

const catalogRepository = new LocalGameCatalogRepository()
const catalogResolver = new DefaultGameCatalogResolver(
    catalogRepository,
    new RawgGameProviderClient()
)

export async function getDetectedGamesFromYoutube(
    params: GetDetectedGamesParams = {}
): Promise<YoutubeGamesResponse> {
    const apiKey = assertEnv(process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY')
    const handle = params.handle ?? DEFAULT_YOUTUBE_HANDLE
    const scanLimit = Math.max(6, Math.min(params.scanLimit ?? GAMES_SCAN_LIMIT, 50))

    const { uploadsPlaylistId } = await getChannelInfo({ apiKey, handle })

    const playlistItems = await getLatestPlaylistItems({
        apiKey,
        playlistId: uploadsPlaylistId,
        maxResults: scanLimit,
    })

    const tagsByVideoId = await getVideoTagsMap({
        apiKey,
        videoIds: playlistItems
            .map((item) => item.contentDetails?.videoId)
            .filter((id): id is string => Boolean(id)),
    })

    const games = await inferGamesFromPlaylist(playlistItems, tagsByVideoId)

    return {
        channelHandle: handle,
        generatedAt: new Date().toISOString(),
        games,
        isDegraded: false,
    }
}

async function getLatestPlaylistItems({
    apiKey,
    playlistId,
    maxResults,
}: {
    apiKey: string
    playlistId: string
    maxResults: number
}): Promise<NonNullable<YoutubePlaylistItemsResponse['items']>> {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/playlistItems`)
    url.searchParams.set('part', 'snippet,contentDetails')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', String(maxResults))
    url.searchParams.set('key', apiKey)

    const response = await fetchYoutube<YoutubePlaylistItemsResponse>(url.toString())
    return response.items ?? []
}

async function getVideoTagsMap({
    apiKey,
    videoIds,
}: {
    apiKey: string
    videoIds: string[]
}): Promise<Map<string, string[]>> {
    if (videoIds.length === 0) return new Map()

    const url = new URL(`${YOUTUBE_API_BASE_URL}/videos`)
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('id', videoIds.slice(0, 50).join(','))
    url.searchParams.set('key', apiKey)

    const response = await fetchYoutube<YoutubeVideosSnippetListResponse>(url.toString())
    const tagsByVideoId = new Map<string, string[]>()

    for (const item of response.items ?? []) {
        if (!item.id) continue
        tagsByVideoId.set(item.id, item.snippet?.tags ?? [])
    }

    return tagsByVideoId
}

async function inferGamesFromPlaylist(
    items: NonNullable<YoutubePlaylistItemsResponse['items']>,
    tagsByVideoId: Map<string, string[]>
): Promise<YoutubeDetectedGame[]> {
    const mentionsByGame = new Map<string, { displayName: string; posterUrl: string | null; mentions: YoutubeGameMention[] }>()

    for (const item of items) {
        const videoId = item.contentDetails?.videoId
        const title = item.snippet?.title?.trim()
        if (!videoId || !title) continue

        const description = item.snippet?.description?.trim() ?? ''
        const tags = tagsByVideoId.get(videoId) ?? []
        const seenKeysForVideo = new Set<string>()

        const candidates = extractGameCandidatesFromMetadata({
            title,
            description,
            tags,
        })

        for (const candidate of candidates) {
            const normalized = normalizeCandidateGameName(candidate.value)
            if (!normalized.normalizedName || !normalized.displayName) continue

            const catalogEntry = await catalogResolver.resolve({
                normalizedName: normalized.normalizedName,
                alias: normalized.displayName,
            })

            if (!catalogEntry && candidate.confidence < 0.9) {
                continue
            }

            const mention: YoutubeGameMention = {
                videoId,
                videoTitle: title,
                videoDate: formatRelativeDate(item.snippet?.publishedAt),
                videoUrl: buildYoutubeWatchUrl(videoId),
                thumbnail: pickBestThumbnail(item.snippet?.thumbnails, videoId),
                matchedAlias: normalized.alias,
            }

            const gameKey = catalogEntry?.normalizedName ?? normalized.normalizedName
            if (seenKeysForVideo.has(gameKey)) {
                continue
            }
            seenKeysForVideo.add(gameKey)

            const existing = mentionsByGame.get(gameKey)

            if (existing) {
                existing.mentions.push(mention)
                continue
            }

            mentionsByGame.set(gameKey, {
                displayName: catalogEntry?.displayName ?? normalized.displayName,
                posterUrl: catalogEntry?.posterUrl ?? null,
                mentions: [mention],
            })
        }
    }

    return Array.from(mentionsByGame.entries())
        .map(([normalizedName, value]) => {
            const latestMention = value.mentions[0] ?? null
            const poster = resolveGamePoster({
                catalogPosterUrl: value.posterUrl,
                latestMention,
            })

            return {
                id: normalizedName.replace(/\s+/g, '-'),
                gameName: value.displayName,
                mentionCount: value.mentions.length,
                posterUrl: poster.posterUrl,
                posterSource: poster.posterSource,
                latestMention,
                mentions: value.mentions,
            } satisfies YoutubeDetectedGame
        })
        .sort((left, right) => right.mentionCount - left.mentionCount)
}
