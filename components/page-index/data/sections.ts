import type { PageIndexSectionItem } from '@/components/page-index/types'
import { SECTION_ANCHORS } from '@/lib/navigation/site-navigation'

export const PAGE_INDEX_SECTIONS: PageIndexSectionItem[] = [
    {
        id: 'story',
        index: '01',
        label: 'JOSHUA',
        sublabel: 'His Story',
        description:
            'A kid with a disability who proves every day that limits are just the beginning.',
        cta: 'Read his story',
        href: SECTION_ANCHORS.about,
        image: '/thebetterday.png',
    },
    {
        id: 'videos',
        index: '02',
        label: 'VIDEOS',
        sublabel: 'Latest Content',
        description:
            'Watch what Joshua has been up to, reactions, gaming, and real moments.',
        cta: 'Watch now',
        href: SECTION_ANCHORS.videos,
        image: '/youtube.png',
    },
    {
        id: 'gaming',
        index: '03',
        label: 'GAMING',
        sublabel: 'What He Plays',
        description:
            'From PS5 sessions to gaming setups, this is Joshua in his element.',
        cta: 'See games',
        href: SECTION_ANCHORS.gaming,
        image: '/aboutme.png',
    },
    {
        id: 'music',
        index: '04',
        label: 'MUSIC',
        sublabel: 'What He Creates',
        description:
            'From BandLab sessions to original ideas, this is where Joshua turns emotion into sound.',
        cta: 'Explore music',
        href: SECTION_ANCHORS.music,
        image: '/studio.png',
    },
    {
        id: 'tbd',
        index: '05',
        label: 'THE BETTER DAY',
        sublabel: 'Who We Are',
        description:
            'The team behind Joshua, how we show up for him every single day.',
        cta: 'About us',
        href: SECTION_ANCHORS.theBetterDay,
        image: '/community.png',
    },
]