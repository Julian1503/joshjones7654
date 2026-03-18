import {
    GAME_CANDIDATE_BLACKLIST,
    GAME_CANDIDATE_PHRASE_BLACKLIST,
} from '@/lib/youtube/youtube-games.constants'
import { normalizeName } from '@/lib/youtube/games/detection/normalizer'

export type YoutubeVideoMetadata = {
    title: string
    description: string
    tags: string[]
}

export type ExtractedGameCandidate = {
    value: string
    confidence: number
}

export function extractGameCandidatesFromMetadata(
    metadata: YoutubeVideoMetadata
): ExtractedGameCandidate[] {
    const ranked = new Map<string, number>()

    addCandidatesFromTags(metadata.tags, ranked)
    addCandidatesFromTitle(metadata.title, ranked)
    addCandidatesFromDescription(metadata.description, ranked)

    return Array.from(ranked.entries())
        .map(([value, confidence]) => ({ value, confidence }))
        .sort((left, right) => right.confidence - left.confidence)
}

function addCandidatesFromTags(tags: string[], ranked: Map<string, number>) {
    for (const tag of tags) {
        const cleaned = cleanSegment(tag)
        if (!cleaned) continue
        addRanked(ranked, cleaned, 0.95)
    }
}

function addCandidatesFromTitle(title: string, ranked: Map<string, number>) {
    const parts = splitIntoSegments(title)
    for (const part of parts) {
        const cleaned = cleanSegment(part)
        if (!cleaned) continue
        addRanked(ranked, cleaned, 0.72)
    }
}

function addCandidatesFromDescription(description: string, ranked: Map<string, number>) {
    const topLines = description
        .split(/\r?\n/g)
        .slice(0, 5)
        .join(' ')

    const parts = splitIntoSegments(topLines)
    for (const part of parts) {
        const cleaned = cleanSegment(part)
        if (!cleaned) continue
        addRanked(ranked, cleaned, 0.52)
    }
}

function splitIntoSegments(value: string): string[] {
    return value
        .split(/[|:\-()[\]{},]/g)
        .map((segment) => segment.trim())
        .filter(Boolean)
}

function cleanSegment(value: string): string | null {
    const withoutUrl = value.replace(/https?:\/\/\S+/gi, ' ')
    const withoutCta = withoutUrl.replace(/\b(like\d*|comment|share|subscribe)\b/gi, ' ')
    const compact = withoutCta.replace(/\s+/g, ' ').trim()
    if (!compact) return null

    const normalized = normalizeName(compact)
    if (!normalized) return null
    if (normalized.length < 3 || normalized.length > 48) return null

    if (isBlacklistedPhrase(normalized)) return null
    if (isDateOrTimestampLike(normalized)) return null
    if (!hasLikelyGameShape(normalized)) return null

    const words = normalized.split(' ')
    if (words.length > 6) return null

    const nonBlacklisted = words.filter((word) => !GAME_CANDIDATE_BLACKLIST.has(word))
    if (nonBlacklisted.length === 0) return null

    return compact
}

function isBlacklistedPhrase(value: string): boolean {
    if (GAME_CANDIDATE_PHRASE_BLACKLIST.has(value)) return true

    for (const phrase of GAME_CANDIDATE_PHRASE_BLACKLIST) {
        if (value.includes(phrase)) return true
    }

    return false
}

function hasLikelyGameShape(value: string): boolean {
    const words = value.split(' ')
    const textWords = words.filter((word) => /[a-z]/.test(word))
    const numericWords = words.filter((word) => /^\d+$/.test(word))

    if (textWords.length === 0) return false

    const totalChars = value.replace(/\s+/g, '').length
    const numericChars = value.replace(/[^0-9]/g, '').length
    if (totalChars > 0 && numericChars / totalChars > 0.45) return false

    return !(numericWords.length > 1 && textWords.length < 2)
}

function isDateOrTimestampLike(value: string): boolean {
    return /^\d{6,}$/.test(value.replace(/\s+/g, ''))
}

function addRanked(ranked: Map<string, number>, value: string, confidence: number) {
    const normalized = normalizeName(value)
    const current = ranked.get(normalized)
    if (!current || confidence > current) {
        ranked.set(normalized, confidence)
    }
}
