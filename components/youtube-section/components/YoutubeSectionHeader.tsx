'use client'

import { YOUTUBE_SECTION_COLORS } from '@/components/youtube-section/constants'

type YoutubeSectionHeaderProps = {
    headerRef: React.RefObject<HTMLDivElement | null>
    countRef: React.RefObject<HTMLSpanElement | null>
    totalVideoCount: number
    isLoading: boolean
    isMobile: boolean
    isTablet: boolean
}

export function YoutubeSectionHeader({
                                         headerRef,
                                         countRef,
                                         totalVideoCount,
                                         isLoading,
                                         isMobile,
                                         isTablet,
                                     }: YoutubeSectionHeaderProps) {
    return (
        <div
            ref={headerRef}
            style={{
                display: 'flex',
                alignItems: isMobile ? 'flex-start' : 'flex-end',
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            }}
        >
            <div>
                <p
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        margin: '0 0 1rem',
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.58rem' : 'clamp(0.55rem, 0.9vw, 0.72rem)',
                        letterSpacing: isMobile ? '0.22em' : '0.4em',
                        textTransform: 'uppercase',
                        color: YOUTUBE_SECTION_COLORS.red,
                        flexWrap: 'wrap',
                    }}
                >
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                        <rect width="16" height="11" rx="2.5" fill="var(--yt-red)" />
                        <path d="M6.5 7.8V3.2L10.8 5.5L6.5 7.8Z" fill="white" />
                    </svg>
                    YouTube channel
                </p>

                <h2
                    style={{
                        margin: 0,
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: isMobile
                            ? 'clamp(2.6rem, 14vw, 4.2rem)'
                            : isTablet
                                ? 'clamp(3rem, 8vw, 5.5rem)'
                                : 'clamp(3.4rem, 8vw, 7.5rem)',
                        lineHeight: 0.9,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: YOUTUBE_SECTION_COLORS.textPrimary,
                    }}
                >
                    Latest
                    <br />
                    <span style={{ color: YOUTUBE_SECTION_COLORS.red }}>videos</span>
                </h2>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMobile ? 'flex-start' : 'flex-end',
                    gap: 4,
                    paddingBottom: isMobile ? 0 : '0.4rem',
                }}
            >
        <span
            style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: isMobile
                    ? 'clamp(1.8rem, 10vw, 2.8rem)'
                    : 'clamp(2.4rem, 5vw, 4rem)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.12)',
                WebkitTextStroke: '1px rgba(255,69,69,0.34)',
            }}
        >
          <span ref={countRef}>{isLoading ? '…' : totalVideoCount}</span>
        </span>

                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: isMobile ? '0.58rem' : '0.62rem',
                        letterSpacing: isMobile ? '0.18em' : '0.3em',
                        textTransform: 'uppercase',
                        color: YOUTUBE_SECTION_COLORS.textMuted,
                    }}
                >
          published videos
        </span>
            </div>
        </div>
    )
}