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

        const barStates: Array<{
            centerX: number
            centerY: number
            setScale: ((value: number) => void) | null
        }> = []

        const recomputeGeometry = () => {
            const waveRect = waveElement.getBoundingClientRect()

            barStates.length = 0
            barRefs.current.forEach((bar, index) => {
                if (!bar) return

                const centerX = bar.offsetLeft + bar.offsetWidth / 2
                const centerY = bar.offsetTop + bar.offsetHeight

                barStates[index] = {
                    centerX,
                    centerY,
                    setScale: gsap.quickTo(bar, 'scaleY', {
                        duration: 0.25,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    }),
                }
            })

            return waveRect
        }

        let cachedWaveRect = recomputeGeometry()

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = event.clientX - cachedWaveRect.left
            mouseY = event.clientY - cachedWaveRect.top
        }

        const handleMouseLeave = () => {
            mouseX = -9999
            mouseY = -9999
        }

        const handleResize = () => {
            cachedWaveRect = recomputeGeometry()
        }

        waveElement.addEventListener('mousemove', handleMouseMove)
        waveElement.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', handleResize)

        const resizeObserver = new ResizeObserver(() => {
            handleResize()
        })
        resizeObserver.observe(waveElement)

        const radius = 140
        const strength = 1.8

        const tick = () => {
            barStates.forEach((state, index) => {
                if (!state?.setScale) return

                const pull =
                    Math.max(0, 1 - Math.hypot(mouseX - state.centerX, mouseY - state.centerY) / radius) ** 2 *
                    strength

                state.setScale(Math.min(1, MUSIC_REST_HEIGHTS[index] + pull))
            })

            animationFrameId = requestAnimationFrame(tick)
        }

        animationFrameId = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(animationFrameId)
            waveElement.removeEventListener('mousemove', handleMouseMove)
            waveElement.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('resize', handleResize)
            resizeObserver.disconnect()
        }
    }, [waveRef, barRefs])
}