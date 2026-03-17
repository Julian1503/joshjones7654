'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Pillar } from '../types'
import { updateProgressDots } from '../utils/progressTrack'

gsap.registerPlugin(ScrollTrigger)

type UseTheBetterDayAnimationsParams = {
    pillars: readonly Pillar[]
    wrapperRef: React.RefObject<HTMLDivElement | null>
    trackRef: React.RefObject<HTMLDivElement | null>
    fillRef: React.RefObject<HTMLDivElement | null>
    dotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    panelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    bgRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    wordRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    numRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
    labelRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>
    titleRefs: React.MutableRefObject<(HTMLHeadingElement | null)[]>
    bodyRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>
    introRef: React.RefObject<HTMLDivElement | null>
    outroRef: React.RefObject<HTMLDivElement | null>
    ctaRef: React.RefObject<HTMLAnchorElement | null>
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
            const totalUnits = 1 + totalPanels + 1
            const unitFraction = 1 / totalUnits

            const masterTrigger = ScrollTrigger.create({
                trigger: wrapperElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress
                    const trackElement = trackRef.current
                    const fillElement = fillRef.current

                    if (!trackElement || !fillElement) return

                    const trackHeight = trackElement.offsetHeight - 16
                    const pillarProgress = Math.max(
                        0,
                        Math.min(1, (progress - unitFraction) / (unitFraction * totalPanels))
                    )

                    gsap.set(fillElement, { height: pillarProgress * trackHeight })
                },
            })

            ScrollTrigger.create({
                trigger: wrapperElement,
                start: `${unitFraction * 100}% top`,
                end: `${(1 - unitFraction) * 100}% bottom`,
                onEnter: () => gsap.to(trackRef.current, { opacity: 1, duration: 0.5 }),
                onLeave: () => gsap.to(trackRef.current, { opacity: 0, duration: 0.5 }),
                onEnterBack: () => gsap.to(trackRef.current, { opacity: 1, duration: 0.5 }),
                onLeaveBack: () => gsap.to(trackRef.current, { opacity: 0, duration: 0.5 }),
            })

            gsap.fromTo(
                introRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start: 'top 80%',
                        end: 'top 40%',
                        scrub: 1,
                    },
                }
            )

            gsap.to(introRef.current, {
                opacity: 0,
                y: -40,
                scale: 0.97,
                scrollTrigger: {
                    trigger: wrapperElement,
                    start: `${unitFraction * 90}% top`,
                    end: `${unitFraction * 100}% top`,
                    scrub: 1,
                },
            })

            pillars.forEach((_, index) => {
                const panelStart = unitFraction * (1 + index)
                const panelEnd = unitFraction * (2 + index)
                const panelMidpoint = (panelStart + panelEnd) / 2

                gsap.fromTo(
                    panelRefs.current[index],
                    { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${panelStart * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.4) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    bgRefs.current[index],
                    { opacity: 0, scale: 1.08 },
                    {
                        opacity: 1,
                        scale: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${panelStart * 100}% top`,
                            end: `${panelMidpoint * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    wordRefs.current[index],
                    { x: -60, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${panelStart * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.5) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    numRefs.current[index],
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${panelStart * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.35) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    labelRefs.current[index],
                    { y: 20, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${(panelStart + unitFraction * 0.1) * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.45) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    titleRefs.current[index],
                    { y: 36, opacity: 0, filter: 'blur(10px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${(panelStart + unitFraction * 0.15) * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.55) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.fromTo(
                    bodyRefs.current[index],
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: wrapperElement,
                            start: `${(panelStart + unitFraction * 0.25) * 100}% top`,
                            end: `${(panelStart + unitFraction * 0.65) * 100}% top`,
                            scrub: 1,
                        },
                    }
                )

                gsap.to(panelRefs.current[index], {
                    y: -60,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start: `${(panelEnd - unitFraction * 0.15) * 100}% top`,
                        end: `${panelEnd * 100}% top`,
                        scrub: 1,
                    },
                })

                ScrollTrigger.create({
                    trigger: wrapperElement,
                    start: `${panelStart * 100}% top`,
                    end: `${panelEnd * 100}% top`,
                    onEnter: () =>
                        updateProgressDots(dotRefs.current, fillRef.current, pillars, index),
                    onEnterBack: () =>
                        updateProgressDots(dotRefs.current, fillRef.current, pillars, index),
                })
            })

            const outroStart = 1 - unitFraction

            gsap.fromTo(
                outroRef.current,
                { opacity: 0, y: 50, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start: `${outroStart * 100}% top`,
                        end: `${(outroStart + unitFraction * 0.6) * 100}% top`,
                        scrub: 1,
                    },
                }
            )

            gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: wrapperElement,
                        start: `${(outroStart + unitFraction * 0.3) * 100}% top`,
                        end: `${(outroStart + unitFraction * 0.7) * 100}% top`,
                        scrub: 1,
                    },
                }
            )

            return () => {
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