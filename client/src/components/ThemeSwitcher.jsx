import React from "react";
import ThemeIcon from "../assets/day-and-night.png";

export default function ThemeSwitcher() {
  return (
    <button className="cursor-pointer text-white py-2 px-4 rounded">
      <img className="w-7 h-7" src={ThemeIcon} alt="" />
    </button>
  );
}
