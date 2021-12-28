// Importing required packages
const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Configuring our environment variables
require("dotenv").config();

// Importing required files
const User = require("../models/User");
const { authValidation } = require("../validation");

// Creating a router using express
const router = express.Router();

// Signing a user up
router.post("/signup", async (req, res) => {
  // Input validation using Joi
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // Checking if the user's email is already inside the database
  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already exists");

  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save user to the database
    const user = await newUser.save();

    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Logging in a user
router.post("/login", async (req, res) => {
  // Input validation using Joi
  const { error } = authValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    // Get the user from the database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    // Checking if the password provided is correct
    const isUserPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isUserPasswordCorrect)
      return res.status(400).send("Invalid email or password");

    // Create and assign a JWT token
    const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.json({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
