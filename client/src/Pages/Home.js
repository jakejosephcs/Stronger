import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Container from "../Components/Container";
import WorkoutCard from "../Components/WorkoutCard";
import UICard from "../Components/UICard";
import ButtonNav from "../Components/ButtonNav";
import LinkIcon from "../Assests/LinkIcon";

function Home() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [workouts, setWorkouts] = useState([]);
  const [isLoadingWorkouts, setIsLoadingWorkouts] = useState(false);

  const [exercises, setExercises] = useState([]);
  const [isDeletingExercise, setIsDeletingExercise] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingWorkouts(true);
    axios
      .get("http://localhost:5000/workouts/", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setWorkouts(res.data);
        setIsLoadingWorkouts(false);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setIsLoadingWorkouts(false);
          setError(true);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setExercises(res.data);
      });
  }, []);

  const handleDeleteWorkout = (workout) => {
    setIsDeletingExercise(true);
    axios
      .delete(`http://localhost:5000/workouts/${workout._id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setWorkouts(workouts.filter((w) => w._id !== workout._id));
        setIsDeletingExercise(false);
      })
      .catch((e) => {
        setIsDeletingExercise(false);
      });
  };

  const componentToRender = () => {
    if (isLoadingWorkouts) {
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
        exercises={exercises}
        isDeletingExercise={isDeletingExercise}
      />
    ));
  };

  return (
    <Container>
      <ButtonNav navigateTo="/workout" buttonText="Start a new workout">
        <LinkIcon />
      </ButtonNav>
      <ButtonNav navigateTo="/exercises" buttonText="View your exercises">
        <LinkIcon />
      </ButtonNav>
      <h1 className="text-2xl font-bold my-4">Completed workouts</h1>
      {componentToRender()}
    </Container>
  );
}

export default Home;
