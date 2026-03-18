import gsap from 'gsap'
import type { ScrollAnimationTarget, ScrollTriggerConfig } from '@/components/parallax-hero/types'

export function createBaseTrigger(
    triggerElement: HTMLDivElement | null
): ScrollTriggerConfig {
    return {
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
    }
}

export function animateParallax(
    target: ScrollAnimationTarget,
    travel: number,
    trigger: ScrollTriggerConfig,
    from: gsap.TweenVars = {}
) {
    if (!target) return

    gsap.fromTo(
        target,
        { y: 0, ...from },
        {
            y: travel,
            ease: 'none',
            scrollTrigger: trigger,
        }
    )
}

export function animateDepthBreathing(
    target: ScrollAnimationTarget,
    scaleFrom: number,
    scaleTo: number,
    trigger: ScrollTriggerConfig,
    extraFrom: gsap.TweenVars = {},
    extraTo: gsap.TweenVars = {}
) {
    if (!target) return

    gsap.fromTo(
        target,
        { scale: scaleFrom, ...extraFrom },
        {
            scale: scaleTo,
            ease: 'none',
            scrollTrigger: trigger,
            ...extraTo,
        }
    )
}