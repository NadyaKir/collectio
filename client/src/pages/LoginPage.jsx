import { useState } from "react";
import axios from "axios";
import AuthForm from "../components/Auth/AuthForm";
import AuthImage from "../components/Auth/AuthImage";
import LanguageSwitcher from "../components/Navbar/LanguageSwitcher";
import ThemeSwitcher from "../components/Navbar/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message || "An error occurred");
    }
  };

  console.log(error);

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="absolute right-0"></div>
      <div className="flex flex-col w-full h-sreen lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="flex w-full justify-end">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <div className="flex flex-1 w-full justify-center items-center">
          <AuthForm title="Login" onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </div>
  );
}
