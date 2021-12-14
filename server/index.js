const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const exerciseRoute = require("./routes/exercise");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION, () => {
  console.log("Connected to db");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);

app.listen(5000, () => {
  console.log("Server listening on PORT 5000");
});
