'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { SOCIAL_LINKS } from '@/lib/navigation/site-navigation'
import ActionButton from "@/components/footer/components/ActionButton";
import PaypalSvg from "@/components/footer/components/PaypalSvg";
import YouTubeSvg from "@/components/footer/components/YoutubeSvg";

export function SubscribeButton({ isMobile }: { isMobile: boolean }) {
    return (
        <div style={{ position: 'relative', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? '100%' : 'auto',
                    rowGap: '1em'
            }}
            >
                <ActionButton
                    href={SOCIAL_LINKS.youtubeJoshua.href}
                    label="Subscribe on YouTube"
                    ariaLabel="Subscribe to Joshua on YouTube (opens in a new tab)"
                    isMobile={isMobile}
                    variant="youtube"
                    icon={
                        <YouTubeSvg width={20} height={14} />
                    }
                />

                <ActionButton
                    href="https://www.paypal.com/donate?hosted_button_id=LU5JV4MX2S746"
                    label="Donate with PayPal"
                    ariaLabel="Donate with PayPal"
                    isMobile={isMobile}
                    variant="paypal"
                    icon={
                        <PaypalSvg width={20} height={14} />
                    }
                />
            </div>
        </div>
    )
}