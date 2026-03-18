'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    useEffect(() => {
        const context = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            gsap.fromTo(
                headerRef.current,
                { y: isMobile ? 28 : 48, opacity: 0, filter: 'blur(14px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 72%',
                    },
                }
            )

            gsap.fromTo(
                dividerRef.current,
                { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: dividerRef.current,
                        start: 'top 84%',
                    },
                }
            )

            chapterRefs.current.filter(Boolean).forEach((element, index) => {
                gsap.fromTo(
                    element,
                    {
                        x: isMobile ? 0 : index % 2 === 0 ? -40 : 40,
                        y: isMobile ? 24 : 0,
                        opacity: 0,
                        filter: 'blur(10px)',
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                        },
                    }
                )
            })

            gsap.fromTo(
                quoteRef.current,
                { y: 60, opacity: 0, scale: 0.96, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: 'top 82%',
                    },
                }
            )

            gsap.fromTo(
                closingRef.current,
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: closingRef.current,
                        start: 'top 88%',
                    },
                }
            )
        }, sectionRef)

        return () => context.revert()
    }, [sectionRef, headerRef, dividerRef, quoteRef, closingRef, chapterRefs, isMobile])
}