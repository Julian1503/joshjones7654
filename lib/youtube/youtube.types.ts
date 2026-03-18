export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
export const DEFAULT_YOUTUBE_HANDLE = '@JoshJones-t4q'
export const DEFAULT_MAX_RESULTS = 6
export const YOUTUBE_REVALIDATE_SECONDS = 60 * 30
/** How often the client polls the live-status endpoint (ms) */
export const LIVE_POLL_INTERVAL_MS = 5 * 60_000

export type VideoCategory = 'Gaming' | 'Personal' | 'Reaction' | 'Setup' | 'Other'

export interface YoutubeVideo {
    id: string
    title: string
    views: string
    duration: string
    date: string
    category: VideoCategory
    thumbnail: string
    url: string
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface YoutubeVideosPage {
    videos: YoutubeVideo[]
    nextPageToken: string | undefined
    totalVideoCount: number
}

// ─── Live stream ──────────────────────────────────────────────────────────────

export interface YoutubeLiveStream {
    isLive: boolean
    videoId: string | null
    title: string | null
    thumbnail: string | null
    startedAt: string | null
    watchUrl: string | null
    concurrentViewers: string | null
}

// ─── YouTube API response shapes ─────────────────────────────────────────────

export interface YoutubeChannelListResponse {
    items?: Array<{
        id?: string
        contentDetails?: {
            relatedPlaylists?: {
                uploads?: string
            }
        }
        statistics?: {
            videoCount?: string
        }
    }>
}

export interface YoutubePlaylistItemsResponse {
    nextPageToken?: string
    items?: Array<{
        snippet?: {
            title?: string
            publishedAt?: string
            thumbnails?: {
                maxres?: { url?: string }
                high?: { url?: string }
                medium?: { url?: string }
                standard?: { url?: string }
                default?: { url?: string }
            }
        }
        contentDetails?: {
            videoId?: string
        }
    }>
}

export interface YoutubeVideosListResponse {
    items?: Array<{
        id?: string
        contentDetails?: {
            duration?: string
        }
        statistics?: {
            viewCount?: string
            concurrentViewers?: string
        }
        liveStreamingDetails?: {
            actualStartTime?: string
            concurrentViewers?: string
        }
    }>
}

export interface YoutubeSearchResponse {
    items?: Array<{
        id?: { videoId?: string }
        snippet?: {
            title?: string
            publishedAt?: string
            thumbnails?: {
                maxres?: { url?: string }
                high?: { url?: string }
                medium?: { url?: string }
                default?: { url?: string }
            }
            liveBroadcastContent?: 'live' | 'upcoming' | 'none'
        }
    }>
}

export interface YoutubeApiErrorResponse {
    error?: {
        code?: number
        message?: string
    }
}
