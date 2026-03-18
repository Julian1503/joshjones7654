'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HeroRefs, ScrollTriggerConfig } from '@/components/parallax-hero/types'
import { DEPTH_BREATHING, PARALLAX_TRAVEL } from '@/components/parallax-hero/constants'
import {
    animateDepthBreathing,
    animateParallax,
    createBaseTrigger,
} from '@/components/parallax-hero/utils/animationHelpers'

gsap.registerPlugin(ScrollTrigger)

export function useParallaxHeroAnimations({
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
                                          }: HeroRefs) {
    useEffect(() => {
        const context = gsap.context(() => {
            const trigger = createBaseTrigger(wrapperRef.current)
            const travel = PARALLAX_TRAVEL[viewport]

            gsap.set(stageRef.current, { transformOrigin: 'center center' })
            gsap.set(textGroupRef.current, { transformOrigin: 'center center' })
            gsap.set(titleRef.current, { transformOrigin: 'center center' })

            animateStageReveal(stageRef.current, trigger, viewport)
            animateBackground(bgRef.current, trigger, travel.background)
            animateMonitors(pcRef.current, trigger, travel.monitors)
            animatePerson(personRef.current, trigger, travel.person)
            animateTable(tableRef.current, trigger, travel.table)
            animateGhostName(ghostRef.current, trigger, viewport)
            animateVignette(vignetteRef.current, trigger)
            animateTextGroup(textGroupRef.current, trigger, travel.text, viewport)
            animateTextLines(eyebrowRef.current, titleRef.current, rolesRef.current, trigger, viewport)
            animateTitleGlow(titleRef.current, trigger, viewport)
        }, wrapperRef)

        return () => context.revert()
    }, [
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
    ])
}

function animateStageReveal(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    viewport: HeroRefs['viewport']
) {
    if (!target) return

    const isMobile = viewport === 'mobile'
    const isTablet = viewport === 'tablet'

    gsap.fromTo(
        target,
        {
            clipPath: isMobile
                ? 'inset(0% 0% round 0px)'
                : isTablet
                    ? 'inset(3% 4% round 10px)'
                    : 'inset(7% 10% round 10px)',
            scale: isMobile ? 1.02 : 1.08,
        },
        {
            clipPath: 'inset(0% 0% round 0px)',
            scale: 1,
            ease: 'none',
            scrollTrigger: trigger,
        }
    )
}

function animateBackground(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    travel: number
) {
    animateParallax(target, travel, trigger, {
        scale: DEPTH_BREATHING.background.from,
        filter: 'blur(6px)',
        opacity: 0.7,
    })

    animateDepthBreathing(
        target,
        DEPTH_BREATHING.background.from,
        DEPTH_BREATHING.background.to,
        trigger,
        {
            filter: 'blur(6px)',
            opacity: 0.7,
        },
        {
            filter: 'blur(0px)',
            opacity: 1,
        }
    )
}

function animateMonitors(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    travel: number
) {
    animateParallax(target, travel, trigger, {
        opacity: 0.85,
    })

    animateDepthBreathing(
        target,
        DEPTH_BREATHING.monitors.from,
        DEPTH_BREATHING.monitors.to,
        trigger,
        { opacity: 0.85 },
        { opacity: 1 }
    )
}

function animatePerson(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    travel: number
) {
    animateParallax(target, travel, trigger, {
        opacity: 0.95,
    })

    animateDepthBreathing(
        target,
        DEPTH_BREATHING.person.from,
        DEPTH_BREATHING.person.to,
        trigger,
        { opacity: 0.95 },
        { opacity: 1 }
    )
}

function animateTable(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    travel: number
) {
    animateParallax(target, travel, trigger)

    animateDepthBreathing(
        target,
        DEPTH_BREATHING.table.from,
        DEPTH_BREATHING.table.to,
        trigger
    )
}

function animateGhostName(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    viewport: HeroRefs['viewport']
) {
    if (!target) return

    const yValue = viewport === 'mobile' ? -20 : viewport === 'tablet' ? -35 : -50

    gsap.fromTo(
        target,
        { opacity: 0.12, y: 0 },
        {
            opacity: 0,
            y: yValue,
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                end: '45% bottom',
            },
        }
    )
}

function animateVignette(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig
) {
    if (!target) return

    gsap.fromTo(
        target,
        {
            opacity: 0.92,
            scale: 1.08,
        },
        {
            opacity: 0.72,
            scale: 1,
            ease: 'none',
            scrollTrigger: trigger,
        }
    )
}

function animateTextGroup(
    target: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    travel: number,
    viewport: HeroRefs['viewport']
) {
    if (!target) return

    const initialY = viewport === 'mobile' ? 8 : 24

    gsap.fromTo(
        target,
        {
            y: initialY,
            opacity: 1,
        },
        {
            y: travel,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                start: 'top top',
                end: '55% bottom',
            },
        }
    )
}

function animateTextLines(
    eyebrowTarget: HTMLParagraphElement | null,
    titleTarget: HTMLHeadingElement | null,
    rolesTarget: HTMLDivElement | null,
    trigger: ScrollTriggerConfig,
    viewport: HeroRefs['viewport']
) {
    if (!eyebrowTarget || !titleTarget || !rolesTarget) return

    const eyebrowY = viewport === 'mobile' ? 10 : 18
    const titleY = viewport === 'mobile' ? 16 : 28
    const rolesY = viewport === 'mobile' ? 10 : 16

    gsap.fromTo(
        eyebrowTarget,
        {
            y: eyebrowY,
            opacity: 0,
            filter: 'blur(8px)',
        },
        {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                start: 'top top',
                end: '28% bottom',
            },
        }
    )

    gsap.fromTo(
        titleTarget,
        {
            y: titleY,
            opacity: 0,
            scale: 0.96,
            filter: 'blur(10px)',
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                start: '8% top',
                end: '38% bottom',
            },
        }
    )

    gsap.fromTo(
        rolesTarget,
        {
            y: rolesY,
            opacity: 0,
            filter: 'blur(6px)',
        },
        {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                start: '14% top',
                end: '46% bottom',
            },
        }
    )
}

function animateTitleGlow(
    target: HTMLHeadingElement | null,
    trigger: ScrollTriggerConfig,
    viewport: HeroRefs['viewport']
) {
    if (!target) return

    const shadowTo =
        viewport === 'mobile'
            ? '0 0 26px rgba(60,200,255,0.18), 0 4px 16px rgba(0,0,0,0.82)'
            : '0 0 46px rgba(60,200,255,0.30), 0 4px 16px rgba(0,0,0,0.82)'

    gsap.fromTo(
        target,
        {
            textShadow:
                '0 0 18px rgba(60,200,255,0.10), 0 4px 16px rgba(0,0,0,0.78)',
        },
        {
            textShadow: shadowTo,
            ease: 'none',
            scrollTrigger: {
                ...trigger,
                start: 'top top',
                end: '48% bottom',
            },
        }
    )
}