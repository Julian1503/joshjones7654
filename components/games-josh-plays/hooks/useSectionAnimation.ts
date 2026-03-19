'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

type UseSectionAnimationRefs = {
    sectionRef: React.RefObject<HTMLElement>
    bgGlowRef: React.RefObject<HTMLDivElement>
}

export function useSectionAnimation(): UseSectionAnimationRefs {
    const sectionRef = useRef<HTMLElement>(null)
    const bgGlowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgGlowRef.current, {
                backgroundPosition: '65% 60%',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.4,
                },
            })

            gsap.fromTo(
                sectionRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return { sectionRef, bgGlowRef }
}
