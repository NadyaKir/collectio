import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/Auth/AuthForm";
import AuthImage from "../components/Auth/AuthImage";
import LanguageSwitcher from "../components/Navbar/LanguageSwitcher";
import ThemeSwitcher from "../components/Navbar/ThemeSwitcher";
import Spinner from "../components/Spinner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/register",
        formData
      );

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="flex flex-col w-full h-sreen lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="flex w-full justify-end">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        <div className="flex flex-1 w-full justify-center items-center">
          {!isLoading && (
            <AuthForm
              title="Register"
              onSubmit={handleSubmit}
              error={error}
              setError={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
