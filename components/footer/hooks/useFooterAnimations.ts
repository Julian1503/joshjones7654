'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type UseFooterAnimationsParams = {
    footerRef: React.RefObject<HTMLElement | null>
    wordOneRef: React.RefObject<HTMLDivElement | null>
    wordTwoRef: React.RefObject<HTMLDivElement | null>
    ctaRef: React.RefObject<HTMLDivElement | null>
    gridRef: React.RefObject<HTMLDivElement | null>
    bottomRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    glowRef: React.RefObject<HTMLDivElement | null>
    isMobile: boolean
}

export function useFooterAnimations({
                                        footerRef,
                                        wordOneRef,
                                        wordTwoRef,
                                        ctaRef,
                                        gridRef,
                                        bottomRef,
                                        scanRef,
                                        glowRef,
                                        isMobile,
                                    }: UseFooterAnimationsParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const context = gsap.context(() => {
            const footer = footerRef.current
            if (!footer) return

            if (prefersReducedMotion) {
                gsap.set([
                    scanRef.current,
                    wordOneRef.current,
                    wordTwoRef.current,
                    ctaRef.current,
                    gridRef.current,
                    bottomRef.current,
                ], {
                    opacity: 1,
                    y: 0,
                    scaleX: 1,
                    clearProps: 'all',
                })
                gsap.set(glowRef.current, { opacity: 0.45, scale: 1 })
                return
            }

            gsap.set(scanRef.current, {
                scaleX: 0,
                transformOrigin: 'left center',
            })

            ScrollTrigger.create({
                trigger: footer,
                start: 'top 88%',
                once: true,
                onEnter: () => {
                    const timeline = gsap.timeline({
                        defaults: { ease: 'power3.out' },
                    })

                    timeline.to(
                        scanRef.current,
                        {
                            scaleX: 1,
                            duration: 0.78,
                            ease: 'power2.inOut',
                        },
                        0
                    )

                    gsap.set([wordOneRef.current, wordTwoRef.current], {
                        y: isMobile ? 60 : 96,
                        opacity: 0,
                        skewY: 1.6,
                    })

                    timeline.to(
                        wordOneRef.current,
                        {
                            y: 0,
                            opacity: 1,
                            skewY: 0,
                            duration: 0.74,
                        },
                        0.08
                    )

                    timeline.to(
                        wordTwoRef.current,
                        {
                            y: 0,
                            opacity: 1,
                            skewY: 0,
                            duration: 0.74,
                        },
                        0.18
                    )

                    gsap.set([ctaRef.current, gridRef.current, bottomRef.current], {
                        opacity: 0,
                        y: 16,
                    })

                    timeline.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.38)
                    timeline.to(gridRef.current, { opacity: 1, y: 0, duration: 0.52 }, 0.48)
                    timeline.to(bottomRef.current, { opacity: 1, y: 0, duration: 0.44 }, 0.6)
                },
            })

            gsap.to(glowRef.current, {
                opacity: 0.5,
                scale: 1.09,
                duration: 6,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
            })
        }, footerRef)

        return () => context.revert()
    }, [
        footerRef,
        wordOneRef,
        wordTwoRef,
        ctaRef,
        gridRef,
        bottomRef,
        scanRef,
        glowRef,
        isMobile,
        prefersReducedMotion,
    ])
}