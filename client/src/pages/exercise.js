import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ICON_NAME } from "../utils";
import authService from "../services/auth-service";
import exerciseService from "../services/exercise-service";

import ExerciseCard from "../components/ExerciseCard";
import UICard from "../components/shared/UICard";
import ButtonPrimary from "../components/shared/ButtonPrimary";
import ButtonNav from "../components/shared/ButtonNav";
import Container from "../components/shared/Container";
import Modal from "../components/shared/Modal";

function Exercise() {
  const LinkIcon = ICON_NAME["LinkIcon"];
  const navigate = useNavigate();

  // States associated with exercises
  const [exercises, setExercises] = useState([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(false);
  const [exercisesError, setExercisesError] = useState(false);

  // States associated with the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [isCreateExerciseLoading, setIsCreateExerciseLoading] = useState(false);
  const [createExerciseError, setCreateExerciseError] = useState("");

  // Get all exercises and validate user on component mount
  useEffect(() => {
    setIsExercisesLoading(true);
    exerciseService
      .getExercises(authService.getCurrentUser())
      .then((res) => {
        setExercises(res);
      })
      .catch((error) => {
        // Redirect the user to /login if they do not have access
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        } else {
          setExercisesError(true);
        }
      })
      .finally(() => {
        setIsExercisesLoading(false);
      });
  }, []);

  const handleDeleteExercise = (exerciseId) => {
    setIsExercisesLoading(true);
    exerciseService
      .deleteExercise(authService.getCurrentUser(), exerciseId)
      .then(() => {
        setExercises(
          exercises.filter((exercise) => exercise._id !== exerciseId)
        );
      })
      .finally(() => {
        setIsExercisesLoading(false);
      });
  };

  const handleCreateNewExercise = () => {
    setIsCreateExerciseLoading(true);
    const newExercise = {
      name: newExerciseName.toLowerCase(),
    };
    exerciseService
      .createExercise(authService.getCurrentUser(), newExercise)
      .then((res) => {
        setExercises((exercises) => exercises.concat(res));
        setIsModalOpen(false);
      })
      .catch((err) => {
        setCreateExerciseError(err.response.data);
      })
      .finally(() => {
        setIsCreateExerciseLoading(false);
        setNewExerciseName("");
      });
  };

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
    setCreateExerciseError("");
  };

  const ExerciseCards = () => {
    if (isExercisesLoading) {
      return <UICard text="Loading..." />;
    }

    if (exercisesError) {
      return <UICard text="Uh Oh! Something went wrong" />;
    }

    if (exercises.length === 0) {
      return <UICard text="0 exercises exist" />;
    }

    return exercises.map((exercise) => (
      <ExerciseCard
        key={exercise._id}
        exercise={exercise}
        handleDeleteExercise={handleDeleteExercise}
      />
    ));
  };

  return (
    <>
      <Container>
        <ButtonNav navigateTo="/workout" buttonText="Start a new workout">
          <LinkIcon />
        </ButtonNav>
        <ButtonNav buttonText="Create a new exercise" onClick={toggleModal}>
          <LinkIcon />
        </ButtonNav>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">All exercises</h1>
          <ExerciseCards />
        </div>
      </Container>

      {isModalOpen && (
        <Modal toggleModal={toggleModal} title="Create a new exercise">
          <span className="text-xs flex justify-center mb-2 text-red-500">
            {createExerciseError}
          </span>
          <input
            className="px-3 py-1 text-sm mb-4"
            type="text"
            value={newExerciseName}
            onChange={(e) => {
              setNewExerciseName(e.target.value);
              setCreateExerciseError("");
            }}
            placeholder="Exercise name"
          />
          <ButtonPrimary
            onClick={handleCreateNewExercise}
            text={isCreateExerciseLoading ? "Creating..." : "Create"}
          />
        </Modal>
      )}
    </>
  );
}

export default Exercise;
