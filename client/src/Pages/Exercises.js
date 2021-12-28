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
  const [userId, setUserId] = useState("61ca404e5a56d8505f193391");
  const [isExercisesLoading, setIsExercisesLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [error, setError] = useState("");
  const [isCreateExerciseLoading, setIsCreateExerciseLoading] = useState(false);

  useEffect(() => {
    setIsExercisesLoading(true);
    axios.get("http://localhost:5000/exercises/").then((res) => {
      const allExercises = res.data;
      const userExercises = allExercises.filter(
        (exercise) => exercise.userId === userId
      );
      setExercises(userExercises);
      setIsExercisesLoading(false);
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
    if (exercises.length === 0) {
      return <p className="my-6 text-slate-500 text-sm">0 exercises exist</p>;
    }

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
        setError(err.response.data);
        setIsCreateExerciseLoading(false);
        setNewExerciseName("");
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
          {isExercisesLoading ? <p>Loading...</p> : displayExercises()}
        </div>
      </div>

      {isModalOpen && (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
          <div className="bg-gray-200 max-w-sm flex flex-col mx-auto items-center px-6 py-6 relative rounded">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            >
              <CloseIcon />
            </button>
            <h3 className="mt-2 font-bold mb-3">Create a new exercise</h3>
            <span className="text-xs flex justify-center mb-2 text-red-500">
              {error}
            </span>
            <input
              className="px-3 py-1 text-sm"
              type="text"
              value={newExerciseName}
              onChange={(e) => {
                setNewExerciseName(e.target.value);
                setError("");
              }}
              placeholder="Exercise name"
            />
            <button
              onClick={handleCreateNewExercise}
              className="mt-3 bg-blue-500 py-1 px-3 rounded-full text-gray-200"
            >
              {isCreateExerciseLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Exercise;
