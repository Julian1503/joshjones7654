'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type UseSiteMenuAnimationsParams = {
    buttonRef: React.RefObject<HTMLButtonElement | null>
    overlayRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    linksRef: React.RefObject<HTMLDivElement | null>
    bottomRef: React.RefObject<HTMLDivElement | null>
    line1Ref: React.RefObject<HTMLSpanElement | null>
    line2Ref: React.RefObject<HTMLSpanElement | null>
    line3Ref: React.RefObject<HTMLSpanElement | null>
    isButtonVisible: boolean
    isMenuOpen: boolean
}

export function useSiteMenuAnimations({
                                          buttonRef,
                                          overlayRef,
                                          scanRef,
                                          linksRef,
                                          bottomRef,
                                          line1Ref,
                                          line2Ref,
                                          line3Ref,
                                          isButtonVisible,
                                          isMenuOpen,
                                      }: UseSiteMenuAnimationsParams) {
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    useEffect(() => {
        const buttonElement = buttonRef.current
        if (!buttonElement) return

        if (prefersReducedMotion) {
            gsap.set(buttonElement, {
                opacity: isButtonVisible ? 1 : 0,
                scale: 1,
                y: 0,
                pointerEvents: isButtonVisible ? 'auto' : 'none',
            })
            return
        }

        gsap.to(buttonElement, {
            opacity: isButtonVisible ? 1 : 0,
            scale: isButtonVisible ? 1 : 0.7,
            y: isButtonVisible ? 0 : 16,
            duration: 0.4,
            ease: isButtonVisible ? 'back.out(2)' : 'power2.in',
            pointerEvents: isButtonVisible ? 'auto' : 'none',
        })
    }, [buttonRef, isButtonVisible, prefersReducedMotion])

    useEffect(() => {
        const overlayElement = overlayRef.current
        const scanElement = scanRef.current
        const linksElement = linksRef.current
        const bottomElement = bottomRef.current
        const line1Element = line1Ref.current
        const line2Element = line2Ref.current
        const line3Element = line3Ref.current

        if (
            !overlayElement ||
            !scanElement ||
            !linksElement ||
            !bottomElement ||
            !line1Element ||
            !line2Element ||
            !line3Element
        ) {
            return
        }

        if (prefersReducedMotion) {
            gsap.set(overlayElement, {
                display: isMenuOpen ? 'flex' : 'none',
                pointerEvents: isMenuOpen ? 'auto' : 'none',
                opacity: 1,
                clipPath: 'none',
            })
            gsap.set([line1Element, line2Element, line3Element], {
                clearProps: 'all',
            })
            return
        }

        gsap.set(overlayElement, {
            display: 'none',
            pointerEvents: 'none',
            opacity: 1,
        })

        const menuLinkWrappers = Array.from(
            linksElement.querySelectorAll('.menu-link-wrap')
        )

        const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: 'power3.out' },
            onStart: () => {
                gsap.set(overlayElement, {
                    display: 'flex',
                    pointerEvents: 'auto',
                })
            },
            onReverseComplete: () => {
                gsap.set(overlayElement, {
                    display: 'none',
                    pointerEvents: 'none',
                })
            },
        })

        timeline.fromTo(
            overlayElement,
            {
                clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
                opacity: 1,
            },
            {
                clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
                duration: 0.7,
                ease: 'power3.inOut',
            },
            0
        )

        timeline.fromTo(
            scanElement,
            {
                scaleX: 0,
                transformOrigin: 'left center',
                opacity: 1,
            },
            {
                scaleX: 1,
                duration: 0.55,
                ease: 'power2.inOut',
            },
            0.15
        )

        timeline.to([line1Element, line3Element], { width: '100%', duration: 0.2 }, 0)
        timeline.to(line2Element, { scaleX: 0, duration: 0.15 }, 0)
        timeline.to(
            line1Element,
            { rotate: 45, y: 8, duration: 0.3, ease: 'back.out(1.5)' },
            0.15
        )
        timeline.to(
            line3Element,
            { rotate: -45, y: -8, duration: 0.3, ease: 'back.out(1.5)' },
            0.15
        )

        gsap.set(menuLinkWrappers, {
            y: 80,
            opacity: 0,
            skewY: 4,
        })

        timeline.to(
            menuLinkWrappers,
            {
                y: 0,
                opacity: 1,
                skewY: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: 'power3.out',
            },
            0.3
        )

        gsap.set(bottomElement, {
            opacity: 0,
            y: 16,
        })

        timeline.to(
            bottomElement,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
            },
            0.55
        )

        timelineRef.current = timeline

        return () => {
            timeline.kill()
            timelineRef.current = null
        }
    }, [
        overlayRef,
        scanRef,
        linksRef,
        bottomRef,
        line1Ref,
        line2Ref,
        line3Ref,
        prefersReducedMotion,
        isMenuOpen,
    ])

    useEffect(() => {
        const timeline = timelineRef.current

        if (prefersReducedMotion) {
            document.body.style.overflow = isMenuOpen ? 'hidden' : ''
            return () => {
                document.body.style.overflow = ''
            }
        }

        if (!timeline) return

        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            timeline.timeScale(1).play(0)
        } else {
            document.body.style.overflow = ''
            timeline.timeScale(1.4).reverse()
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isMenuOpen, prefersReducedMotion])
}