const express = require("express");

const User = require("../models/User");

const router = express.Router();

// Getting all user's
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Getting a user by id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
