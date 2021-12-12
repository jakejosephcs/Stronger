const express = require("express");
const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);

app.listen(5000, () => {
  console.log("Server listening on PORT 5000");
});
