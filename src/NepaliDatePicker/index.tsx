import React, { FunctionComponent, useMemo } from "react"
import "../NepaliDateSelector.scss"
import { ConfigProvider } from "./Config"
import NepaliDateSelector from "./NepaliDateSelector"
import { ENGLISH, INepaliDateSelector, NEPALI, NepaliDateSelectorProps } from "./Types"

const NepaliDateSelectorWrapper: FunctionComponent<NepaliDateSelectorProps> = ({
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
}) => {
    const calenderOptions = useMemo(
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
            <NepaliDateSelector
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
