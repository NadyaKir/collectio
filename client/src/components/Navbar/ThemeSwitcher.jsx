import React, { useState, useEffect } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Switch, ConfigProvider } from "antd";

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-start items-center mt-2 lg:mt-0 lg:ml-4">
      <span className="mr-2 text-2xl font-medium text-gray-900 dark:text-gray-300">
        {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
      </span>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(15 118 110)",
          },
        }}
      >
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
      </ConfigProvider>
    </div>
  );
}
