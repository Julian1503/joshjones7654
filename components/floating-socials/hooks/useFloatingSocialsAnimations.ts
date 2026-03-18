'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

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
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const items = Array.from(container.querySelectorAll('.social-item'))
        const line = lineRef.current
        const targets = [...items, line].filter(Boolean)

        gsap.set(targets, { opacity: 0, x: 14 })

        gsap.to(targets, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.8,
        })
    }, [containerRef, lineRef])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        gsap.to(container, {
            autoAlpha: isVisible ? 1 : 0,
            x: isVisible ? 0 : 32,
            scaleX: isVisible ? 1 : 0.22,
            scaleY: isVisible ? 1 : 0.7,
            rotation: isVisible ? 0 : 6,
            filter: isVisible ? 'blur(0px)' : 'blur(10px)',
            transformOrigin: 'right center',
            duration: isVisible ? 0.35 : 0.42,
            ease: isVisible ? 'power2.out' : 'power3.in',
            pointerEvents: isVisible ? 'auto' : 'none',
        })
    }, [containerRef, isVisible])
}