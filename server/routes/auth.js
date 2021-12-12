const express = require("express");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
});

module.exports = router;
