import RegistrationForum from "../Components/RegistrationForum";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <h1 className="font-bold text-2xl mb-2">Create your account</h1>
      <span className="mb-5">
        Already registered?{" "}
        <Link to="/login" className="text-blue-500 font-bold">
          Sign in
        </Link>
      </span>{" "}
      <RegistrationForum />
    </div>
  );
}

export default Registration;
