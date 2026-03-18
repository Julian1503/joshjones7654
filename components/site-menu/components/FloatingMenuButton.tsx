'use client'

import { SITE_MENU_BUTTON_SIZE, SITE_MENU_COLORS } from '@/components/site-menu/constants'

type FloatingMenuButtonProps = {
    buttonRef: React.RefObject<HTMLButtonElement | null>
    line1Ref: React.RefObject<HTMLSpanElement | null>
    line2Ref: React.RefObject<HTMLSpanElement | null>
    line3Ref: React.RefObject<HTMLSpanElement | null>
    isMenuOpen: boolean
    onToggleAction: () => void
    controlsId: string
}

export function FloatingMenuButton({
                                       buttonRef,
                                       line1Ref,
                                       line2Ref,
                                       line3Ref,
                                       isMenuOpen,
                                       onToggleAction,
                                       controlsId,
                                   }: FloatingMenuButtonProps) {
    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={onToggleAction}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls={controlsId}
            style={{
                position: 'fixed',
                top: 'clamp(1rem, 2.5vh, 1.8rem)',
                right: 'clamp(1rem, 2.5vw, 1.8rem)',
                zIndex: 1000,
                width: SITE_MENU_BUTTON_SIZE,
                height: SITE_MENU_BUTTON_SIZE,
                borderRadius: '50%',
                background: SITE_MENU_COLORS.buttonBackground,
                border: `1px solid ${SITE_MENU_COLORS.buttonBorder}`,
                backdropFilter: 'blur(16px)',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                opacity: 0,
                boxShadow:
                    '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = 'rgba(255,69,69,0.4)'
                event.currentTarget.style.boxShadow =
                    '0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(200,0,0,0.2)'
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = SITE_MENU_COLORS.buttonBorder
                event.currentTarget.style.boxShadow =
                    '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)'
            }}
        >
      <span
          ref={line1Ref}
          style={{
              display: 'block',
              width: 20,
              height: 1.5,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 2,
              transformOrigin: 'center',
          }}
      />
            <span
                ref={line2Ref}
                style={{
                    display: 'block',
                    width: 14,
                    height: 1.5,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 2,
                    alignSelf: 'flex-end',
                    marginRight: 14,
                    transformOrigin: 'center',
                }}
            />
            <span
                ref={line3Ref}
                style={{
                    display: 'block',
                    width: 20,
                    height: 1.5,
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 2,
                    transformOrigin: 'center',
                }}
            />
        </button>
    )
}