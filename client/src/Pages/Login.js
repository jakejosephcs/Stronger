import LoginForum from "../Components/LoginForum";
import AuthHeader from "../Components/AuthHeader";

function Login() {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <AuthHeader isLoginHeader={true} />
      <LoginForum />
    </div>
  );
}

export default Login;
