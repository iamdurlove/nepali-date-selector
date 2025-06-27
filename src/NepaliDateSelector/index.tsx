import * as React from "react" // Use this import style
import type { JSX } from "react"
import "../NepaliDateSelector.scss"
import { ConfigProvider } from "./Config"
import NepaliDateSelectorComponent from "./NepaliDateSelector"
import { ENGLISH, INepaliDateSelector, NEPALI, NepaliDateSelectorProps } from "./Types"

// Using a standard function with explicit return type instead of FunctionComponent
const NepaliDateSelectorWrapper = (props: NepaliDateSelectorProps): JSX.Element => {
    const {
        className = "",
        inputClassName = "",
        value = "",
        onChange = () => null,
        onSelect = () => null,
        options = {},
        todayIfEmpty = false,
        maxYear,
        minYear,
        ...restProps
    } = props

    const calenderOptions = React.useMemo(
        () => ({
            closeOnSelect: true,
            calenderLocale: NEPALI,
            valueLocale: ENGLISH,
            ...options,
        }),
        [options],
    )

    return (
        <ConfigProvider maxYear={maxYear} minYear={minYear}>
            <NepaliDateSelectorComponent
                {...({
                    className,
                    inputClassName,
                    value,
                    onChange,
                    onSelect,
                    options: calenderOptions,
                    todayIfEmpty,
                    maxYear,
                    minYear,
                    ...restProps,
                } as INepaliDateSelector)}
            />
        </ConfigProvider>
    )
}

export default NepaliDateSelectorWrapper
