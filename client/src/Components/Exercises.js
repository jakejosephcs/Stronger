import { useState, useEffect } from "react";
import axios from "axios";

function Exercises() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => setExercises(res.data));
  }, []);

  return (
    <div>
      {exercises ? (
        exercises.map((exercise) => <p>{exercise.name}</p>)
      ) : (
        <p>No exercises to show</p>
      )}
    </div>
  );
}

export default Exercises;
