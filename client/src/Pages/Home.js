import { useState, useEffect } from "react";
import axios from "axios";
import WorkoutCard from "../Components/WorkoutCard";
import ButtonNav from "../Components/ButtonNav";
import LinkIcon from "../Assests/LinkIcon";

function Home() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [userId, setUserId] = useState("61ca404e5a56d8505f193391");

  useEffect(() => {
    axios.get("http://localhost:5000/workouts/").then((res) => {
      const allWorkouts = res.data;
      const userWorkouts = allWorkouts.filter(
        (workout) => workout.userId === userId
      );
      setWorkouts(userWorkouts);
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
    console.log("handleDeleteWorkout: ", workout);
    axios
      .delete(`http://localhost:5000/workouts/${workout._id}`, {
        data: {
          userId,
        },
      })
      .then((res) => {
        console.log(res);
        setWorkouts(workouts.filter((w) => w._id !== workout._id));
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <div className="flex flex-col max-w-sm items-center mx-auto">
      <ButtonNav navigateTo="/workout" buttonText="Start a new workout">
        <LinkIcon />
      </ButtonNav>
      <ButtonNav navigateTo="/exercises" buttonText="View your exercises">
        <LinkIcon />
      </ButtonNav>
      <h1 className="text-2xl font-bold my-4">Completed workouts</h1>
      {workouts.length > 0 ? (
        workouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            handleDeleteWorkout={handleDeleteWorkout}
            exercises={exercises}
          />
        ))
      ) : (
        <p className="my-6 text-slate-500 text-sm">0 workouts complete</p>
      )}
    </div>
  );
}

export default Home;
