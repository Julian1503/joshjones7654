'use client'

import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { COLORS, FLICKER_KEYFRAMES, SECTION_HEIGHT } from '@/components/parallax-hero/constants'
import { useParallaxHeroAnimations } from '@/components/parallax-hero/hooks/useParallaxHeroAnimations'
import { GhostName } from '@/components/parallax-hero/components/GhostName'
import { HeroStage } from '@/components/parallax-hero/components/HeroStage'
import { HeroTextOverlay } from '@/components/parallax-hero/components/HeroTextOverlay'
import {useResponsiveSection} from "@/hooks/useResponsiveSection";

export default function ParallaxHero() {
    const [criticalAssetsReady, setCriticalAssetsReady] = useState({
        background: false,
        person: false,
    })
    const [forceShowText, setForceShowText] = useState(false)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const bgRef = useRef<HTMLDivElement>(null)
    const pcRef = useRef<HTMLDivElement>(null)
    const personRef = useRef<HTMLDivElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const vignetteRef = useRef<HTMLDivElement>(null)
    const ghostRef = useRef<HTMLDivElement>(null)
    const textGroupRef = useRef<HTMLDivElement>(null)
    const eyebrowRef = useRef<HTMLParagraphElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const rolesRef = useRef<HTMLDivElement>(null)

    const { viewport } = useResponsiveSection()

    const markAssetReady = useCallback((asset: 'background' | 'person') => {
        setCriticalAssetsReady((previous) => {
            if (previous[asset]) return previous
            return { ...previous, [asset]: true }
        })
    }, [])

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setForceShowText(true)
        }, 1500)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [])

    const isHeroTextVisible =
        forceShowText || (criticalAssetsReady.background && criticalAssetsReady.person)

    useParallaxHeroAnimations({
        wrapperRef,
        stageRef,
        bgRef,
        pcRef,
        personRef,
        tableRef,
        vignetteRef,
        ghostRef,
        textGroupRef,
        eyebrowRef,
        titleRef,
        rolesRef,
        viewport,
    })

    const stageLayerStyle: CSSProperties = {
        position: 'absolute',
        pointerEvents: 'none',
    }

    const fullLayerStyle: CSSProperties = {
        ...stageLayerStyle,
        inset: 0,
    }

    return (
        <>
            <style>{FLICKER_KEYFRAMES}</style>

            <div
                id='hero'
                role='region'
                data-site-menu="false"
                aria-label='Joshua hero'
                ref={wrapperRef}
                style={{
                    position: 'relative',
                    height: SECTION_HEIGHT,
                    background: COLORS.background,
                }}
            >
                <section
                    style={{
                        position: 'sticky',
                        top: 0,
                        width: '100%',
                        height: '100svh',
                        minHeight: '100svh',
                        overflow: 'hidden',
                        background: COLORS.background,
                    }}
                >
                    <GhostName
                        ghostRef={ghostRef}
                        fullLayerStyle={fullLayerStyle}
                        viewport={viewport}
                    />

                    <HeroStage
                        stageRef={stageRef}
                        bgRef={bgRef}
                        pcRef={pcRef}
                        personRef={personRef}
                        tableRef={tableRef}
                        vignetteRef={vignetteRef}
                        fullLayerStyle={fullLayerStyle}
                        stageLayerStyle={stageLayerStyle}
                        viewport={viewport}
                        onBackgroundReadyAction={() => markAssetReady('background')}
                        onPersonReadyAction={() => markAssetReady('person')}
                    />

                    <HeroTextOverlay
                        fullLayerStyle={fullLayerStyle}
                        textGroupRef={textGroupRef}
                        eyebrowRef={eyebrowRef}
                        titleRef={titleRef}
                        rolesRef={rolesRef}
                        viewport={viewport}
                        isVisible={isHeroTextVisible}
                    />
                </section>
            </div>
        </>
    )
}