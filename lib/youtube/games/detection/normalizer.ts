import { GAME_NAME_ALIASES } from '@/lib/youtube/youtube-games.constants'

export type NormalizedGameName = {
    alias: string
    normalizedName: string
    displayName: string
}

export function normalizeCandidateGameName(candidate: string): NormalizedGameName {
    const alias = sanitizeCandidate(candidate)
    const mapped = GAME_NAME_ALIASES[alias] ?? toDisplayName(alias)

    const displayName = mapped.replace(/\s+/g, ' ').trim()
    const normalizedName = normalizeName(displayName)

    return { alias, normalizedName, displayName }
}

export function normalizeName(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

export function slugifyName(value: string): string {
    return normalizeName(value).replace(/\s+/g, '-')
}

function sanitizeCandidate(value: string): string {
    const normalized = normalizeName(value)
    if (!normalized) return ''

    // Reject pure-number strings ("25", "2024", etc.)
    if (/^\d+$/.test(normalized.replace(/\s+/g, ''))) return ''

    const withoutTrailingId = normalized.replace(/\s+\d{6,}$/g, '')

    // BUG FIX: All patterns must be lowercase — normalizeName() has already
    // lowercased the string, so 'Game Play' and 'Ps5share' would never match.
    const withoutNoise = withoutTrailingId
        .replace(/\b(gameplay|walkthrough|playthrough|reaction)\b/g, '')
        .replace(/\b(like|comment|share|subscribe|game play)\b/g, '')
        .replace(/\b(ps5live|ps5share|ps5|playstation 5|sony interactive entertainment)\b/g, '')
        .replace(/\b(episode|part|vol|volume|ft|feat)\b/g, '')
        .replace(/\b(official|trailer|reveal|teaser)\b/g, '')

    return withoutNoise.replace(/\s+/g, ' ').trim()
}

function toDisplayName(value: string): string {
    if (!value) return ''
    return value
        .split(' ')
        .map((word) => (/^\d+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ')
}