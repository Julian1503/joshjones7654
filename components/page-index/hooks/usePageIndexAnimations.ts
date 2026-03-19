'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type UsePageIndexAnimationsParams = {
    cardsRef: React.RefObject<HTMLDivElement | null>
}

export function usePageIndexAnimations({
                                           cardsRef,
                                       }: UsePageIndexAnimationsParams) {
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const cards = cardsRef.current
            ? Array.from(cardsRef.current.querySelectorAll('.index-card'))
            : []

        if (cards.length === 0) return

        if (prefersReducedMotion) {
            gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' })
            return
        }

        gsap.set(cards, { opacity: 0, y: 24 })
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.66,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
        })
    }, [cardsRef, prefersReducedMotion])
}