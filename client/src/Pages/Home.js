import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CalenderIcon from "../Assests/CalenderIcon";
import LinkIcon from "../Assests/LinkIcon";
import TrashIcon from "../Assests/TrashIcon";
import axios from "axios";

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

  const renderExercises = (exercise) => {
    const exerciseName = exercises.find(
      (ex) => ex._id === exercise.exerciseId
    )?.name;

    return (
      <tr>
        <td className="text-center">{exercise.reps.length}</td>
        <td className="pl-1 max-w-[8rem] whitespace-nowrap overflow-hidden text-ellipses truncate">
          {exerciseName}
        </td>
        <td className="text-center">{Math.max(...exercise.weight)}</td>
      </tr>
    );
  };

  const renderWorkoutCard = (workout) => {
    return (
      <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs mb-5">
        <div className="flex justify-between">
          <h3 className="font-semibold">{workout.name}</h3>
          <button onClick={() => handleDeleteWorkout(workout)}>
            <TrashIcon />
          </button>
        </div>
        <div className="flex">
          <CalenderIcon />
          <span>{workout.date}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="font-medium">Sets</th>
              <th className="font-medium text-left pl-1">Exercises</th>
              <th className="font-medium">Best weight</th>
            </tr>
          </thead>
          <tbody>
            {workout.exercises.map((exercise) => renderExercises(exercise))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-sm items-center mx-auto">
      <div className="flex bg-slate-200 py-2 px-3 rounded mb-4">
        <LinkIcon />
        <Link to="/workout">
          <button className="ml-1">Start a new workout</button>
        </Link>
      </div>
      <div className="flex bg-slate-200 py-2 px-3 rounded mb-12">
        <LinkIcon />
        <Link to="/exercises">
          <button className="ml-1">View your exercises</button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Completed workouts</h1>
      {workouts.length > 0 ? (
        workouts.map((workout) => renderWorkoutCard(workout))
      ) : (
        <p className="my-6 text-slate-500 text-sm">0 workouts complete</p>
      )}
    </div>
  );
}

export default Home;
