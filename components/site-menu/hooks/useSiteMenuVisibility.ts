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
        const blockingSections = Array.from(
            document.querySelectorAll<HTMLElement>('[data-site-menu="false"]')
        )

        if (blockingSections.length === 0) {
            const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.9)
            onScroll()
            window.addEventListener('scroll', onScroll, { passive: true })

            return () => {
                window.removeEventListener('scroll', onScroll)
            }
        }

        const activeBlocked = new Set<Element>()

        const computeRootMargin = () => {
            const buttonRect = buttonRef.current?.getBoundingClientRect()
            const probeY = buttonRect ? buttonRect.top + buttonRect.height / 2 : 40
            const topMargin = -Math.max(0, Math.round(probeY))
            const bottomMargin = -Math.max(0, Math.round(window.innerHeight - probeY - 1))
            return `${topMargin}px 0px ${bottomMargin}px 0px`
        }

        let observer = new IntersectionObserver(
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
                threshold: 0,
                rootMargin: computeRootMargin(),
            }
        )

        blockingSections.forEach((section) => observer.observe(section))

        const onResize = () => {
            observer.disconnect()
            activeBlocked.clear()

            observer = new IntersectionObserver(
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
                    threshold: 0,
                    rootMargin: computeRootMargin(),
                }
            )

            blockingSections.forEach((section) => observer.observe(section))
        }

        window.addEventListener('resize', onResize)

        return () => {
            observer.disconnect()
            window.removeEventListener('resize', onResize)
        }
    }, [buttonRef])

    return { isVisible }
}