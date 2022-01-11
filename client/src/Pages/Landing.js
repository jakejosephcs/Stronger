import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Container from "../Components/Container";
import ButtonPrimary from "../Components/ButtonPrimary";
import FeatureCard from "../Components/FeatureCard";

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

  const RenderButtons = ({ userToken }) => {
    if (userToken === "") {
      return (
        <section className="flex flex-col mb-10">
          <ButtonPrimary
            text="Register"
            onClick={() => navigate("/registration")}
          />
          <ButtonPrimary text="Login" onClick={() => navigate("/login")} />
        </section>
      );
    }
    return (
      <section className="flex flex-col mb-10">
        <ButtonPrimary text="Workout" onClick={() => navigate("/home")} />
        <ButtonPrimary
          text="Logout"
          color="bg-red-600"
          onClick={clearLocalStorage}
        />
      </section>
    );
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
      <RenderButtons userToken={token} />
      <section>
        <FeatureCard
          iconName="NoteIcon"
          featureText="Track sets, reps and weight"
        />
        <FeatureCard
          iconName="CalenderIcon"
          featureText="View previous workouts"
        />
        <FeatureCard iconName="AddIcon" featureText="Add your own exercises" />
        <FeatureCard
          iconName="GraphIcon"
          featureText="Comprehensive statistics"
          isComingSoon={true}
        />
      </section>
    </Container>
  );
}

export default Landing;
