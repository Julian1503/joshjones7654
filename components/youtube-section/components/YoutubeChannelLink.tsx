'use client'

import { YOUTUBE_HANDLE } from '@/components/youtube-section/types'
import { YOUTUBE_SECTION_COLORS } from '@/components/youtube-section/constants'

type YoutubeChannelLinkProps = {
    isLoading: boolean
    isMobile: boolean
}

export function YoutubeChannelLink({
                                       isLoading,
                                       isMobile,
                                   }: YoutubeChannelLinkProps) {
    if (isLoading) return null

    return (
        <div
            style={{
                marginTop: 'clamp(1.8rem, 3vw, 2.8rem)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                textAlign: 'center',
            }}
        >
            <p
                style={{
                    margin: 0,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.58rem' : '0.62rem',
                    letterSpacing: isMobile ? '0.18em' : '0.25em',
                    color: 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                }}
            >
                or visit the channel directly
            </p>

            <a
                href={`https://www.youtube.com/${YOUTUBE_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: YOUTUBE_SECTION_COLORS.textSecondary,
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.66rem' : '0.68rem',
                    letterSpacing: isMobile ? '0.08em' : '0.15em',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
                onMouseEnter={(event) => {
                    event.currentTarget.style.color = YOUTUBE_SECTION_COLORS.red
                }}
                onMouseLeave={(event) => {
                    event.currentTarget.style.color = YOUTUBE_SECTION_COLORS.textSecondary
                }}
            >
                youtube.com/{YOUTUBE_HANDLE}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                        d="M2 8L8 2M4 2H8V6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </a>
        </div>
    )
}