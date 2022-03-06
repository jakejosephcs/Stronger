import axios from "axios";

const API_URL = `${process.env.REACT_APP_LOCAL_URL}/exercises`;

const createExercise = (token, newExercise) => {
  return axios
    .post(API_URL, newExercise, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const getExercises = (token) => {
  return axios
    .get(API_URL, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const deleteExercise = (token, exerciseId) => {
  return axios
    .delete(API_URL + `/${exerciseId}`, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const exerciseService = {
  createExercise,
  getExercises,
  deleteExercise,
};

export default exerciseService;
