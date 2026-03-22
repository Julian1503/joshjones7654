import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { GameCatalogRepository, StoredGameCatalogEntry } from '@/lib/youtube/games/catalog/types'
import {
    isReadOnlyFileSystemError,
    resolveWritableDataPath,
} from '@/lib/node/fs-write-safety'

const CACHE_FILE_PATH = resolveWritableDataPath('game-catalog-cache.json')

type CatalogCacheFile = {
    entries: StoredGameCatalogEntry[]
}

export class LocalGameCatalogRepository implements GameCatalogRepository {
    private memoryCache = new Map<string, StoredGameCatalogEntry>()
    private aliasIndex = new Map<string, string>()
    private isBootstrapped = false

    async findByNormalizedName(normalizedName: string) {
        await this.bootstrap()
        return this.memoryCache.get(normalizedName) ?? null
    }

    async findByAlias(alias: string) {
        await this.bootstrap()

        const key = normalizeName(alias)
        const normalizedName = this.aliasIndex.get(key)
        if (!normalizedName) return null

        return this.memoryCache.get(normalizedName) ?? null
    }

    async upsert(entry: StoredGameCatalogEntry) {
        await this.bootstrap()

        this.memoryCache.set(entry.normalizedName, entry)
        indexAliases(entry, this.aliasIndex)

        await this.persist()
    }

    private async bootstrap() {
        if (this.isBootstrapped) return
        this.isBootstrapped = true

        const file = await readCatalogFile()
        for (const entry of file.entries) {
            this.memoryCache.set(entry.normalizedName, entry)
            indexAliases(entry, this.aliasIndex)
        }
    }

    private async persist() {
        const entries = Array.from(this.memoryCache.values())
        const content: CatalogCacheFile = { entries }

        try {
            await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true })
            await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(content, null, 2), 'utf8')
        } catch (error) {
            // Netlify/serverless runtimes can be read-only. Keep serving from memory.
            if (isReadOnlyFileSystemError(error)) return
            throw error
        }
    }
}

async function readCatalogFile(): Promise<CatalogCacheFile> {
    try {
        const raw = await fs.readFile(CACHE_FILE_PATH, 'utf8')
        const parsed = JSON.parse(raw) as CatalogCacheFile
        if (!Array.isArray(parsed.entries)) {
            return { entries: [] }
        }

        return {
            entries: parsed.entries.filter(isStoredGameCatalogEntry),
        }
    } catch {
        return { entries: [] }
    }
}

function indexAliases(
    entry: StoredGameCatalogEntry,
    aliasIndex: Map<string, string>
) {
    aliasIndex.set(entry.normalizedName, entry.normalizedName)
    for (const alias of entry.aliases) {
        aliasIndex.set(normalizeName(alias), entry.normalizedName)
    }
}

function isStoredGameCatalogEntry(value: unknown): value is StoredGameCatalogEntry {
    if (!value || typeof value !== 'object') return false

    const candidate = value as Partial<StoredGameCatalogEntry>
    return (
        typeof candidate.normalizedName === 'string' &&
        typeof candidate.displayName === 'string' &&
        typeof candidate.slug === 'string' &&
        (typeof candidate.posterUrl === 'string' || candidate.posterUrl === null) &&
        (candidate.provider === 'rawg' || candidate.provider === 'manual' || candidate.provider === 'inferred') &&
        (typeof candidate.providerGameId === 'string' || candidate.providerGameId === null) &&
        Array.isArray(candidate.aliases) &&
        typeof candidate.confidence === 'number' &&
        typeof candidate.createdAt === 'string' &&
        typeof candidate.updatedAt === 'string'
    )
}

function normalizeName(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

