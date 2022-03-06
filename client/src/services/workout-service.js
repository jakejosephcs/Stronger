import axios from "axios";

const API_URL = `${process.env.REACT_APP_LOCAL_URL}/workouts`;

const createWorkout = (token, newWorkout) => {
  return axios
    .post(API_URL, newWorkout, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const getWorkouts = (token) => {
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

const deleteWorkout = (token, workoutId) => {
  return axios
    .delete(API_URL + `/${workoutId}`, {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
};

const workoutService = {
  createWorkout,
  getWorkouts,
  deleteWorkout,
};

export default workoutService;
