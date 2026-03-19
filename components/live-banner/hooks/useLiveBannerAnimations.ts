'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

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
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const bannerElement = bannerRef.current
        if (!bannerElement) return

        let shimmerTween: gsap.core.Tween | null = null
        let thumbnailTween: gsap.core.Tween | null = null
        let glowTween: gsap.core.Tween | null = null

        if (isVisible) {
            gsap.killTweensOf([bannerElement, shimmerRef.current, thumbnailRef.current, glowRef.current])

            if (prefersReducedMotion) {
                gsap.set(bannerElement, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    clearProps: 'filter',
                })
                gsap.set([shimmerRef.current, thumbnailRef.current, glowRef.current], { clearProps: 'all' })
                return
            }

            gsap.fromTo(
                bannerElement,
                { y: 52, opacity: 0, scale: 0.975, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.56,
                    ease: 'power3.out',
                }
            )

            shimmerTween = gsap.to(shimmerRef.current, {
                x: '200%',
                duration: 3.2,
                ease: 'power1.inOut',
                repeat: -1,
                repeatDelay: 5,
            })

            thumbnailTween = gsap.to(thumbnailRef.current, {
                scale: 1.025,
                duration: 5.4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })

            glowTween = gsap.to(glowRef.current, {
                opacity: 0.5,
                duration: 2.2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        } else {
            gsap.killTweensOf([shimmerRef.current, thumbnailRef.current, glowRef.current])

            if (prefersReducedMotion) {
                gsap.set(bannerElement, {
                    y: 0,
                    opacity: 0,
                    scale: 1,
                    clearProps: 'filter',
                })
                return
            }

            gsap.to(bannerElement, {
                y: 34,
                opacity: 0,
                scale: 0.98,
                duration: 0.3,
                ease: 'power2.in',
            })
        }

        return () => {
            shimmerTween?.kill()
            thumbnailTween?.kill()
            glowTween?.kill()
        }
    }, [isVisible, bannerRef, thumbnailRef, glowRef, shimmerRef, prefersReducedMotion])
}