import { Link } from "react-router-dom";
import LinkIcon from "../Assests/LinkIcon";

function ButtonNav({ navigateTo, buttonText }) {
  return (
    <div className="flex bg-slate-200 py-2 px-3 rounded mb-4">
      <LinkIcon />
      <Link to={navigateTo}>
        <button className="ml-1">{buttonText}</button>
      </Link>
    </div>
  );
}

export default ButtonNav;
