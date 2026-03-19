'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type UseAboutJoshuaAnimationsParams = {
    sectionRef: React.RefObject<HTMLElement | null>
    headerRef: React.RefObject<HTMLDivElement | null>
    dividerRef: React.RefObject<HTMLDivElement | null>
    quoteRef: React.RefObject<HTMLDivElement | null>
    closingRef: React.RefObject<HTMLDivElement | null>
    chapterRefs: React.RefObject<HTMLDivElement[]>
    isMobile: boolean
}

export function useAboutJoshuaAnimations({
                                             sectionRef,
                                             headerRef,
                                             dividerRef,
                                             quoteRef,
                                             closingRef,
                                             chapterRefs,
                                             isMobile,
                                         }: UseAboutJoshuaAnimationsParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const context = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            if (prefersReducedMotion) {
                gsap.set([
                    headerRef.current,
                    dividerRef.current,
                    quoteRef.current,
                    closingRef.current,
                    ...chapterRefs.current,
                ], {
                    opacity: 1,
                    clearProps: 'all',
                })
                return
            }

            gsap.fromTo(
                headerRef.current,
                { y: isMobile ? 24 : 40, opacity: 0, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 74%',
                        once: true,
                    },
                }
            )

            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: dividerRef.current,
                        start: 'top 86%',
                        once: true,
                    },
                }
            )

            chapterRefs.current.filter(Boolean).forEach((element, index) => {
                gsap.fromTo(
                    element,
                    {
                        x: isMobile ? 0 : index % 2 === 0 ? -32 : 32,
                        y: isMobile ? 18 : 0,
                        opacity: 0,
                        filter: 'blur(8px)',
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.82,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 82%',
                            once: true,
                        },
                    }
                )
            })

            gsap.fromTo(
                quoteRef.current,
                { y: 44, opacity: 0, scale: 0.97, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 84%',
                        once: true,
                    },
                }
            )

            gsap.fromTo(
                closingRef.current,
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.72,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: closingRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            )
        }, sectionRef)

        return () => context.revert()
    }, [sectionRef, headerRef, dividerRef, quoteRef, closingRef, chapterRefs, isMobile, prefersReducedMotion])
}