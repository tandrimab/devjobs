"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Switch() {
  const { theme, setTheme } = useTheme("light");

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);  

  return (
    <label className="switch-main shrink-0 cursor-pointer">
      <input
        className="mode-switch"
        type="checkbox"
        onChange={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      />
      <span className="slider" />
    </label>
  );
}
