import React, { FunctionComponent } from "react"

export interface IconBaseProps {
    size?: string
    viewBoxSize?: string
    className?: string
    color?: string
    children?: React.ReactNode
}

const IconBase: FunctionComponent<IconBaseProps> = ({
    size = "16",
    viewBoxSize = "24",
    color = "#6b6b6b",
    className,
    children,
    ...options
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width={size}
            height={size}
            className={className}
            color={color}
            {...options}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
            {children}
        </svg>
    )
}

export default IconBase
