const jwt = require("jsonwebtoken");
require("dotenv").config;

const authToken = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ error: "Token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user._id;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authToken;
