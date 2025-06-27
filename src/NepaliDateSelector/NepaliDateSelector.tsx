import React, { FunctionComponent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Calender } from "./Calender"
import { useConfig } from "./Config"
import { useTrans } from "./Locale"
import { ENGLISH, INepaliDateSelector, localeType, NepaliDateSelectorEvents } from "./Types"
import { childOf, executionDelegation, stitchDate } from "./Utils/common"
import NepaliDate from "nepali-date-converter"

const NepaliDateSelector: FunctionComponent<INepaliDateSelector> = (props) => {
    const { className, inputClassName, value, onChange, onSelect, options, todayIfEmpty, inputStyle } = props

    const nepaliDateSelectorWrapper = useRef<HTMLDivElement>(null)
    const nepaliDateSelectorInput = useRef<HTMLInputElement>(null)

    const [date, setDate] = useState<string>("")
    const [showCalendar, setShowCalendar] = useState<boolean>(false)

    const { setConfig, getConfig } = useConfig()
    const { numberTrans } = useTrans(getConfig<localeType>("currentLocale"))

    const toEnglish = useCallback((val: string): string => numberTrans(val, ENGLISH), [])
    const returnDateValue = useCallback(
        (val: string): string => numberTrans(val, options.valueLocale),
        [options.valueLocale],
    )

    useEffect(() => {
        setConfig("currentLocale", options.calenderLocale)
    }, [options.calenderLocale])

    useEffect(() => {
        const today = new NepaliDate().format("YYYY-MM-DD")
        setDate(toEnglish(value || (todayIfEmpty ? today : "")))
    }, [value])

    const handleClickOutside = useCallback((event: any) => {
        if (nepaliDateSelectorWrapper.current && childOf(event.target, nepaliDateSelectorWrapper.current)) {
            return
        }

        setShowCalendar(false)
    }, [])

    useLayoutEffect(() => {
        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showCalendar])

    useLayoutEffect(() => {
        if (showCalendar && nepaliDateSelectorWrapper.current) {
            const nepaliDateSelector = nepaliDateSelectorWrapper.current.getBoundingClientRect()
            const screenHeight = window.innerHeight

            const calender: HTMLDivElement | null = nepaliDateSelectorWrapper.current.querySelector(".calender")
            if (calender) {
                setTimeout(() => {
                    const calenderHeight = calender.clientHeight

                    if (calenderHeight + nepaliDateSelector.bottom > screenHeight) {
                        if (calenderHeight < nepaliDateSelector.top) {
                            calender.style.bottom = `${nepaliDateSelector.height}px`
                        }
                    }
                }, 0)
            }
        }
    }, [showCalendar])

    const handleOnChange = useCallback(
        (changedDate: string) => {
            executionDelegation(
                () => {
                    setDate(changedDate)
                },
                () => {
                    if (onChange) {
                        onChange(returnDateValue(changedDate))
                    }
                },
            )
        },
        [onChange],
    )

    interface HandleOnDaySelectParams {
        year: number
        month: number
        day: number
    }

    const handleOnDaySelect = useCallback(
        (selectedDate: HandleOnDaySelectParams) => {
            executionDelegation(
                () => {
                    if (options.closeOnSelect) {
                        setShowCalendar(false)
                    }
                },
                () => {
                    if (onSelect) {
                        onSelect(returnDateValue(stitchDate(selectedDate)))
                    }
                },
            )
        },
        [onSelect],
    )

    const dateSelectorEvents: NepaliDateSelectorEvents = {
        change: handleOnChange,
        daySelect: handleOnDaySelect,
        todaySelect: handleOnDaySelect,
    }

    return (
        <div ref={nepaliDateSelectorWrapper} className={`nepali-date-selector ${className}`}>
            <div style={{ position: "relative", display: "inline-block" }}>
                <input
                    type='text'
                    ref={nepaliDateSelectorInput}
                    className={`nepali-date-input ${inputClassName || ""}`}
                    placeholder='YYYY-MM-DD'
                    value={date}
                    onClick={() => setShowCalendar((visible) => !visible)}
                    onChange={(e) => {
                        setDate(toEnglish(e.target.value))
                    }}
                    onBlur={(e) => {
                        const val = toEnglish(e.target.value)
                        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                            handleOnChange(val)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const val = toEnglish((e.target as HTMLInputElement).value)
                            if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                                handleOnChange(val)
                                setShowCalendar(false)
                            }
                        }
                    }}
                    style={{
                        ...inputStyle,
                    }}
                />
            </div>
            {showCalendar && (
                <Calender value={/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : ""} events={dateSelectorEvents} />
            )}
        </div>
    )
}

export default NepaliDateSelector
