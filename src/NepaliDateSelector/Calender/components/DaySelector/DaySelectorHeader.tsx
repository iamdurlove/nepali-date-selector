import React, { FunctionComponent, useMemo } from "react"
import { CalenderData, useConfig } from "../../../Config"

const DaySelectorHeader: FunctionComponent = () => {
    const { getConfig } = useConfig()
    const currentLocale = useMemo(() => getConfig("currentLocale") as "en" | "ne", [getConfig])

    return (
        <thead>
            <tr>
                {CalenderData.weeks[currentLocale].map((weekDay: string, index: number) => (
                    <td key={index}>{weekDay}</td>
                ))}
            </tr>
        </thead>
    )
}

export default DaySelectorHeader
