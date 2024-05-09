import React from "react";
import AuthForm from "../components/AuthForm";
import AuthImage from "../components/AuthImage";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function RegisterPage() {
  const handleSubmit = () => {};

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="flex flex-col w-full h-sreen lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="flex w-full justify-end">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <div className="flex flex-1 w-full justify-center items-center">
          <AuthForm title="Register" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
