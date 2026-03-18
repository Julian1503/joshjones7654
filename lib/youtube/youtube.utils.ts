import { VideoCategory } from '@/lib/youtube/youtube.types'

export function assertEnv(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

export function buildYoutubeWatchUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`
}

export function pickBestThumbnail(
    thumbnails:
        | {
        maxres?: { url?: string }
        high?: { url?: string }
        medium?: { url?: string }
        standard?: { url?: string }
        default?: { url?: string }
    }
        | undefined,
    videoId: string
): string {
    return (
        thumbnails?.maxres?.url ??
        thumbnails?.standard?.url ??
        thumbnails?.high?.url ??
        thumbnails?.medium?.url ??
        thumbnails?.default?.url ??
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    )
}

export function formatViews(viewCount: string | undefined): string {
    const value = Number(viewCount ?? 0)

    if (value >= 1_000_000) {
        return `${trimTrailingZero((value / 1_000_000).toFixed(1))}M`
    }

    if (value >= 1_000) {
        return `${trimTrailingZero((value / 1_000).toFixed(1))}K`
    }

    return String(value)
}

function trimTrailingZero(value: string): string {
    return value.replace(/\.0$/, '')
}

export function formatYoutubeDuration(isoDuration: string | undefined): string {
    if (!isoDuration) {
        return '0:00'
    }

    const match =
        /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(isoDuration)

    if (!match) {
        return '0:00'
    }

    const hours = Number(match[1] ?? 0)
    const minutes = Number(match[2] ?? 0)
    const seconds = Number(match[3] ?? 0)

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function formatRelativeDate(publishedAt: string | undefined): string {
    if (!publishedAt) {
        return 'Unknown'
    }

    const publishedDate = new Date(publishedAt)
    const now = new Date()

    const diffMs = now.getTime() - publishedDate.getTime()
    const dayMs = 1000 * 60 * 60 * 24

    const days = Math.floor(diffMs / dayMs)

    if (days < 1) return 'Today'
    if (days === 1) return '1 day ago'
    if (days < 7) return `${days} days ago`

    const weeks = Math.floor(days / 7)
    if (weeks === 1) return '1 week ago'
    if (weeks < 5) return `${weeks} weeks ago`

    const months = Math.floor(days / 30)
    if (months === 1) return '1 month ago'
    if (months < 12) return `${months} months ago`

    const years = Math.floor(days / 365)
    return years === 1 ? '1 year ago' : `${years} years ago`
}

export function inferVideoCategory(title: string): VideoCategory {
    const normalizedTitle = title.toLowerCase()

    if (
        normalizedTitle.includes('setup') ||
        normalizedTitle.includes('desk') ||
        normalizedTitle.includes('tour')
    ) {
        return 'Setup'
    }

    if (
        normalizedTitle.includes('react') ||
        normalizedTitle.includes('reacting') ||
        normalizedTitle.includes('reaction')
    ) {
        return 'Reaction'
    }

    if (
        normalizedTitle.includes('schizo') ||
        normalizedTitle.includes('schizophrenia') ||
        normalizedTitle.includes('my life') ||
        normalizedTitle.includes('story') ||
        normalizedTitle.includes('honest')
    ) {
        return 'Personal'
    }

    if (
        normalizedTitle.includes('game') ||
        normalizedTitle.includes('gaming') ||
        normalizedTitle.includes('ps5') ||
        normalizedTitle.includes('xbox') ||
        normalizedTitle.includes('elden ring') ||
        normalizedTitle.includes('dark souls')
    ) {
        return 'Gaming'
    }

    return 'Other'
}