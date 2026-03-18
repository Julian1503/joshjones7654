import type { SocialItem } from '@/components/floating-socials/types'
import { SOCIAL_LINKS } from '@/lib/navigation/site-navigation'

export const FLOATING_SOCIALS: SocialItem[] = [
    {
        id: 'youtube',
        label: SOCIAL_LINKS.youtubeJoshua.label,
        href: SOCIAL_LINKS.youtubeJoshua.href,
        color: '#ff4545',
        borderColor: 'rgba(255,69,69,0.45)',
        icon: (
            <svg width="16" height="12" viewBox="0 0 16 11" fill="none">
                <rect width="16" height="11" rx="2.5" fill="currentColor" />
                <path d="M6.5 7.8V3.2L10.8 5.5L6.5 7.8Z" fill="white" />
            </svg>
        ),
    },
    {
        id: 'facebook',
        label: SOCIAL_LINKS.facebookJoshua.label,
        href: SOCIAL_LINKS.facebookJoshua.href,
        color: '#1877f2',
        borderColor: 'rgba(24,119,242,0.45)',
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="3" fill="currentColor" />
                <path
                    d="M8.9 13V8.8H10.3L10.5 7.2H8.9V6.2C8.9 5.74 9.03 5.42 9.69 5.42H10.56V4C10.41 3.98 9.91 3.94 9.33 3.94C8.11 3.94 7.28 4.69 7.28 6.07V7.2H5.9V8.8H7.28V13H8.9Z"
                    fill="white"
                />
            </svg>
        ),
    },
]