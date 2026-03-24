import type { SVGProps } from 'react'

type PaypalSvgProps = SVGProps<SVGSVGElement> & {
    size?: number
}

export default function PaypalSvg({
                                      size = 18,
                                      width,
                                      height,
                                      ...props
                                  }: PaypalSvgProps) {
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
            <rect width="18" height="13" rx="3" fill="#003087" />
            <path
                d="M8.2 3.2H10.1C11.6 3.2 12.5 4 12.3 5.1C12.1 6.3 11.1 7 9.7 7H8.7L8.2 9.6H6.8L8.2 3.2Z"
                fill="#009CDE"
            />
            <path
                d="M7.2 2.7H9.2C10.8 2.7 11.9 3.6 11.6 5.1C11.4 6.5 10.2 7.4 8.7 7.4H7.7L7.2 10.3H5.6L7.2 2.7Z"
                fill="white"
            />
        </svg>
    )
}