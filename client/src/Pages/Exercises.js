import { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "../Assests/CloseIcon";
import ButtonNav from "../Components/ButtonNav";
import ExerciseCard from "../Components/ExerciseCard";
import Container from "../Components/Container";
import LinkIcon from "../Assests/LinkIcon";
import UICard from "../Components/UICard";
import ButtonPrimary from "../Components/ButtonPrimary";

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("61ca404e5a56d8505f193391");
  const [newExerciseName, setNewExerciseName] = useState("");

  const [isExercisesLoading, setIsExercisesLoading] = useState(false);
  const [exercisesError, setExercisesError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCreateExerciseLoading, setIsCreateExerciseLoading] = useState(false);
  const [createExerciseError, setCreateExerciseError] = useState("");

  useEffect(() => {
    setIsExercisesLoading(true);
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        const allExercises = res.data;
        const userExercises = allExercises.filter(
          (exercise) => exercise.userId === userId
        );
        setExercises(userExercises);
        setIsExercisesLoading(false);
      })
      .catch((error) => {
        setIsExercisesLoading(false);
        setExercisesError(true);
      });
  }, []);

  const handleDeleteExercise = (exerciseId) => {
    axios
      .delete(`http://localhost:5000/exercises/${exerciseId}`, {
        data: {
          userId: userId,
        },
      })
      .then((res) => {
        const filteredExercises = exercises.filter(
          (exercise) => exercise._id !== exerciseId
        );
        setExercises(filteredExercises);
      })
      .catch((e) => console.log(e));
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
        exercise={exercise}
        handleDeleteExercise={handleDeleteExercise}
      />
    ));
  };

  const handleCreateNewExercise = () => {
    setIsCreateExerciseLoading(true);
    const newExercise = {
      userId: userId,
      name: newExerciseName.toLowerCase(),
      description: "test",
      category: "test",
    };

    axios
      .post("http://localhost:5000/exercises/", newExercise)
      .then((res) => {
        setExercises((exercises) => exercises.concat(newExercise));
        setIsModalOpen(false);
        setIsCreateExerciseLoading(false);
        setNewExerciseName("");
      })
      .catch((err) => {
        setCreateExerciseError(err.response.data);
        setIsCreateExerciseLoading(false);
        setNewExerciseName("");
      });
  };

  const toggleModal = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
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
              onClick={handleCreateNewExercise}
              text={isCreateExerciseLoading ? "Creating..." : "Create"}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Exercise;
