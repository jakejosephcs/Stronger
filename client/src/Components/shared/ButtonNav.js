import { useNavigate } from "react-router";

function ButtonNav({
  navigateTo,
  buttonText,
  onClick,
  color,
  children,
  textColor,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex ${
        color ? color : "bg-slate-200"
      } py-2 px-3 rounded mb-4`}
    >
      {children}
      <button
        className={`${textColor && textColor} ml-1`}
        onClick={navigateTo ? () => navigate(navigateTo) : onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonNav;
