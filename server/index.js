const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION, () => {
  console.log("Connected to db");
});

app.use(cors());
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));
app.use("/exercises", require("./routes/exercise"));
app.use("/workouts", require("./routes/workout"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
