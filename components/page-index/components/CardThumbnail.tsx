'use client'

import { PAGE_INDEX_COLORS } from '@/components/page-index/constants'

type CardThumbnailProps = {
    image: string | null
    imageRef: React.RefObject<HTMLDivElement | null>
    thumbWrapRef: React.RefObject<HTMLDivElement | null>
    overlayRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function CardThumbnail({
                                  image,
                                  imageRef,
                                  thumbWrapRef,
                                  overlayRef,
                                  isMobile,
                              }: CardThumbnailProps) {
    if (!image) {
        return (
            <div
                style={{
                    aspectRatio: '3/2',
                    borderRadius: 6,
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${PAGE_INDEX_COLORS.borderSoft}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
                    <path
                        d="M11 1 L13.5 8.5 L21 11 L13.5 13.5 L11 21 L8.5 13.5 L1 11 L8.5 8.5 Z"
                        fill="white"
                        fillOpacity="0.1"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                    />
                </svg>
            </div>
        )
    }

    return (
        <div
            ref={thumbWrapRef}
            style={{
                position: 'relative',
                aspectRatio: '3/2',
                borderRadius: 6,
                overflow: 'hidden',
                background: '#111',
                flexShrink: 0,
                minHeight: isMobile ? 140 : undefined,
            }}
        >
            <div
                ref={imageRef}
                style={{
                    position: 'absolute',
                    inset: '-10% 0',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                ref={overlayRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,1)',
                    opacity: 0,
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}