import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutCard from "../Components/WorkoutCard";
import ButtonNav from "../Components/ButtonNav";
import LinkIcon from "../Assests/LinkIcon";
import Container from "../Components/Container";
import UICard from "../Components/UICard";

function Home() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [userId, setUserId] = useState("61ca404e5a56d8505f193391");

  const [isLoadingWorkouts, setIsLoadingWorkouts] = useState(false);
  const [isDeletingExercise, setIsDeletingExercise] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoadingWorkouts(true);
    axios
      .get("http://localhost:5000/workouts/")
      .then((res) => {
        const allWorkouts = res.data;
        const userWorkouts = allWorkouts.filter(
          (workout) => workout.userId === userId
        );
        setWorkouts(userWorkouts);
        setIsLoadingWorkouts(false);
      })
      .catch((error) => {
        setIsLoadingWorkouts(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/exercises/").then((res) => {
      const allExercises = res.data;
      const userExercises = allExercises.filter(
        (exercise) => exercise.userId === userId
      );
      setExercises(userExercises);
    });
  }, []);

  const handleDeleteWorkout = (workout) => {
    setIsDeletingExercise(true);
    axios
      .delete(`http://localhost:5000/workouts/${workout._id}`, {
        data: {
          userId,
        },
      })
      .then((res) => {
        console.log(res);
        setWorkouts(workouts.filter((w) => w._id !== workout._id));
        setIsDeletingExercise(false);
      })
      .catch((e) => {
        console.log(e.response);
        setIsDeletingExercise(false);
      });
  };

  const componentToRender = (workouts, isLoadingWorkouts, error) => {
    if (isLoadingWorkouts) {
      return <UICard text="Loading..." />;
    }

    if (error) {
      return <UICard text="Uh Oh! Something went wrong" />;
    }

    if (workouts.length > 0) {
      return workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          handleDeleteWorkout={handleDeleteWorkout}
          exercises={exercises}
          isDeletingExercise={isDeletingExercise}
        />
      ));
    } else {
      return <UICard text="0 workouts complete" />;
    }
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
      {componentToRender(workouts, isLoadingWorkouts, error)}
    </Container>
  );
}

export default Home;
