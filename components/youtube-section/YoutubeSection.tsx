'use client'

import { useCallback, useRef, useState } from 'react'
import type { YoutubeVideo } from '@/components/youtube-section/types'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { useYoutubePagination } from '@/components/youtube-section/hooks/useYoutubePagination'
import { useYoutubeSectionAnimations } from '@/components/youtube-section/hooks/useYoutubeSectionAnimations'
import { VideoModal } from '@/components/youtube-section/components/VideoModal'
import { GridSkeleton } from '@/components/youtube-section/components/GridSkeleton'
import { YoutubeSectionHeader } from '@/components/youtube-section/components/YoutubeSectionHeader'
import { YoutubeGrid } from '@/components/youtube-section/components/YoutubeGrid'
import { PaginationControls } from '@/components/youtube-section/components/PaginationControls'
import { YoutubeChannelLink } from '@/components/youtube-section/components/YoutubeChannelLink'

export default function YoutubeSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef  = useRef<HTMLDivElement>(null)
    const countRef   = useRef<HTMLSpanElement>(null)
    const scanRef    = useRef<HTMLDivElement>(null)

    const cardRefs = useRef<HTMLDivElement[]>([])

    const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
        if (element) cardRefs.current[index] = element
    }

    const [activeVideo,     setActiveVideo]     = useState<YoutubeVideo | null>(null)
    const [pagingDirection, setPagingDirection] = useState<'next' | 'prev' | null>(null)

    const {
        videos,
        totalVideoCount,
        isLoading,
        isPaging,
        fetchError,
        page,
        hasPrev,
        hasNext,
        handlePrev,
        handleNext,
    } = useYoutubePagination()

    const { isMobile, isTablet } = useResponsiveSection()

    useYoutubeSectionAnimations({
        isLoading,
        totalVideoCount,
        sectionRef,
        headerRef,
        countRef,
        scanRef,
        cardRefs,
    })

    /* ── Handlers with direction tracking ──────────────────────── */
    const handlePrevWithDir = useCallback(() => {
        setPagingDirection('prev')
        handlePrev()
    }, [handlePrev])

    const handleNextWithDir = useCallback(() => {
        setPagingDirection('next')
        handleNext()
    }, [handleNext])

    const handlePlayVideo = useCallback((video: YoutubeVideo) => {
        setActiveVideo(video)
    }, [])

    /* ── Error state ─────────────────────────────────────────────── */
    if (fetchError) {
        return (
            <section
                style={{
                    position:   'relative',
                    background: '#070809',
                    padding:    'clamp(5rem, 9vw, 9rem) 0',
                }}
            >
                <div
                    style={{
                        width:      isMobile ? 'min(100% - 2rem, 1200px)' : 'min(1200px, calc(100% - 3rem))',
                        margin:     '0 auto',
                        color:      '#ff6b6b',
                        fontFamily: 'monospace',
                        letterSpacing: '0.08em',
                    }}
                >
                    Error loading YouTube videos: {fetchError}
                </div>
            </section>
        )
    }

    /* ── Main render ─────────────────────────────────────────────── */
    return (
        <>
            {activeVideo && (
                <VideoModal
                    video={activeVideo}
                    onClose={() => setActiveVideo(null)}
                />
            )}

            <section
                ref={sectionRef}
                style={{
                    position:   'relative',
                    background: '#070809',
                    padding:    'clamp(5rem, 9vw, 9rem) 0 clamp(5rem, 9vw, 8rem)',
                    overflow:   'hidden',
                }}
            >
                {/* Decorative top gradient */}
                <div
                    style={{
                        position:    'absolute',
                        top:         0,
                        left:        0,
                        right:       0,
                        height:      260,
                        background:  'linear-gradient(to bottom, rgba(77,227,255,0.03) 0%, transparent 100%)',
                        pointerEvents: 'none',
                        zIndex:      0,
                    }}
                />

                {/* Decorative red orb */}
                <div
                    style={{
                        position:    'absolute',
                        top:         '20%',
                        right:       '-10%',
                        width:       'min(36rem, 60vw)',
                        height:      'min(36rem, 60vw)',
                        borderRadius: '50%',
                        background:  'radial-gradient(circle, rgba(200,20,20,0.10) 0%, transparent 68%)',
                        filter:      'blur(50px)',
                        pointerEvents: 'none',
                        zIndex:      0,
                    }}
                />

                {/* Scan line */}
                <div
                    ref={scanRef}
                    style={{
                        position:   'absolute',
                        top:        0,
                        left:       0,
                        right:      0,
                        height:     1,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(220,30,30,0.7) 30%, rgba(220,30,30,0.4) 70%, transparent 100%)',
                    }}
                />

                {/* Noise texture */}
                <div
                    style={{
                        position:   'absolute',
                        inset:      0,
                        backgroundImage:
                            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        opacity:    0.022,
                        pointerEvents: 'none',
                        zIndex:     1,
                    }}
                />

                <div
                    style={{
                        width:    isMobile ? 'calc(100% - 2rem)' : 'min(1200px, calc(100% - 3rem))',
                        margin:   '0 auto',
                        position: 'relative',
                        zIndex:   2,
                    }}
                >
                    <YoutubeSectionHeader
                        headerRef={headerRef}
                        countRef={countRef}
                        totalVideoCount={totalVideoCount}
                        isLoading={isLoading}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />

                    {isLoading ? (
                        <GridSkeleton isMobile={isMobile} isTablet={isTablet} />
                    ) : (
                        <YoutubeGrid
                            videos={videos}
                            isPaging={isPaging}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            setCardRef={setCardRef}
                            onPlay={handlePlayVideo}
                            direction={pagingDirection}
                        />
                    )}

                    {!isLoading && videos.length > 0 && (
                        <PaginationControls
                            page={page}
                            hasPrev={hasPrev}
                            hasNext={hasNext}
                            isLoading={isPaging}
                            totalVideoCount={totalVideoCount}
                            onPrev={handlePrevWithDir}
                            onNext={handleNextWithDir}
                            isMobile={isMobile}
                        />
                    )}

                    <YoutubeChannelLink
                        isLoading={isLoading}
                        isMobile={isMobile}
                    />
                </div>
            </section>
        </>
    )
}