'use client'

import { useEffect, useRef } from 'react'
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

    const rectRef = useRef<DOMRect | null>(null)
    const pointerRef = useRef({ x: 0, y: 0 })
    const rafIdRef = useRef<number | null>(null)

    const updateShimmer = () => {
        rafIdRef.current = null
        if (!rectRef.current || !shimmerRef.current) return

        const x = ((pointerRef.current.x - rectRef.current.left) / rectRef.current.width) * 100
        const y = ((pointerRef.current.y - rectRef.current.top) / rectRef.current.height) * 100

        shimmerRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,69,69,0.16) 0%, transparent 62%)`
    }

    const ensureRect = () => {
        if (!cardRef.current) return
        rectRef.current = cardRef.current.getBoundingClientRect()
    }

    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current)
            }
        }
    }, [])

    const onMouseEnter = () => {
        if (prefersReducedMotion) return

        ensureRect()

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

        rectRef.current = null
        if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current)
            rafIdRef.current = null
        }

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

        if (!rectRef.current) {
            ensureRect()
        }

        pointerRef.current.x = event.clientX
        pointerRef.current.y = event.clientY

        if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(updateShimmer)
        }
    }

    const handlers: CardAnimationHandlers = { onMouseEnter, onMouseLeave, onMouseMove }

    return {
        cardRef,
        shimmerRef,
        contentRef,
        handlers,
    }
}
