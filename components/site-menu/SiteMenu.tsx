'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useResponsiveSection } from '@/hooks/useResponsiveSection'
import { SITE_MENU_NAV_ITEMS, SITE_MENU_SOCIAL_LINKS } from './data/menuItems'
import { useSiteMenuVisibility } from './hooks/useSiteMenuVisibility'
import { useSiteMenuAnimations } from './hooks/useSiteMenuAnimations'
import { FloatingMenuButton } from './components/FloatingMenuButton'
import { MenuOverlay } from './components/MenuOverlay'

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

    const { isVisible } = useSiteMenuVisibility()
    const { isMobile } = useResponsiveSection()

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

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((previous) => !previous)
    }, [])

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMenuOpen) {
                closeMenu()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isMenuOpen, closeMenu])

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
                onToggleAction={toggleMenu}
                controlsId={SITE_MENU_OVERLAY_ID}
            />
        </>
    )
}