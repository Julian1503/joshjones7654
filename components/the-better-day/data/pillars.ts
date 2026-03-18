import type { Pillar } from '@/components/the-better-day/types'

export const PILLARS: readonly Pillar[] = [
    {
        index: '01',
        color: '#72c44a',
        colorDim: 'rgba(114,196,74,0.08)',
        label: 'Structure',
        title: 'A day with shape',
        body: 'The Better Day support workers help Joshua build routines — schedules, meals, activities. Small anchors that turn internal chaos into something navigable.',
        word: 'ROUTINE',
    },
    {
        index: '02',
        color: '#4a9fd4',
        colorDim: 'rgba(74,159,212,0.08)',
        label: 'Connection',
        title: 'Not being alone anymore',
        body: 'Their workers are present in the hard moments and in everyday life. Not as a service — as people who genuinely understand and support him.',
        word: 'PRESENCE',
    },
    {
        index: '03',
        color: '#f0a030',
        colorDim: 'rgba(240,160,48,0.08)',
        label: 'Health',
        title: 'What used to feel overwhelming',
        body: 'Medication, appointments, follow-up. With schizophrenia, these things can take over an entire day. The Better Day makes them manageable, so Joshua does not carry everything alone.',
        word: 'CARE',
    },
    {
        index: '04',
        color: '#e8704a',
        colorDim: 'rgba(232,112,74,0.08)',
        label: 'Purpose',
        title: 'Gaming and creating are not extras',
        body: 'The team understands that the PS5, the YouTube channel, and creativity are not distractions. They are at the core of Joshua’s identity, and they support them as part of his care.',
        word: 'IDENTITY',
    },
    {
        index: '05',
        color: '#a87fd4',
        colorDim: 'rgba(168,127,212,0.08)',
        label: 'Emotion',
        title: 'Being seen as a whole person',
        body: 'Having people who listen without judgement, who know your story, and who stand by your side without making you feel diminished. That is what changes everything.',
        word: 'DIGNITY',
    },
] as const