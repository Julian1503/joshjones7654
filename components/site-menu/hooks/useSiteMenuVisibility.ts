'use client'

import { useEffect, useState } from 'react'

const PROBE_OFFSET_RIGHT = 40
const PROBE_OFFSET_TOP = 40

export function useSiteMenuVisibility() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        let frameA = 0
        let frameB = 0

        const updateVisibility = () => {
            const blockingSections = document.querySelectorAll('[data-site-menu="false"]')

            if (blockingSections.length === 0) {
                setIsVisible(window.scrollY > window.innerHeight * 0.9)
                return
            }

            const probeX = Math.max(0, window.innerWidth - PROBE_OFFSET_RIGHT)
            const probeY = Math.min(window.innerHeight - 1, PROBE_OFFSET_TOP)

            const stack = document.elementsFromPoint(probeX, probeY)

            const isBlocked = stack.some((element) => {
                return element instanceof HTMLElement && !!element.closest('[data-site-menu="false"]')
            })

            setIsVisible(!isBlocked)
        }

        const scheduleVisibilityCheck = () => {
            updateVisibility()
            frameA = requestAnimationFrame(updateVisibility)
            frameB = requestAnimationFrame(() => {
                requestAnimationFrame(updateVisibility)
            })
        }

        scheduleVisibilityCheck()

        window.addEventListener('scroll', updateVisibility, { passive: true })
        window.addEventListener('resize', scheduleVisibilityCheck)
        window.addEventListener('load', scheduleVisibilityCheck)

        return () => {
            cancelAnimationFrame(frameA)
            cancelAnimationFrame(frameB)
            window.removeEventListener('scroll', updateVisibility)
            window.removeEventListener('resize', scheduleVisibilityCheck)
            window.removeEventListener('load', scheduleVisibilityCheck)
        }
    }, [])

    return { isVisible }
}