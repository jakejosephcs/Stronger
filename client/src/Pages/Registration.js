import RegistrationForum from "../Components/RegistrationForum";
import { Link } from "react-router-dom";
import AuthHeader from "../Components/AuthHeader";

function Registration() {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <AuthHeader isLoginHeader={false} />
      <RegistrationForum />
    </div>
  );
}

export default Registration;
