import React from "react";
import AuthForm from "../components/AuthForm";
import AuthImage from "../components/AuthImage";

export default function RegisterPage() {
  const handleSubmit = () => {};

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <AuthForm title="Register" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
