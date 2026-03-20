'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { fetchYoutubePage } from '@/components/youtube-section/utils/fetchYoutubePage'
import { createLocalStorageCache } from '@/lib/browser/local-storage-cache'

// ─── localStorage cache ───────────────────────────────────────────────────────
// Only the first page is cached — subsequent pages are navigation and
// restoring them would be confusing. This covers the most common path:
// the initial page load where a network/API failure leaves the section empty.

const CACHE_KEY = 'josh_youtube_videos_cache'
const CACHE_MAX_AGE_MS = 60 * 60 * 1000 // 1 hour
const YOUTUBE_REFRESH_INTERVAL_MS = 10 * 60 * 1000

type CachedVideos = {
    videos: YoutubeVideo[]
    totalVideoCount: number
    nextPageToken: string | null
}

const videosCache = createLocalStorageCache<CachedVideos>(CACHE_KEY, CACHE_MAX_AGE_MS)

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useYoutubePagination() {
    const [videos, setVideos] = useState<YoutubeVideo[]>([])
    const [totalVideoCount, setTotalVideoCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isPaging, setIsPaging] = useState(false)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [degradedNotice, setDegradedNotice] = useState<string | null>(null)

    const [tokenStack, setTokenStack] = useState<(string | undefined)[]>([undefined])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextToken, setNextToken] = useState<string | null>(null)
    const currentIndexRef = useRef(0)
    const isPagingRef = useRef(false)

    useEffect(() => {
        currentIndexRef.current = currentIndex
    }, [currentIndex])

    useEffect(() => {
        isPagingRef.current = isPaging
    }, [isPaging])

    useEffect(() => {
        let mounted = true

        const loadFirstPage = async (isBackgroundRefresh: boolean) => {
            if (!isBackgroundRefresh) {
                setIsLoading(true)
            }

            try {
                const data = await fetchYoutubePage(undefined)
                if (!mounted) return

                setVideos(data.videos)
                setTotalVideoCount(data.totalVideoCount)
                setNextToken(data.nextPageToken)
                setFetchError(null)
                setDegradedNotice(
                    data.isDegraded
                        ? (data.message ?? 'Showing cached videos while YouTube is temporarily limited.')
                        : null
                )

                if (!data.isDegraded && data.videos.length > 0) {
                    saveToCache({
                        videos: data.videos,
                        totalVideoCount: data.totalVideoCount,
                        nextPageToken: data.nextPageToken,
                    })
                }
            } catch (error) {
                if (!mounted) return

                const cached = loadFromCache()
                if (cached && cached.videos.length > 0) {
                    setVideos(cached.videos)
                    setTotalVideoCount(cached.totalVideoCount)
                    setNextToken(cached.nextPageToken)
                    setFetchError(null)
                    setDegradedNotice('Showing saved videos. Live data is temporarily unavailable.')
                } else {
                    setFetchError(error instanceof Error ? error.message : 'Unexpected error')
                }
            } finally {
                if (mounted && !isBackgroundRefresh) {
                    setIsLoading(false)
                }
            }
        }

        void loadFirstPage(false)

        const intervalId = window.setInterval(() => {
            if (document.visibilityState !== 'visible') return
            if (currentIndexRef.current !== 0 || isPagingRef.current) return
            void loadFirstPage(true)
        }, YOUTUBE_REFRESH_INTERVAL_MS)

        return () => {
            mounted = false
            window.clearInterval(intervalId)
        }
    }, [])

    const navigateTo = useCallback(async (token: string | undefined, newIndex: number) => {
        setIsPaging(true)

        try {
            const data = await fetchYoutubePage(token)
            setVideos(data.videos)
            setNextToken(data.nextPageToken)
            setCurrentIndex(newIndex)
            setFetchError(null)
            setDegradedNotice(
                data.isDegraded
                    ? (data.message ?? 'Showing cached videos while YouTube is temporarily limited.')
                    : null
            )
        } catch (error) {
            setFetchError(error instanceof Error ? error.message : 'Error loading page')
        } finally {
            setIsPaging(false)
        }
    }, [])

    const handleNext = useCallback(async () => {
        if (!nextToken || isPaging) return

        const newIndex = currentIndex + 1

        setTokenStack((previous) => {
            const updated = [...previous]
            if (!updated[newIndex]) {
                updated[newIndex] = nextToken
            }
            return updated
        })

        await navigateTo(nextToken, newIndex)
    }, [nextToken, isPaging, currentIndex, navigateTo])

    const handlePrev = useCallback(async () => {
        if (currentIndex <= 0 || isPaging) return

        const newIndex = currentIndex - 1
        await navigateTo(tokenStack[newIndex], newIndex)
    }, [currentIndex, isPaging, navigateTo, tokenStack])

    return {
        videos,
        totalVideoCount,
        isLoading,
        isPaging,
        fetchError,
        degradedNotice,
        page: currentIndex,
        hasPrev: currentIndex > 0,
        hasNext: Boolean(nextToken),
        handlePrev,
        handleNext,
    }
}

function loadFromCache(): CachedVideos | null {
    return videosCache.load()
}

function saveToCache(data: CachedVideos) {
    videosCache.save(data)
}
