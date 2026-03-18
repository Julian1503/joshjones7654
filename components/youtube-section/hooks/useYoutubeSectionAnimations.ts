'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type UseYoutubeSectionAnimationsParams = {
    isLoading: boolean
    totalVideoCount: number
    sectionRef: React.RefObject<HTMLElement | null>
    headerRef: React.RefObject<HTMLDivElement | null>
    countRef: React.RefObject<HTMLSpanElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    cardRefs: React.RefObject<HTMLDivElement[]>
}

export function useYoutubeSectionAnimations({
                                                isLoading,
                                                totalVideoCount,
                                                sectionRef,
                                                headerRef,
                                                countRef,
                                                scanRef,
                                                cardRefs,
                                            }: UseYoutubeSectionAnimationsParams) {
    useEffect(() => {
        if (isLoading || cardRefs.current.length === 0) return

        const context = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            gsap.fromTo(
                scanRef.current,
                { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.4,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                }
            )

            gsap.fromTo(
                headerRef.current,
                { y: 44, opacity: 0, filter: 'blur(12px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 74%',
                    },
                }
            )

            gsap.fromTo(
                { value: 0 },
                { value: 0 },
                {
                    value: totalVideoCount,
                    duration: 1.8,
                    ease: 'power2.out',
                    snap: { value: 1 },
                    onUpdate() {
                        const current = this.targets()[0] as { value: number }
                        if (countRef.current) {
                            countRef.current.textContent = String(Math.round(current.value))
                        }
                    },
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 72%',
                    },
                }
            )

            gsap.fromTo(
                cardRefs.current,
                { y: 50, opacity: 0, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    stagger: { amount: 0.4, from: 'start' },
                    ease: 'power3.out',
                }
            )
        }, sectionRef)

        return () => context.revert()
    }, [isLoading, totalVideoCount, sectionRef, headerRef, countRef, scanRef, cardRefs])
}