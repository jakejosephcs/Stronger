import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "../Assests/DeleteIcon";
import PlusIcon from "../Assests/PlusIcon";
import XIcon from "../Assests/XIcon";
import CloseIcon from "../Assests/CloseIcon";
import UnCheckedCheckMark from "../Assests/UnCheckedCheckMark";
import AddIcon from "../Assests/AddIcon";
import { ExerciseContext } from "../Context/ExerciseContext";
import Container from "../Components/Container";
import WorkoutHeader from "../Components/WorkoutHeader";
import { getCurrentDate } from "../Utils";
import WorkoutExerciseCard from "../Components/WorkoutExerciseCard";

function Workout() {
  const [workout, setWorkout] = useState({
    userId: "61ca404e5a56d8505f193391",
    name: "",
    notes: "",
    date: getCurrentDate(),
    exercises: [],
  });
  const [exercises, setExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedExercies, setFetchedExercises] = useState([]);
  const navigate = useNavigate();

  const { name } = useContext(ExerciseContext);

  useEffect(() => {
    axios.get("http://localhost:5000/exercises/").then((res) => {
      const allExercises = res.data;
      const userExercises = allExercises.filter(
        (exercise) => exercise.userId === workout.userId
      );
      setFetchedExercises(userExercises);
    });
  }, []);

  const handleUpdateWorkout = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSet = (exercise) => {
    setExercises(
      exercises.map((ex) => {
        if (ex._id === exercise._id) {
          return {
            ...ex,
            reps: [...ex.reps, 0],
            weight: [...ex.weight, 0],
          };
        }
        return ex;
      })
    );
  };

  const handleAddExerciseToWorkout = (exercise) => {
    setExercises([
      ...exercises,
      {
        ...exercise,
        reps: [0],
        weight: [0],
      },
    ]);
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handleUpdateWeight = (event, exercise, index) => {
    setExercises(
      exercises.map((ex) => {
        if (ex._id === exercise._id) {
          let updatedWeight = [...ex.weight];
          updatedWeight[index] = parseInt(event.target.value);
          return {
            ...ex,
            weight: updatedWeight,
          };
        }
        return ex;
      })
    );
  };

  const handleUpdateReps = (event, exercise, index) => {
    setExercises(
      exercises.map((ex) => {
        if (ex._id === exercise._id) {
          let updatedReps = [...ex.reps];
          updatedReps[index] = parseInt(event.target.value);
          return {
            ...ex,
            reps: updatedReps,
          };
        }
        return ex;
      })
    );
  };

  const handleFinishWorkout = () => {
    const formattedExercises = exercises.map((ex) => {
      return {
        exerciseId: ex._id,
        reps: ex.reps,
        weight: ex.weight,
      };
    });

    const workoutWithFormattedExercises = {
      ...workout,
      exercises: formattedExercises,
    };

    setWorkout(workoutWithFormattedExercises);

    axios
      .post("http://localhost:5000/workouts/", workoutWithFormattedExercises)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Container>
        <WorkoutHeader
          workout={workout}
          handleUpdateWorkout={handleUpdateWorkout}
          handleFinishWorkout={handleFinishWorkout}
        />
        {exercises.length !== 0 ? (
          exercises.map((exercise) => (
            <WorkoutExerciseCard
              exercise={exercise}
              handleAddSet={handleAddSet}
              handleUpdateReps={handleUpdateReps}
              handleUpdateWeight={handleUpdateWeight}
            />
          ))
        ) : (
          <p className="my-6 text-slate-500 text-sm">0 exercises added</p>
        )}
        <div className="flex bg-red-600 py-2 px-3 rounded mb-4 ">
          <PlusIcon />
          <button
            className="text-white ml-2"
            onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
          >
            Add an exercise {name}
          </button>
        </div>
        <div className="flex bg-blue-600 py-2 px-3 rounded mb-4">
          <XIcon />
          <button className="text-white ml-2" onClick={() => navigate("/home")}>
            Cancel workout
          </button>
        </div>
      </Container>
      {isModalOpen && (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
          <div className="bg-gray-200 max-w-sm flex flex-col mx-auto items-center px-6 py-6 relative rounded">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            >
              <CloseIcon />
            </button>
            <h3 className="mt-2 font-bold mb-3">Select an exercise to add</h3>
            <div
              className={
                fetchedExercies.length !== 0
                  ? "overflow-auto h-40"
                  : "flex justify-center items-center"
              }
            >
              {fetchedExercies.length !== 0 ? (
                fetchedExercies.map((ex) => {
                  return (
                    <div
                      key={ex._id}
                      className="flex justify-between w-56 bg-white py-2 px-3 rounded mb-4"
                    >
                      <h3 className="truncate text-ellipsis overflow-hidden">
                        {ex.name}
                      </h3>
                      <button onClick={() => handleAddExerciseToWorkout(ex)}>
                        <AddIcon />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="my-6 text-slate-500 text-sm">0 results</p>
              )}
            </div>
            <span className="mt-3 text-xs">
              Don't see it?{" "}
              <Link to="/exercises" className="text-blue-500 font-bold">
                Create an exercise
              </Link>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Workout;
