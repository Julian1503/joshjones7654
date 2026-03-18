export type StoredGameCatalogEntry = {
    normalizedName: string
    displayName: string
    slug: string
    posterUrl: string | null
    provider: 'rawg' | 'manual' | 'inferred'
    providerGameId: string | null
    aliases: string[]
    confidence: number
    createdAt: string
    updatedAt: string
}

export type GameCatalogLookup = {
    normalizedName: string
    alias: string
}

export interface GameCatalogRepository {
    findByNormalizedName(normalizedName: string): Promise<StoredGameCatalogEntry | null>
    findByAlias(alias: string): Promise<StoredGameCatalogEntry | null>
    upsert(entry: StoredGameCatalogEntry): Promise<void>
}

export type ExternalGameMatch = {
    normalizedName: string
    displayName: string
    slug: string
    posterUrl: string | null
    providerGameId: string | null
    confidence: number
    aliases: string[]
}

export interface ExternalGameProviderClient {
    searchGame(query: string): Promise<ExternalGameMatch | null>
}

export interface GameCatalogResolver {
    resolve(lookup: GameCatalogLookup): Promise<StoredGameCatalogEntry | null>
}

