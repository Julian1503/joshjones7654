'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'

type UseLiveBannerAnimationsParams = {
    isVisible: boolean
    bannerRef: RefObject<HTMLDivElement | null>
    thumbnailRef: RefObject<HTMLDivElement | null>
    glowRef: RefObject<HTMLDivElement | null>
    shimmerRef: RefObject<HTMLDivElement | null>
}

export function useLiveBannerAnimations({
                                            isVisible,
                                            bannerRef,
                                            thumbnailRef,
                                            glowRef,
                                            shimmerRef,
                                        }: UseLiveBannerAnimationsParams) {
    useEffect(() => {
        const bannerElement = bannerRef.current
        if (!bannerElement) return

        let shimmerTween: gsap.core.Tween | null = null
        let thumbnailTween: gsap.core.Tween | null = null
        let glowTween: gsap.core.Tween | null = null

        if (isVisible) {
            gsap.killTweensOf([bannerElement, shimmerRef.current, thumbnailRef.current, glowRef.current])

            gsap.fromTo(
                bannerElement,
                { y: 80, opacity: 0, scale: 0.96, filter: 'blur(10px)' },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.7,
                    ease: 'power3.out',
                }
            )

            shimmerTween = gsap.to(shimmerRef.current, {
                x: '200%',
                duration: 2.8,
                ease: 'power1.inOut',
                repeat: -1,
                repeatDelay: 4,
            })

            thumbnailTween = gsap.to(thumbnailRef.current, {
                scale: 1.04,
                duration: 4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })

            glowTween = gsap.to(glowRef.current, {
                opacity: 0.55,
                duration: 1.8,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        } else {
            gsap.killTweensOf([shimmerRef.current, thumbnailRef.current, glowRef.current])

            gsap.to(bannerElement, {
                y: 60,
                opacity: 0,
                scale: 0.95,
                duration: 0.45,
                ease: 'power2.in',
            })
        }

        return () => {
            shimmerTween?.kill()
            thumbnailTween?.kill()
            glowTween?.kill()
        }
    }, [isVisible, bannerRef, thumbnailRef, glowRef, shimmerRef])
}