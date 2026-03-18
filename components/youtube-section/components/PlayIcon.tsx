'use client'

export function PlayIcon({ size = 48 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
            <circle
                cx="24"
                cy="24"
                r="23"
                stroke="white"
                strokeOpacity="0.6"
                strokeWidth="1"
                strokeDasharray="144"
                strokeDashoffset="36"
            />
            <path d="M20 16L34 24L20 32V16Z" fill="white" />
        </svg>
    )
}