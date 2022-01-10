const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const exerciseRoute = require("./routes/exercise");
const workoutRoute = require("./routes/workout");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION, () => {
  console.log("Connected to db");
});

app.use(cors());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);
app.use("/workouts", workoutRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
