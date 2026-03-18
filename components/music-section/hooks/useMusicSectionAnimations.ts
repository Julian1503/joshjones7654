'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MUSIC_REST_HEIGHTS } from '@/components/music-section/constants'

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
    useEffect(() => {
        const context = gsap.context(() => {
            const section = sectionRef.current
            if (!section) return

            gsap.set([scanRef.current, headerRef.current, waveRef.current, playerRef.current], {
                opacity: 0,
            })
            gsap.set(scanRef.current, { scaleX: 0, transformOrigin: 'left center' })
            gsap.set(headerRef.current, { y: isMobile ? 24 : 40 })
            gsap.set(playerRef.current, { y: isMobile ? 18 : 30 })

            ScrollTrigger.create({
                trigger: section,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

                    timeline.to(
                        scanRef.current,
                        { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.inOut' },
                        0
                    )

                    timeline.to(
                        headerRef.current,
                        { opacity: 1, y: 0, duration: 0.7 },
                        0.2
                    )

                    const bars = barRefs.current.filter(Boolean) as HTMLElement[]
                    gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom center' })

                    timeline.to(
                        bars,
                        {
                            scaleY: 1,
                            duration: 0.6,
                            stagger: { amount: 0.5, from: 'center' },
                            ease: 'elastic.out(1, 0.55)',
                        },
                        0.35
                    )

                    timeline.to(waveRef.current, { opacity: 1, duration: 0.3 }, 0.35)
                    timeline.to(playerRef.current, { opacity: 1, y: 0, duration: 0.55 }, 0.65)
                },
            })

            gsap.to(glowRef.current, {
                opacity: 0.6,
                scale: 1.15,
                duration: 4,
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
                        scaleY: MUSIC_REST_HEIGHTS[index] * 1.35,
                        duration: 1.2 + Math.random() * 0.8,
                        ease: 'sine.inOut',
                    },
                    index * 0.015
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
    ])
}