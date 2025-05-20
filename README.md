# Nepali Date Selector (Bikram Sambat) - React.js Component

> Nepali Date Selector (Bikram Sambat) as a ReactJS component

[![NPM](https://img.shields.io/npm/v/nepali-date-selector.svg)](https://www.npmjs.com/package/nepali-date-selector)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [Demo](https://iamdurlove.github.io/nepali-date-selector/)

![NepaliDateSelector Demo](example.png)

## Install

```bash
npm install --save nepali-date-selector

or,

yarn add nepali-date-selector
```

## Usage

#### For Typescript

```tsx
import { useState } from "react"
import { NepaliDateSelector } from "nepali-date-selector"
import "nepali-date-selector/dist/index.css"

const App = () => {
    const [date, setDate] = useState<string>("")

    return (
        <form>
            <label htmlFor='date'>Date</label>
            <NepaliDateSelector
                inputClassName='form-control'
                className=''
                value={date}
                onChange={(value: string) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
        </form>
    )
}

export default App
```

#### For JavaScript

```jsx
import React, { useState } from "react"
import { NepaliDateSelector } from "nepali-date-selector"
import "nepali-date-selector/dist/index.css"

const App = () => {
    const [date, setDate] = useState("")

    return (
        <form>
            <label htmlFor='date'>Date</label>
            <NepaliDateSelector
                inputClassName='form-control'
                className=''
                value={date}
                onChange={(value) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
        </form>
    )
}

export default App
```

## License

MIT © [https://github.com/iamdurlove](https://github.com/iamdurlove)
