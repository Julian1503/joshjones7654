'use client'

import { useEffect, useState } from 'react'

type UseSiteMenuVisibilityParams = {
    buttonRef: React.RefObject<HTMLButtonElement | null>
}

export function useSiteMenuVisibility({
                                          buttonRef,
                                      }: UseSiteMenuVisibilityParams) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        let frameId = 0

        const updateVisibility = () => {
            const blockingSections = document.querySelectorAll('[data-site-menu="false"]')

            if (blockingSections.length === 0) {
                setIsVisible(window.scrollY > window.innerHeight * 0.9)
                return
            }

            const buttonRect = buttonRef.current?.getBoundingClientRect()

            const probeX = buttonRect
                ? buttonRect.left + buttonRect.width / 2
                : window.innerWidth - 40

            const probeY = buttonRect
                ? buttonRect.top + buttonRect.height / 2
                : 40

            const stack = document.elementsFromPoint(probeX, probeY)

            const isBlocked = stack.some((element) => {
                return element instanceof HTMLElement && !!element.closest('[data-site-menu="false"]')
            })

            setIsVisible(!isBlocked)
        }

        const scheduleVisibilityCheck = () => {
            cancelAnimationFrame(frameId)
            frameId = requestAnimationFrame(updateVisibility)
        }

        scheduleVisibilityCheck()

        window.addEventListener('scroll', updateVisibility, { passive: true })
        window.addEventListener('resize', scheduleVisibilityCheck)
        window.addEventListener('load', scheduleVisibilityCheck)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener('scroll', updateVisibility)
            window.removeEventListener('resize', scheduleVisibilityCheck)
            window.removeEventListener('load', scheduleVisibilityCheck)
        }
    }, [buttonRef])

    return { isVisible }
}