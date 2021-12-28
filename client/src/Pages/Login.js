import LoginForum from "../Components/LoginForum";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <h1 className="font-bold text-2xl mb-2">Sign into your account</h1>
      <span className="mb-5">
        New to Stronger?{" "}
        <Link to="/registration" className="text-blue-500 font-bold">
          Sign up
        </Link>
      </span>
      <LoginForum />
    </div>
  );
}

export default Login;
