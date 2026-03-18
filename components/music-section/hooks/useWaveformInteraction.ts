'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { MUSIC_REST_HEIGHTS } from '@/components/music-section/constants'

type UseWaveformInteractionParams = {
    waveRef: React.RefObject<HTMLDivElement | null>
    barRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export function useWaveformInteraction({
                                           waveRef,
                                           barRefs,
                                       }: UseWaveformInteractionParams) {
    useEffect(() => {
        const waveElement = waveRef.current
        if (!waveElement) return

        let animationFrameId = 0
        let mouseX = -9999
        let mouseY = -9999

        const handleMouseMove = (event: MouseEvent) => {
            const rect = waveElement.getBoundingClientRect()
            mouseX = event.clientX - rect.left
            mouseY = event.clientY - rect.top
        }

        const handleMouseLeave = () => {
            mouseX = -9999
            mouseY = -9999
        }

        waveElement.addEventListener('mousemove', handleMouseMove)
        waveElement.addEventListener('mouseleave', handleMouseLeave)

        const radius = 140
        const strength = 1.8

        const tick = () => {
            barRefs.current.forEach((bar, index) => {
                if (!bar) return

                const waveRect = waveElement.getBoundingClientRect()
                const barRect = bar.getBoundingClientRect()

                const barX = barRect.left - waveRect.left + barRect.width / 2
                const barY = barRect.bottom - waveRect.top

                const pull =
                    Math.max(0, 1 - Math.hypot(mouseX - barX, mouseY - barY) / radius) ** 2 *
                    strength

                gsap.to(bar, {
                    scaleY: Math.min(1, MUSIC_REST_HEIGHTS[index] + pull),
                    duration: 0.25,
                    ease: 'power2.out',
                    overwrite: 'auto',
                    transformOrigin: 'bottom center',
                })
            })

            animationFrameId = requestAnimationFrame(tick)
        }

        animationFrameId = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(animationFrameId)
            waveElement.removeEventListener('mousemove', handleMouseMove)
            waveElement.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [waveRef, barRefs])
}