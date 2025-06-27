import React, { FunctionComponent, useMemo, useState, useRef, useEffect } from "react"
import { useConfig } from "../../Config"
import { DropDown, OptionType } from "../../DropDown"
import { useTrans } from "../../Locale"
import { localeType, ParsedDate } from "../../Types"
import { range } from "../../Utils/common"

interface YearSelectorProps {
    date: ParsedDate
    onSelect: (year: number) => void
}

const YearSelector: FunctionComponent<YearSelectorProps> = ({ date, onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const { getConfig } = useConfig()
    const { numberTrans } = useTrans(getConfig<localeType>("currentLocale"))

    const minYear = (getConfig("minYear") as number) ?? 1970
    const maxYear = (getConfig("maxYear") as number) ?? 2100

    const currentYear: OptionType = useMemo((): OptionType => {
        const year = date.bsYear
        return {
            label: numberTrans(year),
            value: year,
        }
    }, [date, numberTrans])

    const years: OptionType[] = useMemo(
        (): OptionType[] =>
            range(minYear, maxYear).map(
                (year: number): OptionType => ({
                    label: numberTrans(year),
                    value: year,
                }),
            ),
        [minYear, maxYear, numberTrans],
    )

    // When dropdown opens, set input value to current year
    useEffect(() => {
        if (showDropdown) {
            setInputValue(date.bsYear.toString())
            setTimeout(() => {
                inputRef.current?.focus()
                inputRef.current?.select()
            }, 0)
        }
    }, [showDropdown, date.bsYear])

    const ignoreBlur = useRef(false)

    // Make a global function for DropDown to call
    useEffect(() => {
        ;(window as any).dropdownSelecting = () => {
            ignoreBlur.current = true
            setTimeout(() => {
                ignoreBlur.current = false
            }, 0)
        }
        return () => {
            ;(window as any).dropdownSelecting = null
        }
    }, [])

    const handleDropdownView = (selected: OptionType) => {
        onSelect(selected.value)
        setInputValue(selected.label)
        setTimeout(() => setShowDropdown(false), 100) // Delay closing dropdown
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/, "")
        setInputValue(val)
        const yearNum = parseInt(val, 10)
        if (!isNaN(yearNum) && yearNum >= minYear && yearNum <= maxYear) {
            onSelect(yearNum)
        }
    }

    const handleInputBlur = () => {
        if (ignoreBlur.current) return
        setShowDropdown(false)
    }

    return (
        <div className='control year' style={{ position: "relative", display: "inline-block" }}>
            {!showDropdown ? (
                <span className='current-year' onClick={() => setShowDropdown(true)} style={{ cursor: "pointer" }}>
                    {currentYear.label}
                </span>
            ) : (
                <input
                    ref={inputRef}
                    type='number'
                    className='current-year'
                    value={inputValue}
                    min={minYear}
                    max={maxYear}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    style={{
                        background: "transparent",
                        color: "inherit",
                        padding: "6px 0",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        width: "85px",
                        height: "28px",
                        fontSize: "16px",
                        textAlign: "center",
                        border: "none",
                        outline: "none",
                    }}
                />
            )}
            {showDropdown && (
                <DropDown
                    options={years}
                    value={parseInt(inputValue, 10) || currentYear.value}
                    onSelect={handleDropdownView}
                    inputRef={inputRef}
                />
            )}
        </div>
    )
}

export default YearSelector
