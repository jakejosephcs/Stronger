// Importing required packages
const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Configuring our environment variables
require("dotenv").config();

// Importing required files
const User = require("../models/User");
const { signupValidation } = require("../validation");

// Creating a router using express
const router = express.Router();

// Signing a user up
router.post("/signup", async (req, res) => {
  // Input validation using Joi
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { email, password } = req.body;

  //   // Checking if the user's email is already inside the database
  //   const emailExists = await User.findOne({ email });
  //   if (emailExists)
  //     return res.status(400).send({ error: "Email already exists" });

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

    res.json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }

  // # TO DO
  // - Add JWT
});

module.exports = router;
