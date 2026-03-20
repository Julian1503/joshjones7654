export async function fetchJson<T>(url: string, fallbackMessage: string): Promise<T> {
    const response = await fetch(url, { method: 'GET', cache: 'no-store' })
    const payload = (await response.json()) as T

    if (!response.ok) {
        const message =
            typeof payload === 'object' &&
            payload !== null &&
            'message' in payload &&
            typeof (payload as { message?: unknown }).message === 'string'
                ? (payload as { message: string }).message
                : fallbackMessage

        throw new Error(message)
    }

    return payload as T
}


