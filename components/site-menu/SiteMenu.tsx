'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { SITE_MENU_NAV_ITEMS, SITE_MENU_SOCIAL_LINKS } from '@/components/site-menu/data/menuItems'
import { useSiteMenuVisibility } from '@/components/site-menu/hooks/useSiteMenuVisibility'
import { useSiteMenuAnimations } from '@/components/site-menu/hooks/useSiteMenuAnimations'
import { FloatingMenuButton } from '@/components/site-menu/components/FloatingMenuButton'
import { MenuOverlay } from '@/components/site-menu/components/MenuOverlay'

const SITE_MENU_OVERLAY_ID = 'site-menu-overlay'

export function SiteMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const buttonRef = useRef<HTMLButtonElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const scanRef = useRef<HTMLDivElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const line1Ref = useRef<HTMLSpanElement>(null)
    const line2Ref = useRef<HTMLSpanElement>(null)
    const line3Ref = useRef<HTMLSpanElement>(null)
    const previousFocusedElementRef = useRef<HTMLElement | null>(null)

    const { isMobile } = useResponsiveSection()
    const { isVisible } = useSiteMenuVisibility({ buttonRef })

    useSiteMenuAnimations({
        buttonRef,
        overlayRef,
        scanRef,
        linksRef,
        bottomRef,
        line1Ref,
        line2Ref,
        line3Ref,
        isButtonVisible: isVisible,
        isMenuOpen,
    })

    const openMenu = useCallback(() => {
        setIsMenuOpen(true)
    }, [])

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((previous) => !previous)
    }, [])

    useEffect(() => {
        const overlayElement = overlayRef.current
        const buttonElement = buttonRef.current

        if (!overlayElement || !buttonElement) return

        if (isMenuOpen) {
            previousFocusedElementRef.current = document.activeElement as HTMLElement | null

            requestAnimationFrame(() => {
                const firstFocusableElement = overlayElement.querySelector<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )

                firstFocusableElement?.focus() ?? overlayElement.focus()
            })

            return
        }

        previousFocusedElementRef.current?.focus?.() ?? buttonElement.focus()
    }, [isMenuOpen])

    useEffect(() => {
        const overlayElement = overlayRef.current
        if (!isMenuOpen || !overlayElement) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                closeMenu()
                return
            }

            if (event.key !== 'Tab') return

            const focusableElements = Array.from(
                overlayElement.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter(
                (element) =>
                    !element.hasAttribute('disabled') &&
                    element.getAttribute('aria-hidden') !== 'true'
            )

            if (focusableElements.length === 0) {
                event.preventDefault()
                overlayElement.focus()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            const activeElement = document.activeElement as HTMLElement | null

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
                return
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isMenuOpen, closeMenu])

    useEffect(() => {
        if (isVisible) return
        if (!isMenuOpen) return

        closeMenu()
    }, [isVisible, isMenuOpen, closeMenu])

    return (
        <>
            <MenuOverlay
                overlayRef={overlayRef}
                scanRef={scanRef}
                linksRef={linksRef}
                bottomRef={bottomRef}
                navItems={SITE_MENU_NAV_ITEMS}
                socialLinks={SITE_MENU_SOCIAL_LINKS}
                onCloseAction={closeMenu}
                isOpen={isMenuOpen}
                overlayId={SITE_MENU_OVERLAY_ID}
                isMobile={isMobile}
            />

            <FloatingMenuButton
                buttonRef={buttonRef}
                line1Ref={line1Ref}
                line2Ref={line2Ref}
                line3Ref={line3Ref}
                isMenuOpen={isMenuOpen}
                isVisible={isVisible}
                onToggleAction={toggleMenu}
                controlsId={SITE_MENU_OVERLAY_ID}
            />
        </>
    )
}