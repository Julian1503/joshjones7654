'use client'

import type { CSSProperties, RefObject } from 'react'
import Image from 'next/image'
import type { HeroViewport } from '@/components/parallax-hero/types'

type HeroStageProps = {
    stageRef: RefObject<HTMLDivElement | null>
    bgRef: RefObject<HTMLDivElement | null>
    pcRef: RefObject<HTMLDivElement | null>
    personRef: RefObject<HTMLDivElement | null>
    tableRef: RefObject<HTMLDivElement | null>
    vignetteRef: RefObject<HTMLDivElement | null>
    fullLayerStyle: CSSProperties
    stageLayerStyle: CSSProperties
    viewport: HeroViewport
}

export function HeroStage({
                              stageRef,
                              bgRef,
                              pcRef,
                              personRef,
                              tableRef,
                              vignetteRef,
                              fullLayerStyle,
                              stageLayerStyle,
                              viewport,
                          }: HeroStageProps) {
    const isMobile = viewport === 'mobile'
    const isTablet = viewport === 'tablet'

    return (
        <div
            ref={stageRef}
            style={{
                ...fullLayerStyle,
                zIndex: 1,
                overflow: 'hidden',
                clipPath: isMobile
                    ? 'inset(0% 0% round 0px)'
                    : isTablet
                        ? 'inset(3% 4% round 10px)'
                        : 'inset(7% 10% round 10px)',
            }}
        >
            <div
                ref={bgRef}
                style={{
                    ...fullLayerStyle,
                    zIndex: 0,
                    willChange: 'transform, filter, opacity',
                }}
            >
                <Image
                    src={isMobile ? '/parallax_bg_mobile.webp' : '/parallax_bg.webp'}                    alt=""
                    fill
                    priority
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <div
                ref={pcRef}
                style={{
                    ...stageLayerStyle,
                    left: isMobile ? '-10%' : 0,
                    right: isMobile ? '-10%' : 0,
                    bottom: isMobile ? '14%' : isTablet ? '10%' : '8%',
                    top: isMobile ? '34%' : isTablet ? '29%' : '26%',
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}
            >
                <Image
                    src="/parallax_pc.webp"
                    alt=""
                    fill
                    priority
                    style={{
                        objectFit: 'contain',
                        objectPosition: isMobile ? 'center 30%' : 'center bottom',
                        pointerEvents: 'none',
                        transform: isMobile ? 'translateX(-2%) translateX(40px)' : 'none',
                    }}
                />
            </div>

            <div
                ref={vignetteRef}
                style={{
                    ...fullLayerStyle,
                    zIndex: 2,
                    willChange: 'transform, opacity',
                    background: isMobile
                        ? 'radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,0.16) 56%, rgba(0,0,0,0.60) 100%)'
                        : 'radial-gradient(circle at center, rgba(0,0,0,0) 26%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.52) 100%)',
                }}
            />

            <div
                ref={tableRef}
                style={{
                    ...stageLayerStyle,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: isMobile ? '20%' : '18%',
                    zIndex: 3,
                    willChange: 'transform',
                }}
            >
                <Image
                    src={isMobile ? '/parallax_table_mobile_v2.webp' : '/parallax_table.webp'}
                    alt=""
                    fill
                    priority
                    style={{
                        objectFit: 'cover',
                        objectPosition: isMobile ? 'center bottom' : 'center bottom',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <div
                ref={personRef}
                style={{
                    ...stageLayerStyle,
                    left: '50%',
                    bottom: isMobile ? '11%' : isTablet ? '10%' : '9%',
                    width: isMobile
                        ? 'min(80vw, 380px)'
                        : isTablet
                            ? 'min(52vw, 520px)'
                            : 'min(42vw, 760px)',
                    height: isMobile ? '62%' : isTablet ? '72%' : '78%',
                    transform: 'translateX(-50%)',
                    zIndex: 4,
                    willChange: 'transform, opacity',
                }}
            >
                <Image
                    src={isMobile ? '/parallax_joshua_mobile.webp' : '/parallax_joshua.webp'}
                    alt="Joshua"
                    fill
                    priority
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center bottom',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        </div>
    )
}