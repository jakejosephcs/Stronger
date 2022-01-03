import { useNavigate } from "react-router";
import LinkIcon from "../Assests/LinkIcon";

function ButtonNav({ navigateTo, buttonText, onClick }) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-slate-200 py-2 px-3 rounded mb-4">
      <LinkIcon />
      <button
        className="ml-1"
        onClick={navigateTo ? () => navigate(navigateTo) : onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonNav;
