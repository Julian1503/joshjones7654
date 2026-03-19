'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MUSIC_REST_HEIGHTS } from '@/components/music-section/constants'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type UseMusicSectionAnimationsParams = {
    sectionRef: React.RefObject<HTMLElement | null>
    headerRef: React.RefObject<HTMLDivElement | null>
    waveRef: React.RefObject<HTMLDivElement | null>
    playerRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    glowRef: React.RefObject<HTMLDivElement | null>
    barRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    isMobile: boolean
}

export function useMusicSectionAnimations({
                                              sectionRef,
                                              headerRef,
                                              waveRef,
                                              playerRef,
                                              scanRef,
                                              glowRef,
                                              barRefs,
                                              isMobile,
                                          }: UseMusicSectionAnimationsParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const context = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            if (prefersReducedMotion) {
                gsap.set([scanRef.current, headerRef.current, waveRef.current, playerRef.current], {
                    opacity: 1,
                    y: 0,
                    scaleX: 1,
                    clearProps: 'all',
                })
                gsap.set(barRefs.current.filter(Boolean), { scaleY: 1, clearProps: 'all' })
                gsap.set(glowRef.current, { opacity: 0.45, scale: 1 })
                return
            }

            gsap.set([scanRef.current, headerRef.current, waveRef.current, playerRef.current], {
                opacity: 0,
            })
            gsap.set(scanRef.current, { scaleX: 0, transformOrigin: 'left center' })
            gsap.set(headerRef.current, { y: isMobile ? 20 : 34 })
            gsap.set(playerRef.current, { y: isMobile ? 14 : 24 })

            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

                    timeline.to(
                        scanRef.current,
                        { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power2.inOut' },
                        0
                    )

                    timeline.to(
                        headerRef.current,
                        { opacity: 1, y: 0, duration: 0.6 },
                        0.12
                    )

                    const bars = barRefs.current.filter(Boolean) as HTMLElement[]
                    gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom center' })

                    timeline.to(
                        bars,
                        {
                            scaleY: 1,
                            duration: 0.55,
                            stagger: { amount: 0.34, from: 'center' },
                            ease: 'back.out(1.25)',
                        },
                        0.24
                    )

                    timeline.to(waveRef.current, { opacity: 1, duration: 0.28 }, 0.22)
                    timeline.to(playerRef.current, { opacity: 1, y: 0, duration: 0.48 }, 0.42)
                },
            })

            gsap.to(glowRef.current, {
                opacity: 0.56,
                scale: 1.11,
                duration: 5.5,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
            })

            const idleLoop = gsap.timeline({ repeat: -1, yoyo: true })
            barRefs.current.forEach((bar, index) => {
                if (!bar) return

                idleLoop.to(
                    bar,
                    {
                        scaleY: MUSIC_REST_HEIGHTS[index] * 1.28,
                        duration: 1 + index * 0.08,
                        ease: 'sine.inOut',
                    },
                    index * 0.02
                )
            })

            return () => {
                idleLoop.kill()
            }
        }, sectionRef)

        return () => context.revert()
    }, [
        sectionRef,
        headerRef,
        waveRef,
        playerRef,
        scanRef,
        glowRef,
        barRefs,
        isMobile,
        prefersReducedMotion,
    ])
}