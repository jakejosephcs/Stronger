import axios from "axios";

const API_URL = `${process.env.REACT_APP_LOCAL_URL}/auth`;

const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      return response.data.token;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data.token;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
