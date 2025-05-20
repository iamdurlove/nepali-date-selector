import React, { FunctionComponent } from "react"
import { ParsedDate, SplittedDate } from "../../../Types"
import DaySelectorBody from "./DaySelectorBody"
import DaySelectorHeader from "./DaySelectorHeader"

interface DaySelectorProps {
    selectedDate: ParsedDate | null
    calenderDate: ParsedDate
    onDaySelect: (date: SplittedDate) => void
}

const DaySelector: FunctionComponent<DaySelectorProps> = ({ selectedDate, calenderDate, onDaySelect }) => {
    return (
        <table>
            <DaySelectorHeader />

            <DaySelectorBody selectedDate={selectedDate} calenderDate={calenderDate} onSelect={onDaySelect} />
        </table>
    )
}

export default DaySelector
