import type { FooterNavGroup } from '@/components/footer/types'

export const FOOTER_NAV_GROUPS: FooterNavGroup[] = [
    {
        group: 'Joshua',
        links: [
            { label: 'His Story', href: '#about-me' },
            { label: 'Gaming', href: '#gaming' },
            { label: 'Videos', href: '#videos' },
        ],
    },
    {
        group: 'The Better Day',
        links: [
            { label: 'Who We Are', href: 'https://thebetterday.com.au/about-us/', external: true },
            { label: 'How We Take Care', href: 'https://thebetterday.com.au/about-us/', external: true },
            { label: 'Get in Touch', href: 'https://thebetterday.com.au/contact-us/', external: true },
        ],
    },
    {
        group: 'Follow',
        links: [
            {
                label: 'Facebook',
                href: 'https://www.facebook.com/profile.php?id=100090472671177',
                external: true,
            },
            {
                label: 'Youtube',
                href: 'https://www.youtube.com/@TheBetterDayToowoomba/videos',
                external: true,
            },
            {
                label: 'Instagram',
                href: 'https://www.instagram.com/thebetterday_toowoomba/',
                external: true,
            },
        ],
    },
]