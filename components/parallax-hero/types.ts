import type { CSSProperties, ReactNode, RefObject } from 'react'

export type ScrollAnimationTarget = HTMLElement | null

export type ScrollTriggerConfig = {
    trigger: HTMLDivElement | null
    start: string
    end: string
    scrub: number
}

export type HeroViewport = 'mobile' | 'tablet' | 'desktop'

export type HeroRefs = {
    wrapperRef: RefObject<HTMLDivElement | null>
    stageRef: RefObject<HTMLDivElement | null>
    bgRef: RefObject<HTMLDivElement | null>
    pcRef: RefObject<HTMLDivElement | null>
    personRef: RefObject<HTMLDivElement | null>
    tableRef: RefObject<HTMLDivElement | null>
    vignetteRef: RefObject<HTMLDivElement | null>
    ghostRef: RefObject<HTMLDivElement | null>
    textGroupRef: RefObject<HTMLDivElement | null>
    eyebrowRef: RefObject<HTMLParagraphElement | null>
    titleRef: RefObject<HTMLHeadingElement | null>
    rolesRef: RefObject<HTMLDivElement | null>
    viewport: HeroViewport
}

export type LineWithGlowProps = {
    children: ReactNode
    className?: string
    style?: CSSProperties
}