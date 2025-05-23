import React, { FunctionComponent } from "react"
import { useConfig } from "../../Config"
import { NextIcon, PreviousIcon, TodayIcon } from "../../Icons"
import { useTrans } from "../../Locale"
import { localeType, ParsedDate } from "../../Types"
import MonthSelector from "./MonthSelector"
import YearSelector from "./YearSelector"

interface CalenderControllerProps {
    onNextMonth: () => void
    onPreviousMonth: () => void
    onToday: () => void
    onYearSelect: (year: number) => void
    onMonthSelect: (year: number) => void
    calenderDate: ParsedDate
}

const CalenderController: FunctionComponent<CalenderControllerProps> = (props) => {
    // const { onNextMonth, onPreviousMonth, calenderDate, onToday, onYearSelect, onMonthSelect } = props
    const { onNextMonth, onPreviousMonth, calenderDate, onYearSelect, onMonthSelect, onToday } = props
    const { getConfig } = useConfig()
    const { trans } = useTrans(getConfig<localeType>("currentLocale"))

    return (
        <div className='calendar-controller'>
            <span className='control icon' title={trans("previous")} onClick={onPreviousMonth}>
                <PreviousIcon />
            </span>

            <div className='date-indicator'>
                <MonthSelector date={calenderDate} onSelect={onMonthSelect} />
                <YearSelector date={calenderDate} onSelect={onYearSelect} />
            </div>

            <span className='control icon icon-today' title={trans("today")} onClick={onToday}>
                <TodayIcon className='today-icon-main' />
            </span>

            <span className='control icon' title={trans("next")} onClick={onNextMonth}>
                <NextIcon />
            </span>
        </div>
    )
}

export default CalenderController
