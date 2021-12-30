import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AddIcon from "../Assests/AddIcon";
import CalenderIcon from "../Assests/CalenderIcon";
import GraphIcon from "../Assests/GraphIcon";
import NoteIcon from "../Assests/NoteIcon";

function Landing() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken !== null) {
      setToken(localStorageToken);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.setItem("token", null);
    setToken(null);
    navigate("/login");
  };

  const buttonComponent = (text, onClick, color = "blue") => {
    return (
      <div
        className={`bg-${color}-500 text-white py-2 px-5 rounded-full text-center mb-4`}
      >
        <button onClick={onClick}>{text}</button>
      </div>
    );
  };

  const buttonsToRender = (userToken) => {
    if (userToken === "null") {
      return (
        <section className="mb-10">
          {buttonComponent("Registration", () => navigate("/registration"))}
          {buttonComponent("Login", () => navigate("/login"))}
        </section>
      );
    }
    return (
      <section className="mb-10">
        {buttonComponent("Workout", () => navigate("/home"))}
        {buttonComponent("Logout", clearLocalStorage, "red")}
      </section>
    );
  };

  const ICON_NAME = {
    NoteIcon: NoteIcon,
    CalenderIcon: CalenderIcon,
    AddIcon: AddIcon,
    GraphIcon: GraphIcon,
  };

  const featureCard = (iconName, featureText, isComingSoon = false) => {
    const IconComponentName = ICON_NAME[iconName];
    return (
      <div
        className={`flex bg-slate-200 py-4 px-3 rounded mb-4 ${
          isComingSoon && "relative"
        }`}
      >
        {isComingSoon && (
          <span className="absolute top-0 right-0 text-xs bg-blue-300 text-white rounded-bl-full px-2">
            coming soon
          </span>
        )}
        <IconComponentName />
        <p className="ml-4">{featureText}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <section className="text-center tracking-widest mb-8">
        <div className="text-3xl">
          Get <span className="font-bold">Stronger</span>
        </div>
        <div className="text-3xl">Be Consistent</div>
        <div className="text-3xl">See Results</div>
      </section>
      {buttonsToRender(token)}
      <section>
        {featureCard("NoteIcon", "Track sets, reps and weight")}
        {featureCard("CalenderIcon", "View previous workouts")}
        {featureCard("AddIcon", "Add your own exercises")}
        {featureCard("GraphIcon", "Comprehensive statistics", true)}
      </section>
    </div>
  );
}

export default Landing;
