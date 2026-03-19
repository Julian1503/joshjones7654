'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type UseFloatingSocialsAnimationsParams = {
    containerRef: React.RefObject<HTMLDivElement | null>
    lineRef: React.RefObject<HTMLDivElement | null>
    isVisible: boolean
}

export function useFloatingSocialsAnimations({
                                                 containerRef,
                                                 lineRef,
                                                 isVisible,
                                             }: UseFloatingSocialsAnimationsParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const items = Array.from(container.querySelectorAll('.social-item'))
        const line = lineRef.current
        const targets = [...items, line].filter(Boolean)

        if (prefersReducedMotion) {
            gsap.set(targets, { opacity: 1, x: 0 })
            return
        }

        gsap.set(targets, { opacity: 0, x: 10 })

        gsap.to(targets, {
            opacity: 1,
            x: 0,
            duration: 0.46,
            stagger: 0.07,
            ease: 'power2.out',
            delay: 0.45,
        })
    }, [containerRef, lineRef, prefersReducedMotion])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        if (prefersReducedMotion) {
            gsap.set(container, {
                autoAlpha: isVisible ? 1 : 0,
                x: 0,
                scale: 1,
                clearProps: 'filter,rotation',
                pointerEvents: isVisible ? 'auto' : 'none',
            })
            return
        }

        gsap.to(container, {
            autoAlpha: isVisible ? 1 : 0,
            x: isVisible ? 0 : 18,
            scale: isVisible ? 1 : 0.97,
            filter: isVisible ? 'blur(0px)' : 'blur(4px)',
            transformOrigin: 'right center',
            duration: isVisible ? 0.32 : 0.28,
            ease: isVisible ? 'power2.out' : 'power2.in',
            pointerEvents: isVisible ? 'auto' : 'none',
            overwrite: 'auto',
        })
    }, [containerRef, isVisible, prefersReducedMotion])
}