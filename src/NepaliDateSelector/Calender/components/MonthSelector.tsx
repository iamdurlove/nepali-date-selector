import React, { FunctionComponent, useMemo, useState } from "react"
import { CalenderData, useConfig } from "../../Config"
import { DropDown, OptionType } from "../../DropDown"
import { localeType, ParsedDate } from "../../Types"

interface MonthSelectorProps {
    date: ParsedDate
    onSelect: (month: number) => void
}

const MonthSelector: FunctionComponent<MonthSelectorProps> = ({ date, onSelect }) => {
    const [showDropdown, setShowDropdown] = useState(false)

    const { getConfig } = useConfig()
    const currentLocale: localeType = useMemo(() => getConfig<localeType>("currentLocale"), [getConfig])

    const currentMonth: OptionType = useMemo((): OptionType => {
        const month = date.bsMonth

        return {
            label: CalenderData.months[currentLocale][month - 1],
            value: month,
        }
    }, [date, currentLocale])

    const monthList: OptionType[] = useMemo(() => {
        return CalenderData.months[currentLocale].map((month, index) => ({
            label: month,
            value: index + 1,
        }))
    }, [currentLocale])

    const handleDropdownView = (selected: OptionType) => {
        onSelect(selected.value) // Trigger the onSelect callback
        setShowDropdown(false) // Explicitly close the dropdown after selection
    }

    return (
        <div className='control month' onMouseDown={(e) => e.stopPropagation()}>
            <span className='current-month' onClick={() => setShowDropdown(!showDropdown)}>
                {currentMonth.label}
            </span>
            {showDropdown && <DropDown options={monthList} value={currentMonth.value} onSelect={handleDropdownView} />}
        </div>
    )
}

export default MonthSelector
