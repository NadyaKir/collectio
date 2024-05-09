import React, { useState } from "react";
import ThemeIcon from "../assets/day-and-night.png";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    document.body.classList.toggle("dark");
  };

  return (
    <button className="cursor-pointe" onClick={toggleDarkMode}>
      <img className="w-7 h-7" src={ThemeIcon} alt="" />
    </button>
  );
}
