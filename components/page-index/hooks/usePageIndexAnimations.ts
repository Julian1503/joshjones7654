'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

type UsePageIndexAnimationsParams = {
    cardsRef: React.RefObject<HTMLDivElement | null>
}

export function usePageIndexAnimations({
                                           cardsRef,
                                       }: UsePageIndexAnimationsParams) {
    useEffect(() => {
        const cards = cardsRef.current
            ? Array.from(cardsRef.current.querySelectorAll('.index-card'))
            : []

        if (cards.length === 0) return

        gsap.set(cards, { opacity: 0, y: 30 })
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power3.out',
        })
    }, [cardsRef])
}