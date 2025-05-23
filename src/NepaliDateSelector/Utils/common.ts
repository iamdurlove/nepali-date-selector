import { CalenderData } from "../Config"
import { BS, ParsedDate, SplittedDate, voidFunction } from "../Types"
import {
    validateAdDay,
    validateAdMonth,
    validateAdYear,
    validateBsDay,
    validateBsMonth,
    validateBsYear,
} from "./DateValidations"
import NepaliDate from "nepali-date-converter"
import { BSToAD } from "bikram-sambat-js"

export const range = (start: number, end: number, step: number = 1): number[] => {
    const list = []

    for (let i = start; i <= end; i = i + step) {
        list.push(i)
    }

    return list
}

export const zeroPad = (num: number): string => `${num > 9 ? num : "0" + num}`

export const executionDelegation = (execution: voidFunction, delegatedExecution: voidFunction) => {
    new Promise<void>((resolve) => {
        execution()
        resolve()
    }).then(() => {
        delegatedExecution()
    })
}

export const splitDate = (date: string, separator: string = "-"): SplittedDate => {
    const [year, month, day] = date.split(separator)

    return {
        day: parseInt(day, 10),
        month: parseInt(month, 10),
        year: parseInt(year, 10),
    }
}

export const stitchDate = (date: SplittedDate, separator: string = "-"): string => {
    return `${date.year}${separator}${zeroPad(date.month)}${separator}${zeroPad(date.day)}`
}

export const validateDateObject = (date: SplittedDate, type: string = BS) => {
    const { year, month, day } = date

    if (type === BS) {
        validateBsYear(year)
        validateBsMonth(month)
        validateBsDay(day)

        return
    }

    validateAdYear(year)
    validateAdMonth(month)
    validateAdDay(day)
}

export const getNumberOfDaysInBSMonth = (yearMonth: { year: number; month: number }): number => {
    const { year, month } = yearMonth
    validateBsYear(year)
    validateBsMonth(month)

    let yearCount = 0
    const totalYears = year + 1 - CalenderData.minBSYear
    const bsMonthData: number[] = CalenderData.bsMonthCalculatedData[month - 1]

    return bsMonthData.reduce((numberOfDays: number, monthData: number, index: number) => {
        if (monthData === 0 || numberOfDays !== 0) {
            return numberOfDays
        }

        const bsMonthUpperDaysIndex = index % 2
        yearCount += monthData
        if (totalYears > yearCount) {
            return numberOfDays
        }

        if (year === 2081 && month === 2) {
            return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex + 1]
        }

        if (year === 2081 && month === 3) {
            return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex - 1]
        }

        if (year === 2081 && month === 11) {
            return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex] - 1
        }

        if (year === 2081 && month === 12) {
            return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex] + 1
        }
        if (year === 2082 && month === 1) {
            return CalenderData.bsMonthMaxDays[month - 1][1] // Force index 1 to get 31 days
        }

        if (year === 2082 && month === 2) {
            // Return 31 days for Jestha
            return CalenderData.bsMonthMaxDays[month - 1][0] // Use index 0 to get 31 days
        }

        // Add these in getNumberOfDaysInBSMonth function after the existing BS 2082 conditions
        if (year === 2082 && month === 3) {
            return CalenderData.bsMonthMaxDays[month - 1][1] // Force index 1 to get 32 days for Asar
        }

        if (year === 2082 && month === 4) {
            return CalenderData.bsMonthMaxDays[month - 1][0] // Force index 0 to get 31 days for Shrawan
        }

        if (year === 2082 && month === 6) {
            return CalenderData.bsMonthMaxDays[month - 1][1] // Force index 1 to get 31 days for Asoj
        }

        if (year === 2082 && month === 8) {
            return CalenderData.bsMonthMaxDays[month - 1][0] // Force index 0 to get 29 days for Mangsir
        }

        if (year === 2082 && month === 9) {
            return CalenderData.bsMonthMaxDays[month - 1][1] // Force index 1 to get 30 days for Poush
        }

        if (year === 2082 && month === 10) {
            return CalenderData.bsMonthMaxDays[month - 1][0] // Force index 0 to get 29 days for Magh
        }

        if ((year === 2085 && month === 5) || (year === 2088 && month === 5)) {
            return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex] - 2
        }

        return CalenderData.bsMonthMaxDays[month - 1][bsMonthUpperDaysIndex]
    }, 0)
}

export const parseBSDate = (date: string, separator: string = "-"): ParsedDate => {
    const { year, month, day }: SplittedDate = splitDate(date, separator)

    validateDateObject({ year, month, day })

    const myDate = new NepaliDate(date).getDateObject().AD

    const adDate = new Date(`${myDate.year}-${myDate.month}-${myDate.day}`)

    let firstAdDateInBSMonth = new Date(BSToAD(stitchDate({ year, month, day: 1 }, separator)))
    console.log(firstAdDateInBSMonth)
    const numberOfDaysInMonth = getNumberOfDaysInBSMonth({ year, month })

    // Special case for BS 2082 Jestha (month 2)
    if (year === 2082 && month === 2) {
        // Force the first day of Jestha to have the correct weekday
        // This ensures no overlap with the last day of Baishakh
        // const dayOfWeek = firstAdDateInBSMonth.getDay()
        // Shift the weekday by 1 to fix the overlap
        firstAdDateInBSMonth = new Date(firstAdDateInBSMonth)
        firstAdDateInBSMonth.setDate(firstAdDateInBSMonth.getDate() + 1)
    }

    // Special case for BS 2082 Shrawan (month 4)
    if (year === 2082 && month === 4) {
        // Fix the overlap with the last day of Asar
        firstAdDateInBSMonth = new Date(firstAdDateInBSMonth)
        firstAdDateInBSMonth.setDate(firstAdDateInBSMonth.getDate() + 1)
    }

    if (year === 2082 && month === 7) {
        // Fix the overlap with the last day of Asoj
        firstAdDateInBSMonth = new Date(firstAdDateInBSMonth)
        firstAdDateInBSMonth.setDate(firstAdDateInBSMonth.getDate() + 1)
    }

    if (year === 2082 && month === 8) {
        // Fix the overlap with the last day of Kartik
        firstAdDateInBSMonth = new Date(firstAdDateInBSMonth)
        firstAdDateInBSMonth.setDate(firstAdDateInBSMonth.getDate() + 1)
    }

    if (year === 2082 && month === 10) {
        // Fix the overlap with the last day of Poush
        firstAdDateInBSMonth = new Date(firstAdDateInBSMonth)
        firstAdDateInBSMonth.setDate(firstAdDateInBSMonth.getDate() + 1)
    }
    return {
        adDate,
        bsDay: day,
        bsMonth: month,
        bsYear: year,
        firstAdDayInBSMonth: firstAdDateInBSMonth,
        numberOfDaysInBSMonth: numberOfDaysInMonth,
        weekDay: adDate.getDay(),
    }
}

export const childOf = (childNode: any, parentNode: any): boolean => parentNode.contains(childNode)
