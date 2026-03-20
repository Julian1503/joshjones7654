export function formatCompactNumber(value: number | string | null | undefined): string {
    const parsed = Number(value ?? 0)
    if (!Number.isFinite(parsed)) {
        return '0'
    }

    if (parsed >= 1_000_000) {
        return `${trimTrailingZero((parsed / 1_000_000).toFixed(1))}M`
    }

    if (parsed >= 1_000) {
        return `${trimTrailingZero((parsed / 1_000).toFixed(1))}K`
    }

    return String(Math.floor(parsed))
}

function trimTrailingZero(value: string): string {
    return value.replace(/\.0$/, '')
}

