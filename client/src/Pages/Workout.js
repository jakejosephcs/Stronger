import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCurrentDate, ICON_NAME } from "../utils";
import authService from "../services/auth-service";
import exerciseService from "../services/exercise-service";
import workoutService from "../services/workout-service";

import Container from "../components/shared/Container";
import WorkoutHeader from "../components/WorkoutHeader";
import WorkoutExerciseCard from "../components/WorkoutExerciseCard";
import ButtonNav from "../components/shared/ButtonNav";
import UICard from "../components/shared/UICard";
import Modal from "../components/shared/Modal";

function Workout() {
  const [PlusIcon, XIcon, AddIcon] = [
    ICON_NAME["PlusIcon"],
    ICON_NAME["XIcon"],
    ICON_NAME["AddIcon"],
  ];
  const navigate = useNavigate();

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
  const [fetchedExercises, setFetchedExercises] = useState([]);
  const [fetchedExerciesError, setFetchedExercisesError] = useState("");
  const [isfetchedExerciesLoading, setIsfetchedExerciesLoading] =
    useState(false);

  useEffect(() => {
    setIsfetchedExerciesLoading(true);
    exerciseService
      .getExercises(authService.getCurrentUser())
      .then((res) => {
        setFetchedExercises(res);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setFetchedExercisesError("Uh Oh! Something went wrong");
        }
      })
      .finally(() => {
        setIsfetchedExerciesLoading(false);
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
    // Do not add an exercise if already added
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
        exerciseName: ex.name,
        reps: ex.reps,
        weight: ex.weight,
      };
    });

    const workoutWithFormattedExercises = {
      ...workout,
      exercises: formattedExercises,
    };

    workoutService
      .createWorkout(
        authService.getCurrentUser(),
        workoutWithFormattedExercises
      )
      .then((res) => {
        setWorkout(workoutWithFormattedExercises);
        setIsWorkoutSubmitting(false);
        navigate("/home");
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setError(err.response.data);
        }
        setIsWorkoutSubmitting(false);
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

  const ModalExercises = () => {
    if (isfetchedExerciesLoading) {
      return <UICard text="Loading..." />;
    }

    if (fetchedExerciesError !== "") {
      return <UICard text={fetchedExerciesError} />;
    }

    if (fetchedExercises.length === 0) {
      return <UICard text="0 exercises created" />;
    }

    return fetchedExercises.map((ex) => {
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
        <Modal toggleModal={toggleModal} title="Select an exercise to add">
          <div
            className={
              fetchedExercises.length !== 0
                ? "overflow-auto h-40"
                : "flex justify-center items-center"
            }
          >
            <ModalExercises />
          </div>
          <span className="mt-3 text-xs">
            Don't see it?{" "}
            <Link to="/exercises" className="text-blue-500 font-bold">
              Create an exercise
            </Link>
          </span>
        </Modal>
      )}
    </>
  );
}

export default Workout;
