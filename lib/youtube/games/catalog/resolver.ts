import {
    CATALOG_CONFIDENCE_THRESHOLD,
    MANUAL_GAME_OVERRIDES,
} from '@/lib/youtube/youtube-games.constants'
import {
    type ExternalGameProviderClient,
    type GameCatalogLookup,
    type GameCatalogRepository,
    type GameCatalogResolver,
    type StoredGameCatalogEntry,
} from '@/lib/youtube/games/catalog/types'
import { slugifyName } from '@/lib/youtube/games/detection/normalizer'

export class DefaultGameCatalogResolver implements GameCatalogResolver {
    constructor(
        private readonly repository: GameCatalogRepository,
        private readonly provider: ExternalGameProviderClient
    ) {}

    async resolve(lookup: GameCatalogLookup): Promise<StoredGameCatalogEntry | null> {
        const fromNormalized = await this.repository.findByNormalizedName(lookup.normalizedName)
        if (fromNormalized) return fromNormalized

        const fromAlias = await this.repository.findByAlias(lookup.alias)
        if (fromAlias) return fromAlias

        const manualPoster = MANUAL_GAME_OVERRIDES[lookup.normalizedName]?.posterUrl
        const externalMatch = await this.provider.searchGame(lookup.alias)

        if (!externalMatch && !manualPoster) {
            return null
        }

        const nowIso = new Date().toISOString()
        const entry: StoredGameCatalogEntry = {
            normalizedName: lookup.normalizedName,
            displayName: externalMatch?.displayName ?? lookup.alias,
            slug: externalMatch?.slug ?? slugifyName(lookup.alias),
            posterUrl: manualPoster ?? externalMatch?.posterUrl ?? null,
            provider: manualPoster && !externalMatch ? 'manual' : externalMatch ? 'rawg' : 'inferred',
            providerGameId: externalMatch?.providerGameId ?? null,
            aliases: uniqueAliases([lookup.alias, ...(externalMatch?.aliases ?? [])]),
            confidence: externalMatch?.confidence ?? 0.4,
            createdAt: nowIso,
            updatedAt: nowIso,
        }

        if (entry.confidence < CATALOG_CONFIDENCE_THRESHOLD && !entry.posterUrl) {
            return null
        }

        await this.repository.upsert(entry)
        return entry
    }
}

function uniqueAliases(values: string[]): string[] {
    const seen = new Set<string>()
    const unique: string[] = []

    for (const value of values) {
        const normalized = value.trim().toLowerCase()
        if (!normalized || seen.has(normalized)) continue
        seen.add(normalized)
        unique.push(value)
    }

    return unique
}

