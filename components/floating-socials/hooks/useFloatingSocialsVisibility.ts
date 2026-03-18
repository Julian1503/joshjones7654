'use client'

import { useEffect, useState } from 'react'

export function useFloatingSocialsVisibility() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const updateVisibility = () => {
            const blockedSections = Array.from(
                document.querySelectorAll<HTMLElement>('[data-floating-social="false"]')
            )

            const viewportCenterY = window.innerHeight / 2

            const isInsideBlockedSection = blockedSections.some((section) => {
                const rect = section.getBoundingClientRect()
                return rect.top <= viewportCenterY && rect.bottom >= viewportCenterY
            })

            setIsVisible(!isInsideBlockedSection)
        }

        updateVisibility()

        window.addEventListener('scroll', updateVisibility, { passive: true })
        window.addEventListener('resize', updateVisibility)

        return () => {
            window.removeEventListener('scroll', updateVisibility)
            window.removeEventListener('resize', updateVisibility)
        }
    }, [])

    return {
        isVisible,
    }
}