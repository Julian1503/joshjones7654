import type { FooterNavGroup } from '@/components/footer/types'
import { SECTION_ANCHORS, SOCIAL_LINKS } from '@/lib/navigation/site-navigation'

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
    {
        group: 'Joshua',
        links: [
            { label: 'His Story', href: SECTION_ANCHORS.about },
            { label: 'Gaming', href: SECTION_ANCHORS.gaming },
            { label: 'Videos', href: SECTION_ANCHORS.videos },
        ],
    },
    {
        group: 'The Better Day',
        links: [
            { label: 'Who We Are', href: 'https://thebetterday.com.au/about-us/', external: true },
            { label: 'How We Take Care', href: SECTION_ANCHORS.theBetterDay },
            { label: 'Get in Touch', href: 'https://thebetterday.com.au/contact-us/', external: true },
        ],
    },
    {
        group: 'Follow',
        links: [
            {
                label: SOCIAL_LINKS.facebookBetterDay.label,
                href: SOCIAL_LINKS.facebookBetterDay.href,
                external: true,
            },
            {
                label: SOCIAL_LINKS.youtubeBetterDay.label,
                href: SOCIAL_LINKS.youtubeBetterDay.href,
                external: true,
            },
            {
                label: SOCIAL_LINKS.instagramBetterDay.label,
                href: SOCIAL_LINKS.instagramBetterDay.href,
                external: true,
            },
        ],
    },
]