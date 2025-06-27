# Nepali Date Selector (Bikram Sambat) - React.js Component

> A modern, customizable Nepali Date Selector (Bikram Sambat) as a ReactJS component.

[![NPM](https://img.shields.io/npm/v/nepali-date-selector.svg)](https://www.npmjs.com/package/nepali-date-selector)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [Live Demo](https://nepalidateselector.durlavparajuli.com.np/)

![NepaliDateSelector Demo](example.png)

---

## Features

- Bikram Sambat (BS) Nepali calendar support
- Fully localizable (Nepali/English)
- Keyboard and mouse navigation
- Customizable year and month range
- Typeable and searchable year input
- Adjustable input width, height, and style
- Accessible and responsive design
- Zero dependencies except React and Nepali date libraries

---

## Installation

```bash
npm install --save nepali-date-selector
# or
yarn add nepali-date-selector
```

---

## Usage

### TypeScript Example

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
                inputStyle={{
                    width: 220,
                    height: 48,
                    fontSize: 18,
                    textAlign: "center",
                }}
            />
        </form>
    )
}

export default App
```

### JavaScript Example

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
                onChange={setDate}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
                inputStyle={{
                    width: 220,
                    height: 48,
                    fontSize: 18,
                    textAlign: "center",
                }}
            />
        </form>
    )
}

export default App
```

---

## Props Reference

| Prop             | Type            | Default | Description                                                     |
| ---------------- | --------------- | ------- | --------------------------------------------------------------- |
| `value`          | `string`        | `""`    | The selected date in `YYYY-MM-DD` format (BS).                  |
| `onChange`       | `function`      | `-`     | Callback when the date changes. Receives the new date string.   |
| `onSelect`       | `function`      | `-`     | Callback when a date is selected. Receives the new date string. |
| `className`      | `string`        | `""`    | Custom class for the root wrapper.                              |
| `inputClassName` | `string`        | `""`    | Custom class for the input field.                               |
| `options`        | `object`        | `{}`    | Calendar options (see below).                                   |
| `minYear`        | `number`        | `1970`  | Minimum year selectable.                                        |
| `maxYear`        | `number`        | `2100`  | Maximum year selectable.                                        |
| `todayIfEmpty`   | `boolean`       | `false` | If true, sets today as default when value is empty.             |
| `inputStyle`     | `CSSProperties` | `{}`    | Inline style for the date input (width, height, font, etc.)     |

### `options` object

| Option           | Type    | Default | Description                                  |
| ---------------- | ------- | ------- | -------------------------------------------- |
| `closeOnSelect`  | boolean | `true`  | Close calendar after selecting a date.       |
| `calenderLocale` | string  | `"ne"`  | Calendar language: `"ne"` (Nepali) or `"en"` |
| `valueLocale`    | string  | `"en"`  | Output value language: `"ne"` or `"en"`      |

---

## Adjustable Input Size & Style

You can fully control the width, height, and other styles of the date input using the `inputStyle` prop.  
This prop accepts a standard React [CSSProperties](https://react.dev/reference/react-dom/components/common#style) object and is applied directly to the input.

**Example:**

```tsx
<NepaliDateSelector
    value={date}
    onChange={setDate}
    inputStyle={{
        width: 220, // width in px
        height: 48, // height in px
        fontSize: 18, // font size in px
        background: "#fafafa",
        borderRadius: 8,
        border: "2px solid #b80000",
        textAlign: "center", // center text and placeholder
    }}
/>
```

- **Width and height**: Set any pixel or CSS value.
- **Placeholder and input text**: Will be centered by default if you use `textAlign: "center"`.

---

## Customization

### Styling

- The component uses SCSS for styling.
- You can override styles by importing your own CSS after the default one.
- Main class: `.nepali-date-selector`
- Calendar popup: `.calender`
- Controller: `.calendar-controller`
- Year/month controls: `.control.year`, `.control.month`
- Input: `.nepali-date-input`

### Localization

- Supports Nepali and English out of the box.
- Use the `options.calenderLocale` and `options.valueLocale` props to control language.

### Year/Month Range

- Use `minYear` and `maxYear` props to restrict selectable years.
- The year selector supports both dropdown and manual typing.

---

## Accessibility

- Keyboard navigation is supported for input and dropdowns.
- All interactive elements are accessible via tab and arrow keys.

---

## Development

### Scripts

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm start`      | Start development build (watch) |
| `npm run build`  | Build for production            |
| `npm test`       | Run all tests                   |
| `npm run lint`   | Lint TypeScript and SCSS        |
| `npm run format` | Format code with Prettier       |
| `npm run clean`  | Remove build artifacts          |

### Project Structure

```
src/
  NepaliDateSelector/
    Calender/           # Calendar logic and UI
    Config/             # Context and config
    DropDown/           # Dropdown component
    Icons/              # SVG icons
    Locale/             # Localization
    Utils/              # Utility functions
    NepaliDateSelector.tsx
    Types.ts
    index.tsx
  index.tsx             # Entry point
  NepaliDateSelector.scss
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request

### Code Style

- Follows [StandardJS](https://standardjs.com/) and Prettier
- Lint and format before submitting PRs

---

## License

MIT © [https://github.com/iamdurlove](https://github.com/iamdurlove/nepali-date-selector)

---

\*\*For more details, see the [demo](https://iamdurlove.github.io/nepali-date-selector/) or the [source code](https://github.com/iamdurlove/nepali-date-selector)
