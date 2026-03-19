'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { JoshGame } from '@/components/games-josh-plays/types'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const PAGE_SIZE = 6

export function useGridAnimation(games: JoshGame[], visibleCount: number) {
    const gridRef = useRef<HTMLDivElement>(null)
    // Tracks the visibleCount from the previous render so we know which
    // cards are brand-new and should animate in.
    const prevVisibleCountRef = useRef(0)

    useEffect(() => {
        if (!gridRef.current) return

        const allCards = gridRef.current.querySelectorAll<HTMLElement>('[data-game-card]')
        const prevCount = prevVisibleCountRef.current
        prevVisibleCountRef.current = visibleCount

        // Slice to only the cards that were just added
        const newCards = Array.from(allCards).slice(prevCount, visibleCount)
        if (newCards.length === 0) return

        const ctx = gsap.context(() => {
            const isInitialLoad = prevCount === 0

            gsap.fromTo(
                newCards,
                { opacity: 0, y: 48, scale: 0.94, filter: 'blur(6px)' },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.65,
                    ease: 'power3.out',
                    stagger: { amount: isInitialLoad ? 0.45 : 0.3, from: 'start' },
                    // First load: wait for scroll trigger. Load-more: animate immediately.
                    ...(isInitialLoad
                        ? {
                            scrollTrigger: {
                                trigger: gridRef.current,
                                start: 'top 85%',
                                once: true,
                            },
                        }
                        : { delay: 0.05 }),
                }
            )
        }, gridRef)

        return () => ctx.revert()
        // visibleCount drives which cards to animate — games list identity matters too
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visibleCount, games])

    return { gridRef }
}

export { PAGE_SIZE }