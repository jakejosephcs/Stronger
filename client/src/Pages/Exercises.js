// # TO DO
// - Get user's id from local storage
// - Error handling when user tries to delete an exercise that isn't theirs
//   (already showing exercises that only belong to the user )

import { useState, useEffect } from "react";
import axios from "axios";
import LinkIcon from "../Assests/LinkIcon";
import DeleteIcon from "../Assests/DeleteIcon";
import CloseIcon from "../Assests/CloseIcon";

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [userId, setUserId] = useState("61c7934ca2da76efc8b719a6");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost:5000/exercises/").then((res) => {
      const allExercises = res.data;
      const userExercises = allExercises.filter(
        (exercise) => exercise.userId === userId
      );
      setExercises(userExercises);
      setIsLoading(false);
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
    return exercises.map((exercise) => (
      <div
        key={exercise._id}
        className="flex justify-between w-56 bg-slate-200 py-2 px-3 rounded mb-4"
      >
        <h3 className="truncate text-ellipsis overflow-hidden">
          {exercise.name}
        </h3>
        <button onClick={() => handleDeleteExercise(exercise._id)}>
          <DeleteIcon />
        </button>
      </div>
    ));
  };

  const handleCreateNewExercise = () => {
    const newExercise = {
      userId: userId,
      name: newExerciseName,
      description: "test",
      category: "test",
    };

    console.log(newExercise);

    axios.post("http://localhost:5000/exercises/", newExercise).then((res) => {
      setExercises((exercises) => exercises.concat(newExercise));
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <div className="flex flex-col max-w-sm mx-auto items-center">
        <div className="flex bg-slate-200 py-2 px-3 rounded mb-12">
          <LinkIcon />
          <button
            className="ml-1"
            onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
          >
            Create a new exercise
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">All exercises</h1>
          {isLoading ? <p>Loading...</p> : displayExercises()}
        </div>
      </div>

      {isModalOpen && (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
          <div className="bg-gray-200 max-w-sm flex flex-col">
            <button
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            >
              <CloseIcon />
            </button>
            <h3>Create a new exercise</h3>
            <input
              type="text"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
            />
            <button onClick={handleCreateNewExercise}>Create</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Exercise;
