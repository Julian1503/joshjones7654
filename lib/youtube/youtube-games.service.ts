import { GAMES_SCAN_LIMIT } from '@/lib/youtube/youtube-games.constants'
import { DefaultGameCatalogResolver } from '@/lib/youtube/games/catalog/resolver'
import { LocalGameCatalogRepository } from '@/lib/youtube/games/catalog/repository'
import { RawgGameProviderClient } from '@/lib/youtube/games/providers/rawg.client'
import { ScanStateRepository } from '@/lib/youtube/games/scan/scan-state.repository'
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
    forceFullScan?: boolean // bypass checkpoint for a fresh full scan
}

const catalogRepository = new LocalGameCatalogRepository()
const catalogResolver = new DefaultGameCatalogResolver(
    catalogRepository,
    new RawgGameProviderClient()
)
const scanStateRepository = new ScanStateRepository()

export async function getDetectedGamesFromYoutube(
    params: GetDetectedGamesParams = {}
): Promise<YoutubeGamesResponse> {
    const apiKey = assertEnv(process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY')
    const handle = params.handle ?? DEFAULT_YOUTUBE_HANDLE
    const scanLimit = Math.max(6, Math.min(params.scanLimit ?? GAMES_SCAN_LIMIT, 500))

    const { uploadsPlaylistId } = await getChannelInfo({ apiKey, handle })

    // Load previously accumulated state (checkpoint + game mentions)
    const scanState = await scanStateRepository.load()
    const checkpointVideoId = params.forceFullScan ? null : scanState.checkpointVideoId

    // Fetch only videos newer than the checkpoint.
    // On first run (no checkpoint), this fetches up to scanLimit videos.
    const { items: newItems, firstVideoId } = await getPlaylistItemsSinceCheckpoint({
        apiKey,
        playlistId: uploadsPlaylistId,
        stopAtVideoId: checkpointVideoId,
        limit: scanLimit,
    })

    // If no new videos since last scan, return cached results immediately
    if (newItems.length === 0 && Object.keys(scanState.games).length > 0) {
        return buildResponse(handle, scanState.games)
    }

    // Fetch tags for new videos only — chunked in batches of 50
    const videoIds = newItems
        .map((item) => item.contentDetails?.videoId)
        .filter((id): id is string => Boolean(id))
    const tagsByVideoId = await getVideoTagsMapPaginated({ apiKey, videoIds })

    // Detect games from new videos
    const freshGames = await inferGamesFromPlaylist(newItems, tagsByVideoId)

    // Merge into accumulated state
    const mergedGames = ScanStateRepository.merge(scanState.games, freshGames)

    // Save new checkpoint = the most recent video seen in this scan
    await scanStateRepository.save({
        ...scanState,
        checkpointVideoId: firstVideoId ?? scanState.checkpointVideoId,
        checkpointScannedAt: new Date().toISOString(),
        games: mergedGames,
    })

    return buildResponse(handle, mergedGames)
}

function buildResponse(
    handle: string,
    games: ReturnType<typeof ScanStateRepository.merge>
): YoutubeGamesResponse {
    const sorted = Object.values(games)
        .sort((a, b) => b.mentionCount - a.mentionCount)
        .map((g) => ({
            id: g.id,
            gameName: g.gameName,
            mentionCount: g.mentionCount,
            posterUrl: g.posterUrl,
            posterSource: g.posterSource,
            latestMention: g.latestMention,
            mentions: g.mentions,
        } satisfies YoutubeDetectedGame))

    return {
        channelHandle: handle,
        generatedAt: new Date().toISOString(),
        games: sorted,
        isDegraded: false,
    }
}

// Fetches playlist pages until stopAtVideoId is found or limit is reached.
// Returns the items BEFORE the checkpoint (i.e. the new ones) and the
// videoId of the very first item (most recent upload) for the new checkpoint.
async function getPlaylistItemsSinceCheckpoint({
                                                   apiKey,
                                                   playlistId,
                                                   stopAtVideoId,
                                                   limit,
                                               }: {
    apiKey: string
    playlistId: string
    stopAtVideoId: string | null
    limit: number
}): Promise<{
    items: NonNullable<YoutubePlaylistItemsResponse['items']>
    firstVideoId: string | null
}> {
    const collected: NonNullable<YoutubePlaylistItemsResponse['items']> = []
    let pageToken: string | undefined = undefined
    let firstVideoId: string | null = null
    let hitCheckpoint = false

    do {
        const url = new URL(`${YOUTUBE_API_BASE_URL}/playlistItems`)
        url.searchParams.set('part', 'snippet,contentDetails')
        url.searchParams.set('playlistId', playlistId)
        url.searchParams.set('maxResults', '50')
        url.searchParams.set('key', apiKey)
        if (pageToken) url.searchParams.set('pageToken', pageToken)

        const response = await fetchYoutube<YoutubePlaylistItemsResponse & { nextPageToken?: string }>(
            url.toString()
        )

        for (const item of response.items ?? []) {
            const videoId = item.contentDetails?.videoId

            // Track the very first video seen = most recent upload
            if (!firstVideoId && videoId) firstVideoId = videoId

            // Stop collecting once we reach the previously analyzed video
            if (stopAtVideoId && videoId === stopAtVideoId) {
                hitCheckpoint = true
                break
            }

            collected.push(item)
        }

        pageToken = hitCheckpoint ? undefined : response.nextPageToken

    } while (pageToken && collected.length < limit)

    return { items: collected.slice(0, limit), firstVideoId }
}

async function getVideoTagsMapPaginated({
                                            apiKey,
                                            videoIds,
                                        }: {
    apiKey: string
    videoIds: string[]
}): Promise<Map<string, string[]>> {
    if (videoIds.length === 0) return new Map()

    const tagsByVideoId = new Map<string, string[]>()

    for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50)
        const url = new URL(`${YOUTUBE_API_BASE_URL}/videos`)
        url.searchParams.set('part', 'snippet')
        url.searchParams.set('id', chunk.join(','))
        url.searchParams.set('key', apiKey)

        const response = await fetchYoutube<YoutubeVideosSnippetListResponse>(url.toString())
        for (const item of response.items ?? []) {
            if (!item.id) continue
            tagsByVideoId.set(item.id, item.snippet?.tags ?? [])
        }
    }

    return tagsByVideoId
}

async function inferGamesFromPlaylist(
    items: NonNullable<YoutubePlaylistItemsResponse['items']>,
    tagsByVideoId: Map<string, string[]>
): Promise<YoutubeDetectedGame[]> {
    const mentionsByGame = new Map<string, {
        displayName: string
        posterUrl: string | null
        posterSource: 'catalog' | 'fallback' | 'none'
        mentions: YoutubeGameMention[]
    }>()

    for (const item of items) {
        const videoId = item.contentDetails?.videoId
        const title = item.snippet?.title?.trim()
        if (!videoId || !title) continue

        const description = item.snippet?.description?.trim() ?? ''
        const tags = tagsByVideoId.get(videoId) ?? []
        const seenKeysForVideo = new Set<string>()

        const candidates = extractGameCandidatesFromMetadata({ title, description, tags })

        for (const candidate of candidates) {
            const normalized = normalizeCandidateGameName(candidate.value)
            if (!normalized.normalizedName || !normalized.displayName) continue

            const catalogEntry = await catalogResolver.resolve({
                normalizedName: normalized.normalizedName,
                alias: normalized.displayName,
            })

            // Always require catalog confirmation — prevents false positives from
            // high-confidence tags that happen to be words (e.g. "Bronze", "Mowing")
            if (!catalogEntry) continue

            const mention: YoutubeGameMention = {
                videoId,
                videoTitle: title,
                videoDate: formatRelativeDate(item.snippet?.publishedAt),
                videoUrl: buildYoutubeWatchUrl(videoId),
                thumbnail: pickBestThumbnail(item.snippet?.thumbnails, videoId),
                matchedAlias: normalized.alias,
            }

            const gameKey = catalogEntry.normalizedName
            if (seenKeysForVideo.has(gameKey)) continue
            seenKeysForVideo.add(gameKey)

            const existing = mentionsByGame.get(gameKey)
            if (existing) {
                existing.mentions.push(mention)
                continue
            }

            const poster = resolveGamePoster({
                catalogPosterUrl: catalogEntry.posterUrl,
                latestMention: mention,
            })

            mentionsByGame.set(gameKey, {
                displayName: catalogEntry.displayName,
                posterUrl: poster.posterUrl,
                posterSource: poster.posterSource,
                mentions: [mention],
            })
        }
    }

    return Array.from(mentionsByGame.entries())
        .map(([normalizedName, value]) => ({
            id: normalizedName.replace(/\s+/g, '-'),
            gameName: value.displayName,
            mentionCount: value.mentions.length,
            posterUrl: value.posterUrl,
            posterSource: value.posterSource,
            latestMention: value.mentions[0] ?? null,
            mentions: value.mentions,
        } satisfies YoutubeDetectedGame))
        .sort((a, b) => b.mentionCount - a.mentionCount)
}