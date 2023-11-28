"use client"
import { useState } from "react"

export default function Switch() {
    const [isDark, setIsDark] = useState(false);

    return (
        <label className="switch-main shrink-0 cursor-pointer">
            <input className="mode-switch" type="checkbox" onChange={() => setIsDark((prev) => !prev)} checked={!isDark} />
            <span  className="slider"/>
        </label>
    )
}