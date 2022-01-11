import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCurrentDate } from "../Utils";
import axios from "axios";
import Container from "../Components/Container";
import WorkoutHeader from "../Components/WorkoutHeader";
import WorkoutExerciseCard from "../Components/WorkoutExerciseCard";
import ButtonNav from "../Components/ButtonNav";
import UICard from "../Components/UICard";
import PlusIcon from "../Assests/PlusIcon";
import XIcon from "../Assests/XIcon";
import CloseIcon from "../Assests/CloseIcon";
import AddIcon from "../Assests/AddIcon";

function Workout() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [workout, setWorkout] = useState({
    name: "",
    notes: "",
    date: getCurrentDate(),
    exercises: [],
  });
  const [exercises, setExercises] = useState([]);
  const [isWorkoutSubmitting, setIsWorkoutSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedExercies, setFetchedExercises] = useState([]);
  const [fetchedExerciesError, setFetchedExercisesError] = useState("");
  const [isfetchedExerciesLoading, setIsfetchedExerciesLoading] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsfetchedExerciesLoading(true);
    axios
      .get("https://stronger-server.herokuapp.com/exercises/", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setFetchedExercises(res.data);
        setIsfetchedExerciesLoading(false);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setIsfetchedExerciesLoading(false);
          setFetchedExercisesError("Uh Oh! Something went wrong");
        }
      });
  }, []);

  const handleUpdateWorkout = (e) => {
    setError("");
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSet = (exercise) => {
    setError("");
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
    setError("");

    let isExerciseAlreadyAddded = false;
    exercises.forEach((ex) => {
      if (ex._id === exercise._id) {
        isExerciseAlreadyAddded = true;
      }
    });

    if (isExerciseAlreadyAddded) {
      return;
    }

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
    setError("");
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
    setError("");
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
    setIsWorkoutSubmitting(true);
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
      .post(
        "https://stronger-server.herokuapp.com/workouts/",
        workoutWithFormattedExercises,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        setIsWorkoutSubmitting(false);
        navigate("/home");
      })
      .catch((err) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setIsWorkoutSubmitting(false);
          setError(err.response.data);
        }
      });
  };

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handleRemoveExerciseFromWorkout = (exercise) => {
    setExercises(exercises.filter((ex) => ex._id !== exercise._id));
  };

  const renderWorkoutExerciseCard = () => {
    if (exercises.length === 0) {
      return <UICard text="0 exercises added" />;
    }

    return exercises.map((exercise) => (
      <WorkoutExerciseCard
        key={exercise._id}
        exercise={exercise}
        handleAddSet={handleAddSet}
        handleUpdateReps={handleUpdateReps}
        handleUpdateWeight={handleUpdateWeight}
        handleRemoveExerciseFromWorkout={handleRemoveExerciseFromWorkout}
      />
    ));
  };

  const renderModalExercises = () => {
    if (isfetchedExerciesLoading) {
      return <UICard text="Loading..." />;
    }

    if (fetchedExerciesError !== "") {
      return <UICard text={fetchedExerciesError} />;
    }

    if (fetchedExercies.length === 0) {
      return <UICard text="0 exercises created" />;
    }

    return fetchedExercies.map((ex) => {
      return (
        <div
          key={ex._id}
          className="flex justify-between w-56 bg-white py-2 px-3 rounded mb-3"
        >
          <h3 className="truncate text-ellipsis overflow-hidden">{ex.name}</h3>
          <button onClick={() => handleAddExerciseToWorkout(ex)}>
            <AddIcon />
          </button>
        </div>
      );
    });
  };

  return (
    <>
      <Container>
        <WorkoutHeader
          workout={workout}
          handleUpdateWorkout={handleUpdateWorkout}
          handleFinishWorkout={handleFinishWorkout}
          isWorkoutSubmitting={isWorkoutSubmitting}
        />
        {error && (
          <span className="mt-4 text-xs flex justify-center text-red-500">
            {error}
          </span>
        )}
        {renderWorkoutExerciseCard()}
        <div className="mt-5">
          <ButtonNav
            onClick={toggleModal}
            buttonText="Add an exercise"
            color="bg-blue-600"
            textColor="text-white"
          >
            <PlusIcon />
          </ButtonNav>
          <ButtonNav
            navigateTo="/home"
            buttonText="Cancel workout"
            color="bg-red-600"
            textColor="text-white"
          >
            <XIcon />
          </ButtonNav>
        </div>
      </Container>

      {isModalOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center h-screen">
          <div className="bg-gray-200 max-w-sm flex flex-col mx-auto items-center px-6 py-6 relative rounded">
            <button className="absolute top-2 right-2" onClick={toggleModal}>
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
              {renderModalExercises()}
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
