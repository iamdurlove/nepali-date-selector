import React, { FunctionComponent, useLayoutEffect, useRef } from "react"
import { OptionType } from "./Types"

interface DropDownProps {
    options: OptionType[]
    value: number
    onSelect: (selected: OptionType) => void
}

const DropDown: FunctionComponent<DropDownProps> = ({ options, value, onSelect }) => {
    const activeRef = useRef<HTMLLIElement>(null)

    useLayoutEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({ block: "center" })
        }
    }, [value])

    return (
        <div className='drop-down'>
            <div className='option-wrapper'>
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            ref={option.value === value ? activeRef : undefined}
                            className={option.value === value ? "active" : ""}
                            onClick={() => {
                                onSelect(option)
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DropDown
