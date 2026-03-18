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

    return {
        alias,
        normalizedName,
        displayName,
    }
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

    const withoutTrailingId = normalized.replace(/\s+\d{6,}$/g, '')
    const withoutGameplay = withoutTrailingId
        .replace(/\b(gameplay|walkthrough|playthrough|reaction)\b/g, '')
        .replace(/\b(like|comment|share|subscribe)\b/g, '')

    return withoutGameplay.replace(/\s+/g, ' ').trim()
}

function toDisplayName(value: string): string {
    if (!value) return ''

    return value
        .split(' ')
        .map((word) => {
            if (/^\d+$/.test(word)) return word
            return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
}
