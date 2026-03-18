'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Pillar } from '@/components/the-better-day/types'
import { updateProgressDots } from '@/components/the-better-day/utils/progressTrack'

gsap.registerPlugin(ScrollTrigger)

type UseTheBetterDayAnimationsParams = {
    pillars: readonly Pillar[]
    wrapperRef:   React.RefObject<HTMLDivElement | null>
    trackRef:     React.RefObject<HTMLDivElement | null>
    fillRef:      React.RefObject<HTMLDivElement | null>
    dotRefs:      React.RefObject<(HTMLDivElement | null)[]>
    panelRefs:    React.RefObject<(HTMLDivElement | null)[]>
    bgRefs:       React.RefObject<(HTMLDivElement | null)[]>
    wordRefs:     React.RefObject<(HTMLDivElement | null)[]>
    numRefs:      React.RefObject<(HTMLDivElement | null)[]>
    labelRefs:    React.RefObject<(HTMLSpanElement | null)[]>
    titleRefs:    React.RefObject<(HTMLHeadingElement | null)[]>
    bodyRefs:     React.RefObject<(HTMLParagraphElement | null)[]>
    introRef:     React.RefObject<HTMLDivElement | null>
    outroRef:     React.RefObject<HTMLDivElement | null>
    ctaRef:       React.RefObject<HTMLAnchorElement | null>
}

export function useTheBetterDayAnimations({
                                              pillars,
                                              wrapperRef,
                                              trackRef,
                                              fillRef,
                                              dotRefs,
                                              panelRefs,
                                              bgRefs,
                                              wordRefs,
                                              numRefs,
                                              labelRefs,
                                              titleRefs,
                                              bodyRefs,
                                              introRef,
                                              outroRef,
                                              ctaRef,
                                          }: UseTheBetterDayAnimationsParams) {
    useEffect(() => {
        const context = gsap.context(() => {
            const wrapperElement = wrapperRef.current
            if (!wrapperElement) return

            const totalPanels = pillars.length
            const totalUnits  = 1 + totalPanels + 2
            const unitFraction = 1 / totalUnits
            gsap.set(introRef.current, { opacity: 0, y: 16, scale: 0.995 })
            gsap.set(outroRef.current, { opacity: 0, y: 50, scale: 0.97  })
            gsap.set(ctaRef.current,   { opacity: 0, y: 30 })

            // Ensure progress track is INVISIBLE until we're actually inside
            gsap.set(trackRef.current, { opacity: 0 })

            panelRefs.current.forEach((panel) => {
                if (!panel) return
                gsap.set(panel, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 })
            })

            /* ── Master scrub trigger ───────────────────────────── */
            const masterTrigger = ScrollTrigger.create({
                trigger: wrapperElement,
                start:   'top top',
                end:     'bottom bottom',
                scrub:   1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress      = self.progress
                    const trackElement  = trackRef.current
                    const fillElement   = fillRef.current
                    if (!trackElement || !fillElement) return

                    const trackHeight   = trackElement.offsetHeight - 16
                    const pillarProgress = Math.max(
                        0,
                        Math.min(
                            1,
                            (progress - unitFraction) / (unitFraction * totalPanels)
                        )
                    )
                    gsap.set(fillElement, { height: pillarProgress * trackHeight })
                },
            })

            ScrollTrigger.create({
                trigger: wrapperElement,
                start:   `${unitFraction * 100}% top`,
                end:     `${(1 - unitFraction) * 100}% top`,
                invalidateOnRefresh: true,
                onEnter:      () => gsap.to(trackRef.current, { opacity: 1, duration: 0.5 }),
                onLeave:      () => gsap.to(trackRef.current, { opacity: 0, duration: 0.5 }),
                onEnterBack:  () => gsap.to(trackRef.current, { opacity: 1, duration: 0.5 }),
                onLeaveBack:  () => gsap.to(trackRef.current, { opacity: 0, duration: 0.5 }),
            })

            /* ── Intro: fade in ─────────────────────────────────── */
            gsap.fromTo(
                introRef.current,
                { opacity: 0, y: 16, scale: 0.995 },
                {
                    opacity: 1, y: 0, scale: 1,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start:   'top 85%',           // FIX: start slightly before wrapper hits top
                        end:     `${(unitFraction * 0.28) * 100}% top`,
                        scrub:   1,
                        invalidateOnRefresh: true,
                    },
                }
            )

            /* ── Intro: fade out ────────────────────────────────── */
            gsap.to(introRef.current, {
                opacity: 0, y: -40, scale: 0.97,
                scrollTrigger: {
                    trigger: wrapperElement,
                    start:   `${(unitFraction * 0.72) * 100}% top`,
                    end:     `${(unitFraction * 1.05) * 100}% top`,
                    scrub:   1,
                    invalidateOnRefresh: true,
                },
            })

            /* ── Pillar panels ──────────────────────────────────── */
            pillars.forEach((_, index) => {
                const panelStart   = unitFraction * (1 + index)
                const panelEnd     = unitFraction * (2 + index)
                const panelMidpoint = (panelStart + panelEnd) / 2

                gsap.fromTo(
                    panelRefs.current[index],
                    { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${panelStart * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.4) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    bgRefs.current[index],
                    { opacity: 0, scale: 1.08 },
                    {
                        opacity: 1, scale: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${panelStart * 100}% top`,
                            end:     `${panelMidpoint * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    wordRefs.current[index],
                    { x: -60, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${panelStart * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.5) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    numRefs.current[index],
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${panelStart * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.35) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    labelRefs.current[index],
                    { y: 20, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0, opacity: 1, filter: 'blur(0px)',
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${(panelStart + unitFraction * 0.10) * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.45) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    titleRefs.current[index],
                    { y: 36, opacity: 0, filter: 'blur(10px)' },
                    {
                        y: 0, opacity: 1, filter: 'blur(0px)',
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${(panelStart + unitFraction * 0.15) * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.55) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.fromTo(
                    bodyRefs.current[index],
                    { y: 24, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start:   `${(panelStart + unitFraction * 0.25) * 100}% top`,
                            end:     `${(panelStart + unitFraction * 0.65) * 100}% top`,
                            scrub:   1,
                            invalidateOnRefresh: true,
                        },
                    }
                )

                gsap.to(panelRefs.current[index], {
                    y: -60, opacity: 0,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start:   `${(panelEnd - unitFraction * 0.15) * 100}% top`,
                        end:     `${panelEnd * 100}% top`,
                        scrub:   1,
                        invalidateOnRefresh: true,
                    },
                })

                ScrollTrigger.create({
                    trigger: wrapperElement,
                    start:   `${panelStart * 100}% top`,
                    end:     `${panelEnd   * 100}% top`,
                    invalidateOnRefresh: true,
                    onEnter:     () => updateProgressDots(dotRefs.current, fillRef.current, pillars, index),
                    onEnterBack: () => updateProgressDots(dotRefs.current, fillRef.current, pillars, index),
                })
            })

            /* ── Outro ──────────────────────────────────────────── */
            const outroStart = 1 - unitFraction * 2

            gsap.fromTo(
                outroRef.current,
                { opacity: 0, y: 50, scale: 0.97 },
                {
                    opacity: 1, y: 0, scale: 1,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start:   `${outroStart * 100}% top`,
                        end:     `${(outroStart + unitFraction * 0.7) * 100}% top`,
                        scrub:   1,
                        invalidateOnRefresh: true,
                    },
                }
            )

            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start:   `${(outroStart + unitFraction * 0.35) * 100}% top`,
                        end:     `${(outroStart + unitFraction * 0.85) * 100}% top`,
                        scrub:   1,
                        invalidateOnRefresh: true,
                    },
                }
            )

            let refreshScheduled = false
            const scheduleRefresh = () => {
                if (refreshScheduled) return
                refreshScheduled = true
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh(true)
                    refreshScheduled = false
                })
            }

            // Watch the whole document for layout changes caused by
            // dynamic content above (YouTube grid, music track list)
            const bodyObserver = new ResizeObserver(scheduleRefresh)
            bodyObserver.observe(document.documentElement)

            // Also do a few guaranteed refreshes in case ResizeObserver
            // misses the initial dynamic content burst
            const t1 = setTimeout(() => ScrollTrigger.refresh(true), 400)
            const t2 = setTimeout(() => ScrollTrigger.refresh(true), 1200)
            const t3 = setTimeout(() => ScrollTrigger.refresh(true), 2500)

            window.addEventListener('resize',            scheduleRefresh, { passive: true })
            window.addEventListener('orientationchange', scheduleRefresh, { passive: true })

            return () => {
                bodyObserver.disconnect()
                clearTimeout(t1)
                clearTimeout(t2)
                clearTimeout(t3)
                window.removeEventListener('resize',            scheduleRefresh)
                window.removeEventListener('orientationchange', scheduleRefresh)
                masterTrigger.kill()
            }
        }, wrapperRef)

        return () => context.revert()
    }, [
        pillars,
        wrapperRef,
        trackRef,
        fillRef,
        dotRefs,
        panelRefs,
        bgRefs,
        wordRefs,
        numRefs,
        labelRefs,
        titleRefs,
        bodyRefs,
        introRef,
        outroRef,
        ctaRef,
    ])
}