export function formatViewerCount(raw: string | null): string | null {
    if (!raw) return null

    const value = Number(raw)
    if (!Number.isFinite(value)) return null

    if (value >= 1000) {
        return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`
    }

    return String(value)
}

export function formatElapsedLiveTime(startedAt: string | null): string {
    if (!startedAt) return ''

    const diffMs = Date.now() - new Date(startedAt).getTime()
    const totalMinutes = Math.floor(diffMs / 60_000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours > 0) {
        return `${hours}h ${minutes}m live`
    }

    if (totalMinutes > 0) {
        return `${totalMinutes}m live`
    }

    return 'Just started'
}