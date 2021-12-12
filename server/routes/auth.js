const express = require("express");
const { signupValidation } = require("../validation");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { error } = signupValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  res.json({ email, password });
});

module.exports = router;
