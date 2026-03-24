'use client'

import { useEffect, useState } from 'react'

export function useFloatingSocialsVisibility() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const blockedSections = Array.from(
            document.querySelectorAll<HTMLElement>('[data-floating-social="false"]')
        )

        if (blockedSections.length === 0) {
            return
        }

        const activeBlocked = new Set<Element>()
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeBlocked.add(entry.target)
                    } else {
                        activeBlocked.delete(entry.target)
                    }
                }

                setIsVisible(activeBlocked.size === 0)
            },
            {
                root: null,
                // Create a 1px horizontal probe around viewport center.
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0,
            }
        )

        blockedSections.forEach((section) => observer.observe(section))

        return () => {
            observer.disconnect()
        }
    }, [])

    return {
        isVisible,
    }
}