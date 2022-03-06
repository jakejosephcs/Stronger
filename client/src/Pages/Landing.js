import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import authService from "../services/auth-service";

import Container from "../components/shared/Container";
import ButtonPrimary from "../components/shared/ButtonPrimary";
import FeatureCard from "../components/FeatureCard";

const FEATURES = [
  {
    iconName: "NoteIcon",
    featureText: "Track sets, reps and weight",
    isComingSoon: false,
  },
  {
    iconName: "CalenderIconLight",
    featureText: "View previous workouts",
    isComingSoon: false,
  },
  {
    iconName: "AddIcon",
    featureText: "Add your own exercises",
    isComingSoon: false,
  },
  {
    iconName: "GraphIcon",
    featureText: "Comprehensive statistics",
    isComingSoon: true,
  },
];

function Landing() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
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
          text={currentUser ? "Workout" : "Register"}
          onClick={() => navigate(currentUser ? "/home" : "/registration")}
        />
        <ButtonPrimary
          text={currentUser ? "Logout" : "Login"}
          color={currentUser ? "bg-red-600" : null}
          onClick={currentUser ? handleLogout : () => navigate("/login")}
        />
      </section>
      <section>
        {FEATURES.map(({ iconName, featureText, isComingSoon }) => {
          return (
            <FeatureCard
              key={featureText}
              iconName={iconName}
              featureText={featureText}
              isComingSoon={isComingSoon}
            />
          );
        })}
      </section>
    </Container>
  );
}

export default Landing;
