'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type UseLoadingScreenAnimationParams = {
    overlayRef: React.RefObject<HTMLDivElement | null>
    nameRef: React.RefObject<HTMLDivElement | null>
    nameFillRef: React.RefObject<HTMLDivElement | null>
    scanLineRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    labelRef: React.RefObject<HTMLParagraphElement | null>
    glowRef: React.RefObject<HTMLDivElement | null>
    onCompleteAction: () => void
}

export function useLoadingScreenAnimation({
                                              overlayRef,
                                              nameRef,
                                              nameFillRef,
                                              scanLineRef,
                                              scanRef,
                                              labelRef,
                                              glowRef,
                                              onCompleteAction,
                                          }: UseLoadingScreenAnimationParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const context = gsap.context(() => {
            if (prefersReducedMotion) {
                gsap.set([nameRef.current, labelRef.current, glowRef.current, scanLineRef.current, scanRef.current], {
                    clearProps: 'all',
                })
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power1.out',
                    onComplete: onCompleteAction,
                })
                return
            }

            /* ── Initial state ──────────────────────────────────── */
            gsap.set([nameRef.current, labelRef.current], {
                opacity: 0,
                y: 24,
                filter: 'blur(10px)',
            })

            gsap.set(nameFillRef.current, {
                clipPath: 'inset(0% 0% 100% 0%)',
            })

            gsap.set(scanLineRef.current, {
                top: '0%',
                opacity: 0,
            })

            gsap.set(scanRef.current, {
                scaleX: 0,
                transformOrigin: 'left center',
            })

            gsap.set(glowRef.current, {
                opacity: 0,
            })

            /* ── Entrance timeline ─────────────────────────────── */
            const timeline = gsap.timeline()

            // Scan line
            timeline.to(scanRef.current, {
                scaleX: 1,
                duration: 0.9,
                ease: 'power2.inOut',
            }, 0)

            // Background glow
            timeline.to(glowRef.current, {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
            }, 0.1)

            // Name wrapper (ghost + fill appear together)
            timeline.to(nameRef.current, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.1,
                ease: 'power3.out',
            }, 0.5)

            // Red line appears when the name is visible
            timeline.to(scanLineRef.current, {
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
            }, 1.2)

            // Line and fill drop in sync — same duration and ease
            timeline.to(nameFillRef.current, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 3.2,
                ease: 'power1.inOut',
            }, 1.3)

            timeline.to(scanLineRef.current, {
                top: '100%',
                duration: 3.2,
                ease: 'power1.inOut',
            }, 1.3)

            // Line disappears at the end of the fill
            timeline.to(scanLineRef.current, {
                opacity: 0,
                duration: 0.35,
                ease: 'power2.in',
            }, 4.2)

            /* ── Exit sequence ──────────────────────────────────────────── */
            timeline.to(nameRef.current, {
                opacity: 0,
                y: -50,
                scale: 1.08,
                filter: 'blur(22px)',
                duration: 0.75,
                ease: 'power3.in',
            }, 4.6)

            timeline.to(glowRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            }, 4.6)

            // Slide-up of the complete overlay
            timeline.to(overlayRef.current, {
                yPercent: -100,
                duration: 0.85,
                ease: 'power3.inOut',
                onComplete: onCompleteAction,
            }, 5.0)

        }, overlayRef)

        return () => context.revert()
    }, [
        overlayRef,
        nameRef,
        nameFillRef,
        scanLineRef,
        scanRef,
        labelRef,
        glowRef,
        onCompleteAction,
        prefersReducedMotion,
    ])
}