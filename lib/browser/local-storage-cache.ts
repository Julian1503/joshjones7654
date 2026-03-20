type CachedEnvelope<T> = {
    data: T
    cachedAt: number
}

export function createLocalStorageCache<T>(key: string, maxAgeMs: number) {
    function load(): T | null {
        try {
            const raw = localStorage.getItem(key)
            if (!raw) return null

            const parsed = JSON.parse(raw) as Partial<CachedEnvelope<T>>
            if (typeof parsed.cachedAt !== 'number') return null
            if (Date.now() - parsed.cachedAt > maxAgeMs) return null

            return (parsed.data as T) ?? null
        } catch {
            return null
        }
    }

    function save(data: T): void {
        try {
            const payload: CachedEnvelope<T> = { data, cachedAt: Date.now() }
            localStorage.setItem(key, JSON.stringify(payload))
        } catch {
            // localStorage may be unavailable in private browsing or full quota scenarios.
        }
    }

    return {
        load,
        save,
    }
}

