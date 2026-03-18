'use client'

import { useRef } from 'react'
import { BANNER_COLORS, BANNER_SIZES } from '@/components/live-banner/constants'
import { useLiveStreamData } from '@/components/live-banner/hooks/useLiveStreamData'
import { useLiveBannerAnimations } from '@/components/live-banner/hooks/useLiveBannerAnimations'
import { formatViewerCount } from '@/components/live-banner/utils/formatters'
import { LiveBannerHeader } from '@/components/live-banner/components/LiveBannerHeader'
import { LiveBannerContent } from '@/components/live-banner/components/LiveBannerContent'
import { LiveBannerCta } from '@/components/live-banner/components/LiveBannerCta'
import {useResponsiveSection} from "@/hooks/useResponsiveSection";

export default function LiveBanner() {
    const { data, elapsed, dismissed, setDismissed } = useLiveStreamData()
    const { isMobile, isTablet } = useResponsiveSection()

    const bannerRef = useRef<HTMLDivElement>(null)
    const thumbnailRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const shimmerRef = useRef<HTMLDivElement>(null)

    const isBannerVisible = Boolean(data?.isLive && !dismissed)
    const viewers = formatViewerCount(data?.concurrentViewers ?? null)

    useLiveBannerAnimations({
        isVisible: isBannerVisible,
        bannerRef,
        thumbnailRef,
        glowRef,
        shimmerRef,
    })

    const handleJoinStream = () => {
        if (!data?.watchUrl) return
        window.open(data.watchUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <div
            ref={bannerRef}
            style={{
                position: 'fixed',
                bottom: isMobile ? BANNER_SIZES.mobileOffset : BANNER_SIZES.desktopOffset,
                right: isMobile ? BANNER_SIZES.mobileOffset : BANNER_SIZES.desktopOffset,
                left: isMobile ? BANNER_SIZES.mobileOffset : 'auto',
                zIndex: 8000,
                width: isMobile
                    ? 'auto'
                    : isTablet
                        ? `min(${BANNER_SIZES.tabletWidth}, calc(100vw - 2rem))`
                        : `min(${BANNER_SIZES.desktopWidth}, calc(100vw - 2.4rem))`,
                opacity: 0,
                pointerEvents: isBannerVisible ? 'auto' : 'none',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    borderRadius: isMobile ? 16 : 18,
                    overflow: 'hidden',
                    background: BANNER_COLORS.background,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${BANNER_COLORS.border}`,
                    boxShadow:
                        '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,30,30,0.08)',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'linear-gradient(90deg, #ff2020, #ff6060 50%, #ff2020)',
                    }}
                />

                <div
                    ref={glowRef}
                    style={{
                        position: 'absolute',
                        inset: -1,
                        background:
                            'radial-gradient(ellipse at top center, rgba(255,20,20,0.12) 0%, transparent 65%)',
                        opacity: 0.3,
                        pointerEvents: 'none',
                    }}
                />

                <div
                    ref={shimmerRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: '-100%',
                        width: '40%',
                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                        pointerEvents: 'none',
                        transform: 'translateX(-100%)',
                    }}
                />

                <div
                    style={{
                        position: 'relative',
                        padding: isMobile ? '12px 12px 14px' : '14px 14px 16px',
                    }}
                >
                    <LiveBannerHeader
                        viewers={viewers}
                        onDismiss={() => setDismissed(true)}
                        isMobile={isMobile}
                    />

                    <LiveBannerContent
                        title={data?.title ?? null}
                        elapsed={elapsed}
                        thumbnail={data?.thumbnail ?? null}
                        thumbnailRef={thumbnailRef}
                        isMobile={isMobile}
                    />

                    <LiveBannerCta onClick={handleJoinStream} isMobile={isMobile} />
                </div>
            </div>
        </div>
    )
}