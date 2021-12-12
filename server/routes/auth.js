const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

require("dotenv").config();
const { signupValidation } = require("../validation");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // Input validation using Joi
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // JWT
    const token = await JWT.sign({ email }, process.env.SECRET_KEY);

    res.json({ email, password: hashedPassword, token });
  } catch (error) {
    res.status(500).json(error);
  }

  // # TO DO
  // - Check uniqueness of email when implemented the database
});

module.exports = router;
