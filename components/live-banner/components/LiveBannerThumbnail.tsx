'use client'

import type { RefObject } from 'react'

type LiveBannerThumbnailProps = {
    thumbnail: string | null
    thumbnailRef: RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function LiveBannerThumbnail({
                                        thumbnail,
                                        thumbnailRef,
                                        isMobile,
                                    }: LiveBannerThumbnailProps) {
    return (
        <div
            style={{
                flexShrink: 0,
                width: isMobile ? 88 : 100,
                aspectRatio: '16/9',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                background: '#111',
                position: 'relative',
            }}
        >
            {thumbnail && (
                <div
                    ref={thumbnailRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}

            <div
                style={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    background: '#ff2020',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.48rem' : '0.52rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '2px 5px',
                    borderRadius: 4,
                }}
            >
                Live
            </div>
        </div>
    )
}