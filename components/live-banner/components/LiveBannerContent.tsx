'use client'

import { LiveBannerThumbnail } from '@/components/live-banner/components/LiveBannerThumbnail'

type LiveBannerContentProps = {
    title: string | null
    elapsed: string
    thumbnail: string | null
    thumbnailRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function LiveBannerContent({
                                      title,
                                      elapsed,
                                      thumbnail,
                                      thumbnailRef,
                                      isMobile,
                                  }: LiveBannerContentProps) {
    return (
        <div
            style={{
                display: 'flex',
                gap: isMobile ? 10 : 12,
                alignItems: 'flex-start',
                marginBottom: 14,
            }}
        >
            <LiveBannerThumbnail
                thumbnail={thumbnail}
                thumbnailRef={thumbnailRef}
                isMobile={isMobile}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
                <p
                    style={{
                        margin: '0 0 5px',
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: isMobile ? '0.78rem' : '0.82rem',
                        lineHeight: 1.35,
                        letterSpacing: '-0.01em',
                        display: '-webkit-box',
                        WebkitLineClamp: isMobile ? 3 : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {title ?? 'Joshua is live right now'}
                </p>

                {elapsed && (
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: isMobile ? '0.54rem' : '0.6rem',
                            letterSpacing: '0.12em',
                            color: 'rgba(255,255,255,0.3)',
                            textTransform: 'lowercase',
                        }}
                    >
            {elapsed}
          </span>
                )}
            </div>
        </div>
    )
}