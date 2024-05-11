import AuthForm from "../components/Auth/AuthForm";
import AuthImage from "../components/Auth/AuthImage";
import useAuth from "../hooks/useAuth";

export default function RegisterPage() {
  const { error, register } = useAuth();

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="flex flex-col w-full h-sreen lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="flex flex-1 w-full justify-center items-center">
          <AuthForm title="Register" onSubmit={register} error={error} />
        </div>
      </div>
    </div>
  );
}
