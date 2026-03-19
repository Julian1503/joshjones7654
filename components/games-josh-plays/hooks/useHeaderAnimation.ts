'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

type UseHeaderAnimationRefs = {
    containerRef: React.RefObject<HTMLDivElement | null>
    labelRef: React.RefObject<HTMLParagraphElement | null>
    line1Ref: React.RefObject<HTMLSpanElement | null>
    line2Ref: React.RefObject<HTMLSpanElement | null>
    descRef: React.RefObject<HTMLParagraphElement | null>
}

export function useHeaderAnimation(): UseHeaderAnimationRefs {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const labelRef = useRef<HTMLParagraphElement | null>(null)
    const line1Ref = useRef<HTMLSpanElement | null>(null)
    const line2Ref = useRef<HTMLSpanElement | null>(null)
    const descRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 82%',
                    once: true,
                },
            })

            tl.fromTo(
                labelRef.current,
                { opacity: 0, x: -28, filter: 'blur(4px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
            )
                .fromTo(
                    line1Ref.current,
                    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                    { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.7, ease: 'power4.out' },
                    '-=0.25'
                )
                .fromTo(
                    line2Ref.current,
                    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                    { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.7, ease: 'power4.out' },
                    '-=0.45'
                )
                .fromTo(
                    descRef.current,
                    { opacity: 0, y: 18 },
                    { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
                    '-=0.3'
                )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return { containerRef, labelRef, line1Ref, line2Ref, descRef }
}
