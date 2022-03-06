import { Link } from "react-router-dom";

function AuthHeader({ isLoginHeader = false }) {
  const title = isLoginHeader
    ? "Sign into your account"
    : "Create your account";

  const subTitle = isLoginHeader ? "New to Stronger? " : "Already registered? ";

  const linkText = isLoginHeader ? "Sign up" : "Sign in";

  const link = isLoginHeader ? "/registration" : "/login";

  return (
    <>
      <h1 className="font-bold text-2xl mb-2">{title}</h1>
      <span className="mb-5">
        {subTitle}
        <Link to={link} className="text-blue-500 font-bold">
          {linkText}
        </Link>
      </span>
    </>
  );
}

export default AuthHeader;
