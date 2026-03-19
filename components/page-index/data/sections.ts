import type { PageIndexSectionItem } from '@/components/page-index/types'
import { SECTION_ANCHORS } from '@/lib/navigation/site-navigation'

export const PAGE_INDEX_SECTIONS: PageIndexSectionItem[] = [
    {
        id: 'story',
        index: '01',
        label: 'JOSHUA',
        sublabel: 'Creative Journey',
        description:
            'Get to know Joshua through his personality, interests, and the creative world he is building.',
        cta: 'Meet Joshua',
        href: SECTION_ANCHORS.about,
        image: '/thebetterday.png',
    },
    {
        id: 'videos',
        index: '02',
        label: 'VIDEOS',
        sublabel: 'Latest Content',
        description:
            'Watch Joshua’s latest videos, from gaming moments to reactions and personal highlights.',
        cta: 'Watch videos',
        href: SECTION_ANCHORS.videos,
        image: '/youtube.png',
    },
    {
        id: 'gaming',
        index: '03',
        label: 'GAMING',
        sublabel: 'What He Plays',
        description:
            'Explore the games, setups, and digital worlds that keep Joshua inspired and engaged.',
        cta: 'See his games',
        href: SECTION_ANCHORS.gaming,
        image: '/aboutme.png',
    },
    {
        id: 'music',
        index: '04',
        label: 'MUSIC',
        sublabel: 'What He Creates',
        description:
            'From BandLab sessions to original ideas, this is where Joshua turns creativity into sound.',
        cta: 'Explore music',
        href: SECTION_ANCHORS.music,
        image: '/studio.png',
    },
    {
        id: 'tbd',
        index: '05',
        label: 'THE BETTER DAY',
        sublabel: 'Support Around Him',
        description:
            'See the people and support system helping Joshua keep growing, creating, and moving forward.',
        cta: 'See the support',
        href: SECTION_ANCHORS.theBetterDay,
        image: '/community.png',
    },
]