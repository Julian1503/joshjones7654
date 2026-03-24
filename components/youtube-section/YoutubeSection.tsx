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
import {VIDEOS_SECTION_ID, YOUTUBE_SECTION_COLORS} from '@/components/youtube-section/constants'

export default function YoutubeSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef  = useRef<HTMLDivElement>(null)
    const countRef   = useRef<HTMLSpanElement>(null)
    const scanRef    = useRef<HTMLDivElement>(null)

    const cardRefs = useRef<HTMLElement[]>([])

    const setCardRefAction = (index: number) => (element: HTMLElement | null) => {
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
        degradedNotice,
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
    const handlePrevWithDirAction = useCallback(() => {
        setPagingDirection('prev')
        handlePrev()
    }, [handlePrev])

    const handleNextWithDirAction = useCallback(() => {
        setPagingDirection('next')
        handleNext()
    }, [handleNext])

    const handlePlayVideoAction = useCallback((video: YoutubeVideo) => {
        setActiveVideo(video)
    }, [])

    /* ── Main render ─────────────────────────────────────────────── */
    return (
        <>
            {activeVideo && (
                <VideoModal
                    video={activeVideo}
                    onCloseAction={() => setActiveVideo(null)}
                />
            )}

            <section
                id={VIDEOS_SECTION_ID}
                ref={sectionRef}
                style={{
                    position: 'relative',
                    background: YOUTUBE_SECTION_COLORS.background,
                    padding: 'clamp(5rem, 9vw, 9rem) 0 clamp(5rem, 9vw, 8rem)',
                    overflow: 'hidden',
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
                        background:  'linear-gradient(to bottom, rgba(255,69,69,0.07) 0%, transparent 100%)',
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
                        background:  'radial-gradient(circle, rgba(200,20,20,0.14) 0%, transparent 68%)',
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
                        background: 'linear-gradient(90deg, transparent 0%, rgba(220,30,30,0.72) 30%, rgba(220,30,30,0.42) 70%, transparent 100%)',
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
                        width: isMobile ? 'calc(100% - 2rem)' : 'min(1200px, calc(100% - 3rem))',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    {degradedNotice && (
                        <div
                            style={{
                                marginBottom: 'clamp(1rem, 2.2vw, 1.4rem)',
                                border: '1px solid rgba(255,69,69,0.32)',
                                background: 'rgba(255,69,69,0.08)',
                                color: YOUTUBE_SECTION_COLORS.textSecondary,
                                borderRadius: 12,
                                padding: isMobile ? '0.6rem 0.75rem' : '0.72rem 0.9rem',
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.56rem' : '0.62rem',
                                letterSpacing: isMobile ? '0.12em' : '0.15em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {degradedNotice}
                        </div>
                    )}

                    {fetchError && (
                        <div
                            style={{
                                marginBottom: 'clamp(1rem, 2.2vw, 1.4rem)',
                                border: '1px solid rgba(255,107,107,0.34)',
                                background: 'rgba(255,107,107,0.08)',
                                color: YOUTUBE_SECTION_COLORS.redSoft,
                                borderRadius: 12,
                                padding: isMobile ? '0.6rem 0.75rem' : '0.72rem 0.9rem',
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.56rem' : '0.62rem',
                                letterSpacing: isMobile ? '0.12em' : '0.15em',
                            }}
                        >
                            {`Could not refresh videos right now. ${fetchError}`}
                        </div>
                    )}

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
                    ) : videos.length > 0 ? (
                        <YoutubeGrid
                            videos={videos}
                            isPaging={isPaging}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            setCardRefAction={setCardRefAction}
                            onPlayAction={handlePlayVideoAction}
                            direction={pagingDirection}
                        />
                    ) : (
                        <div
                            style={{
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(12,14,16,0.6)',
                                borderRadius: 16,
                                padding: isMobile ? '1rem' : '1.25rem',
                                color: YOUTUBE_SECTION_COLORS.textSecondary,
                                fontFamily: 'monospace',
                                fontSize: isMobile ? '0.66rem' : '0.72rem',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                            }}
                        >
                            Videos are temporarily unavailable. Please check back in a bit.
                        </div>
                    )}

                    {!isLoading && videos.length > 0 && (
                        <PaginationControls
                            page={page}
                            hasPrev={hasPrev}
                            hasNext={hasNext}
                            isLoading={isPaging}
                            totalVideoCount={totalVideoCount}
                            onPrevAction={handlePrevWithDirAction}
                            onNextAction={handleNextWithDirAction}
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