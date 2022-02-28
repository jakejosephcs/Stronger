import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Container from "../Components/Container";
import ButtonPrimary from "../Components/ButtonPrimary";
import FeatureCard from "../Components/FeatureCard";

const FEATURES = [
  {
    iconName: "NoteIcon",
    featureText: "Track sets, reps and weight",
  },
  {
    iconName: "CalenderIcon",
    featureText: "View previous workouts",
  },
  {
    iconName: "GraphIcon",
    featureText: "Comprehensive statistics",
  },
];

function Landing() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken !== "") {
      setToken(localStorageToken);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.setItem("token", "");
    setToken("");
    navigate("/login");
  };

  return (
    <Container>
      <section className="text-center tracking-widest mb-8">
        <div className="text-3xl">
          Get <span className="font-bold">Stronger</span>
        </div>
        <div className="text-3xl">Be Consistent</div>
        <div className="text-3xl">See Results</div>
      </section>
      <section className="flex flex-col mb-5">
        <ButtonPrimary
          text={token ? "Workout" : "Register"}
          onClick={() => navigate(token ? "/registration" : "/home")}
        />
        <ButtonPrimary
          text={token ? "Logout" : "Login"}
          color={token ? "bg-red-600" : "bg-blue-500"}
          onClick={clearLocalStorage}
        />
      </section>
      <section>
        {FEATURES.map(({ iconName, featureText }) => {
          return (
            <FeatureCard
              key={featureText}
              iconName={iconName}
              featureText={featureText}
            />
          );
        })}
      </section>
    </Container>
  );
}

export default Landing;
