// Importing required packages
const express = require("express");
const { createUser, loginUser } = require("../controller/authController");

// Creating a router using express
const router = express.Router();

// Signing a user up
router.post("/signup", createUser);

// Logging in a user
router.post("/login", loginUser);

module.exports = router;
