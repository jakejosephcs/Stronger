import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ICON_NAME } from "../utils";
import authService from "../services/auth-service";
import workoutService from "../services/workout-service";

import Container from "../components/shared/Container";
import WorkoutCard from "../components/WorkoutCard";
import UICard from "../components/shared/UICard";
import ButtonNav from "../components/shared/ButtonNav";

const BUTTONS = [
  {
    navigateTo: "/workout",
    buttonText: "Start a new workout",
  },
  {
    navigateTo: "/exercises",
    buttonText: "View your exercises",
  },
];

function Home() {
  const LinkIcon = ICON_NAME["LinkIcon"];
  const navigate = useNavigate();

  // States associated with workouts
  const [workouts, setWorkouts] = useState([]);
  const [isWorkoutsLoading, setisWorkoutsLoading] = useState(false);
  const [isDeletingWorkouts, setIsDeletingWorkouts] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setisWorkoutsLoading(true);
    workoutService
      .getWorkouts(authService.getCurrentUser())
      .then((res) => {
        setWorkouts(res);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setError(true);
        }
      })
      .finally(() => {
        setisWorkoutsLoading(false);
      });
  }, []);

  const handleDeleteWorkout = (w) => {
    setIsDeletingWorkouts(true);
    workoutService
      .deleteWorkout(authService.getCurrentUser(), w._id)
      .then(() => {
        setWorkouts(workouts.filter((workout) => workout._id !== w._id));
      })
      .finally(() => setIsDeletingWorkouts(false));
  };

  const WorkoutCards = () => {
    if (isWorkoutsLoading) {
      return <UICard text="Loading..." />;
    }

    if (error) {
      return <UICard text="Uh Oh! Something went wrong" />;
    }

    if (workouts.length === 0) {
      return <UICard text="0 workouts complete" />;
    }

    return workouts.map((workout) => (
      <WorkoutCard
        key={workout._id}
        workout={workout}
        handleDeleteWorkout={handleDeleteWorkout}
        isDeletingWorkouts={isDeletingWorkouts}
      />
    ));
  };

  return (
    <Container>
      {BUTTONS.map(({ navigateTo, buttonText }) => {
        return (
          <ButtonNav
            navigateTo={navigateTo}
            buttonText={buttonText}
            key={buttonText}
          >
            <LinkIcon />
          </ButtonNav>
        );
      })}
      <h1 className="text-2xl font-bold my-4">Completed workouts</h1>
      <WorkoutCards />
    </Container>
  );
}

export default Home;
