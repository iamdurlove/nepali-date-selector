import React, { FunctionComponent, useMemo } from "react"
import "../NepaliDateSelector.scss"
import { ConfigProvider } from "./Config"
import NepaliDatePicker from "./NepaliDateSelector"
import { ENGLISH, INepaliDatePicker, NEPALI, NepaliDatePickerProps } from "./Types"

const NepaliDatePickerWrapper: FunctionComponent<NepaliDatePickerProps> = ({
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
            <NepaliDatePicker
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
                } as INepaliDatePicker)}
            />
        </ConfigProvider>
    )
}

export default NepaliDatePickerWrapper
