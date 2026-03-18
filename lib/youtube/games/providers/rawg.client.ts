import type { ExternalGameMatch, ExternalGameProviderClient } from '@/lib/youtube/games/catalog/types'
import { normalizeName, slugifyName } from '@/lib/youtube/games/detection/normalizer'

type RawgSearchResponse = {
    results?: Array<{
        id?: number
        slug?: string
        name?: string
        background_image?: string | null
    }>
}

export class RawgGameProviderClient implements ExternalGameProviderClient {
    private readonly apiKey = process.env.RAWG_API_KEY

    async searchGame(query: string): Promise<ExternalGameMatch | null> {
        if (!this.apiKey) {
            return null
        }

        try {
            const url = new URL('https://api.rawg.io/api/games')
            url.searchParams.set('key', this.apiKey)
            url.searchParams.set('search', query)
            url.searchParams.set('page_size', '5')

            const response = await fetch(url.toString(), {
                method: 'GET',
                next: { revalidate: 60 * 60 * 24 },
            })

            if (!response.ok) {
                return null
            }

            const payload = (await response.json()) as RawgSearchResponse
            const top = pickBestMatch(query, payload.results ?? [])
            if (!top) {
                return null
            }

            return {
                normalizedName: normalizeName(top.name),
                displayName: top.name,
                slug: top.slug,
                posterUrl: top.posterUrl,
                providerGameId: top.providerGameId,
                confidence: top.confidence,
                aliases: [query, top.name],
            }
        } catch {
            return null
        }
    }
}

function pickBestMatch(
    query: string,
    results: RawgSearchResponse['results']
): {
    name: string
    slug: string
    posterUrl: string | null
    providerGameId: string | null
    confidence: number
} | null {
    const normalizedQuery = normalizeName(query)
    if (!normalizedQuery) return null

    for (const item of results ?? []) {
        const name = item.name?.trim()
        if (!name) continue

        const normalizedName = normalizeName(name)
        const confidence = scoreSimilarity(normalizedQuery, normalizedName)
        if (confidence < 0.58) continue

        return {
            name,
            slug: item.slug?.trim() || slugifyName(name),
            posterUrl: item.background_image ?? null,
            providerGameId: item.id ? String(item.id) : null,
            confidence,
        }
    }

    return null
}

function scoreSimilarity(query: string, candidate: string): number {
    if (query === candidate) return 1
    if (candidate.includes(query) || query.includes(candidate)) return 0.84

    const queryParts = new Set(query.split(' '))
    const candidateParts = candidate.split(' ')
    const overlapCount = candidateParts.filter((part) => queryParts.has(part)).length

    return overlapCount / Math.max(queryParts.size, candidateParts.length, 1)
}

