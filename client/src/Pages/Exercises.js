import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ExericseContext } from "../Context/exerciseContext";
import axios from "axios";

import ExerciseCard from "../Components/ExerciseCard";
import UICard from "../Components/UICard";
import ButtonPrimary from "../Components/ButtonPrimary";
import ButtonNav from "../Components/ButtonNav";
import Container from "../Components/Container";
import CloseIcon from "../Assests/CloseIcon";
import LinkIcon from "../Assests/LinkIcon";

function Exercise() {
  const {
    token,
    exercises,
    isExercisesLoading,
    exercisesError,
    handleDeleteExercise,
    handleCreateNewExercise,
    createExerciseError,
    setCreateExerciseError,
    redirect,
  } = useContext(ExericseContext);

  // States associated with the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
    setCreateExerciseError("");
  };

  const createExercise = () => {
    handleCreateNewExercise(newExerciseName);
    toggleModal();
  };

  const displayExercises = () => {
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
          {displayExercises()}
        </div>
      </Container>

      {isModalOpen && (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center h-screen">
          <div className="bg-gray-200 max-w-sm flex flex-col mx-auto items-center px-6 py-6 relative rounded">
            <button className="absolute top-2 right-2" onClick={toggleModal}>
              <CloseIcon />
            </button>
            <h3 className="mt-2 font-bold mb-3">Create a new exercise</h3>
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
              onClick={createExercise}
              text={isExercisesLoading ? "Creating..." : "Create"}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Exercise;
