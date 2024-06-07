import AuthForm from "../components/Auth/AuthForm";
import AuthImage from "../components/Auth/AuthImage";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const { error, signin } = useAuth();

  return (
    <div className="h-screen flex">
      <AuthImage />
      <div className="flex flex-col w-full h-sreen lg:w-1/2 justify-center items-center space-y-8">
        <div className="flex flex-1 w-full justify-center items-center">
          <AuthForm title="Login" onSubmit={signin} error={error} />
        </div>
      </div>
    </div>
  );
}
