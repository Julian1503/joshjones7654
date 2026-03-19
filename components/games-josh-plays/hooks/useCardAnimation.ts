'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { GAMES_SECTION_COLORS } from '@/components/games-josh-plays/constants'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type CardAnimationHandlers = {
    onMouseEnter: () => void
    onMouseLeave: () => void
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => void
}

export function useCardAnimation() {
    const cardRef = useRef<HTMLElement>(null)
    const shimmerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    const onMouseEnter = () => {
        if (prefersReducedMotion) return

        gsap.to(cardRef.current, {
            y: -4,
            scale: 1.008,
            borderColor: 'rgba(255,69,69,0.45)',
            boxShadow: '0 16px 34px rgba(0,0,0,0.45), 0 0 24px rgba(255,69,69,0.11)',
            duration: 0.24,
            ease: 'power2.out',
        })
        gsap.to(shimmerRef.current, { opacity: 1, duration: 0.22, ease: 'power2.out' })
        gsap.to(contentRef.current, { y: -2, duration: 0.24, ease: 'power2.out' })
    }

    const onMouseLeave = () => {
        if (prefersReducedMotion) return

        gsap.to(cardRef.current, {
            y: 0,
            scale: 1,
            borderColor: GAMES_SECTION_COLORS.border,
            boxShadow: 'none',
            duration: 0.26,
            ease: 'power2.out',
        })
        gsap.to(shimmerRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
        gsap.to(contentRef.current, { y: 0, duration: 0.22, ease: 'power2.out' })
    }

    const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        if (prefersReducedMotion || !cardRef.current || !shimmerRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        shimmerRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,69,69,0.16) 0%, transparent 62%)`
    }

    const handlers: CardAnimationHandlers = { onMouseEnter, onMouseLeave, onMouseMove }

    return {
        cardRef,
        shimmerRef,
        contentRef,
        handlers,
    }
}
