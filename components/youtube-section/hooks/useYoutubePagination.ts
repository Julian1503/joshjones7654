'use client'

import { useCallback, useEffect, useState } from 'react'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { fetchYoutubePage } from '@/components/youtube-section/utils/fetchYoutubePage'

export function useYoutubePagination() {
    const [videos, setVideos] = useState<YoutubeVideo[]>([])
    const [totalVideoCount, setTotalVideoCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isPaging, setIsPaging] = useState(false)
    const [fetchError, setFetchError] = useState<string | null>(null)

    const [tokenStack, setTokenStack] = useState<(string | undefined)[]>([undefined])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextToken, setNextToken] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        setIsLoading(true)

        fetchYoutubePage(undefined)
            .then((data) => {
                if (!mounted) return

                setVideos(data.videos)
                setTotalVideoCount(data.totalVideoCount)
                setNextToken(data.nextPageToken)
            })
            .catch((error) => {
                if (!mounted) return
                setFetchError(error instanceof Error ? error.message : 'Unexpected error')
            })
            .finally(() => {
                if (mounted) setIsLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [])

    const navigateTo = useCallback(async (token: string | undefined, newIndex: number) => {
        setIsPaging(true)

        try {
            const data = await fetchYoutubePage(token)
            setVideos(data.videos)
            setNextToken(data.nextPageToken)
            setCurrentIndex(newIndex)
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
        page: currentIndex,
        hasPrev: currentIndex > 0,
        hasNext: Boolean(nextToken),
        handlePrev,
        handleNext,
    }
}