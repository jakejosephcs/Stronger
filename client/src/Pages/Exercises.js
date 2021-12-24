import { useState, useEffect } from "react";
import axios from "axios";
import LinkIcon from "../Assests/LinkIcon";
import DeleteIcon from "../Assests/DeleteIcon";

function Exercise() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => setExercises(res.data));
  }, []);

  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <div className="flex bg-slate-200 py-2 px-3 rounded mb-12">
        <LinkIcon />
        <button className="ml-1">Create a new exercise</button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">All exercises</h1>
        {exercises.map((exercise) => (
          <div className="flex justify-between w-56 bg-slate-200 py-2 px-3 rounded mb-4">
            <h3 className="truncate text-ellipsis overflow-hidden">
              {exercise.name}
            </h3>
            <DeleteIcon />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercise;
