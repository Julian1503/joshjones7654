'use client'

export function YouTubeIcon({ size = 40 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.707} viewBox="0 0 40 28" fill="none">
            <rect width="40" height="28" rx="6" fill="#FF0000" />
            <path d="M16 20V8L28 14L16 20Z" fill="white" />
        </svg>
    )
}