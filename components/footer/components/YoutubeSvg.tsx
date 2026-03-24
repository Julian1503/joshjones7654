import type { SVGProps } from 'react'

type YouTubeSvgProps = SVGProps<SVGSVGElement> & {
    size?: number
}

export default function YouTubeSvg({
                                       size = 18,
                                       width,
                                       height,
                                       ...props
                                   }: YouTubeSvgProps) {
    return (
        <svg
            width={width ?? size}
            height={height ?? Math.round((size * 13) / 18)}
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <rect width="18" height="13" rx="3" fill="#FF0000" />
            <path d="M7.5 9.1V3.9L12.5 6.5L7.5 9.1Z" fill="white" />
        </svg>
    )
}