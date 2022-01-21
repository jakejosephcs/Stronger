import React, { useState, useEffect } from "react";
import axios from "axios";

const ExericseContext = React.createContext();

function ExericseContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [exercises, setExercises] = useState([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(false);
  const [exercisesError, setExercisesError] = useState(false);

  const [createExerciseError, setCreateExerciseError] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setIsExercisesLoading(true);
    axios
      .get(`${process.env.REACT_APP_LOCAL_URL}/exercises/`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setExercises(res.data);
        setIsExercisesLoading(false);
        setExercisesError(false);
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setRedirect(true);
        } else {
          setIsExercisesLoading(false);
          setExercisesError(true);
        }
      });
  }, []);

  const handleDeleteExercise = (exerciseId) => {
    setIsExercisesLoading(true);
    axios
      .delete(`${process.env.REACT_APP_LOCAL_URL}/exercises/${exerciseId}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        const filteredExercises = exercises.filter(
          (exercise) => exercise._id !== exerciseId
        );
        setExercises(filteredExercises);
        setIsExercisesLoading(false);
      })
      .catch((e) => setIsExercisesLoading(false));
  };

  const handleCreateNewExercise = (exerciseName) => {
    setIsExercisesLoading(true);
    const newExercise = {
      name: exerciseName.toLowerCase(),
    };

    axios
      .post(`${process.env.REACT_APP_LOCAL_URL}/exercises/`, newExercise, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setExercises((exercises) => exercises.concat(newExercise));
        setIsExercisesLoading(false);
      })
      .catch((err) => {
        setCreateExerciseError(err.response.data);
        setIsExercisesLoading(false);
      });
  };

  return (
    <ExericseContext.Provider
      value={{
        token,
        exercises,
        isExercisesLoading,
        exercisesError,
        handleDeleteExercise,
        handleCreateNewExercise,
        createExerciseError,
        setCreateExerciseError,
        redirect,
      }}
    >
      {props.children}
    </ExericseContext.Provider>
  );
}

export { ExericseContextProvider, ExericseContext };
