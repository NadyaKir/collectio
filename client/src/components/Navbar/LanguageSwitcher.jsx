import { useState } from "react";
import Flag from "react-flagkit";

export default function LanguageSwitcher() {
  const [isRussian, setIsRussian] = useState(true);

  const toggleLanguage = () => {
    setIsRussian(!isRussian);
  };

  return (
    <button
      className="cursor-pointer text-white py-2 px-4 rounded"
      onClick={toggleLanguage}
      title={isRussian ? "Русский" : "English"}
    >
      {isRussian ? (
        <Flag country="RU" size={34} />
      ) : (
        <Flag country="US" size={34} />
      )}
    </button>
  );
}
