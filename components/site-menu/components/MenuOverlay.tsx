'use client'

import { SITE_MENU_COLORS } from '../constants'
import type { SiteMenuNavItem, SiteMenuSocialItem } from '../types'
import { MenuLink } from './MenuLink'
import { SocialLink } from './SocialLink'

type MenuOverlayProps = {
    overlayRef: React.RefObject<HTMLDivElement | null>
    scanRef: React.RefObject<HTMLDivElement | null>
    linksRef: React.RefObject<HTMLDivElement | null>
    bottomRef: React.RefObject<HTMLDivElement | null>
    navItems: SiteMenuNavItem[]
    socialLinks: SiteMenuSocialItem[]
    onCloseAction: () => void
    isOpen: boolean
    overlayId: string
    isMobile: boolean
}

export function MenuOverlay({
                                overlayRef,
                                scanRef,
                                linksRef,
                                bottomRef,
                                navItems,
                                socialLinks,
                                onCloseAction,
                                isOpen,
                                overlayId,
                                isMobile,
                            }: MenuOverlayProps) {
    return (
        <div
            id={overlayId}
            ref={overlayRef}
            role='dialog'
            aria-modal='true'
            aria-label='Site menu'
            aria-hidden={!isOpen}
            tabIndex={-1}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onCloseAction()
                }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 900,
                background: SITE_MENU_COLORS.background,
                clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.028,
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: isMobile ? '80vw' : '55vw',
                    height: isMobile ? '80vw' : '55vw',
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(180,0,0,0.16) 0%, transparent 68%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                }}
            />

            <div
                ref={scanRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                        'linear-gradient(90deg, transparent, #cc0000 25%, #ff4545 50%, #cc0000 75%, transparent)',
                    boxShadow: '0 0 24px rgba(255,45,45,0.6)',
                    opacity: 0,
                }}
            />

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(1.4rem, 3vh, 2.2rem) clamp(1.4rem, 4vw, 3rem)',
                    flexShrink: 0,
                }}
            >
        <span
            style={{
                fontFamily: 'monospace',
                fontSize: '0.52rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.18)',
            }}
        >
          Navigation
        </span>
            </div>

            <nav
                aria-label='Site menu links'
                ref={linksRef}
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 'clamp(1rem, 3vh, 2rem) clamp(1.4rem, 4vw, 3rem)',
                    gap: 0,
                    overflow: 'hidden',
                }}
            >
                {navItems.map((item, index) => (
                    <MenuLink
                        key={item.href}
                        item={item}
                        onClickAction={onCloseAction}
                        isLast={index === navItems.length - 1}
                        isMobile={isMobile}
                    />
                ))}
            </nav>

            <div
                ref={bottomRef}
                style={{
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    padding: 'clamp(1rem, 2vh, 1.6rem) clamp(1.4rem, 4vw, 3rem)',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: 'clamp(1rem, 3vw, 2rem)',
                        flexWrap: 'wrap',
                    }}
                >
                    {socialLinks.map((socialLink) => (
                        <SocialLink
                            key={socialLink.href}
                            label={socialLink.label}
                            href={socialLink.href}
                        />
                    ))}
                </div>

                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '0.48rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.12)',
                    }}
                >
          Toowoomba, AU
        </span>
            </div>
        </div>
    )
}