import { NextResponse } from 'next/server'

const BANDLAB_USER_ID = '62a08e0b-bdca-4979-afd5-5272be187725'
export const revalidate = 120

type BandLabTrackSample = {
    duration?: number
    audioUrl?: string
    waveformUrl?: string
}

type BandLabTrackData = {
    name?: string
    picture?: { url?: string }
    sample?: BandLabTrackSample
}

type BandLabTrackPost = {
    id: string
    revisionId?: string
    track?: BandLabTrackData
    counters?: { plays?: number; likes?: number }
    createdOn?: string
}

type BandLabApiResponse = {
    data?: BandLabTrackPost[]
    paging?: unknown
}

export async function GET() {
    try {
        const url = `https://www.bandlab.com/api/v1.3/users/${BANDLAB_USER_ID}/track-posts?limit=20`

        const res = await fetch(url, {
            headers: {
                Accept: 'application/json',
                Origin: 'https://www.bandlab.com',
                Referer: 'https://www.bandlab.com/joshua_jones_29',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
            },
            next: { revalidate: 300 },
        })

        if (!res.ok) {
            const text = await res.text()
            return NextResponse.json(
                { error: `BandLab responded with ${res.status}`, details: text },
                { status: res.status }
            )
        }

        const data: BandLabApiResponse = await res.json()

        const tracks = (data?.data ?? []).map((post: BandLabTrackPost) => {
            const sample = post?.track?.sample
            const seconds = Math.round(sample?.duration ?? 0)
            const mins = Math.floor(seconds / 60)
            const secs = String(seconds % 60).padStart(2, '0')

            return {
                postId: post.id,
                embedId: post.revisionId ?? post.id,
                revisionId: post.revisionId ?? null,
                title: post?.track?.name ?? 'Untitled',
                duration: `${mins}:${secs}`,
                plays: post?.counters?.plays ?? 0,
                likes: post?.counters?.likes ?? 0,
                cover: post?.track?.picture?.url ?? null,
                createdOn: post?.createdOn ?? null,
                audioUrl: sample?.audioUrl ?? null,
                waveformUrl: sample?.waveformUrl ?? null,
            }
        })

        return NextResponse.json(
            { tracks, paging: data?.paging ?? null },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
                },
            }
        )
    } catch (error) {
        console.error('[BandLab API]', error)
        return NextResponse.json(
            { error: 'Failed to fetch BandLab tracks' },
            { status: 500 }
        )
    }
}