const express = require("express");

const Workout = require("../models/Workout");
const User = require("../models/User");

const router = express.Router();

// Create a workout
router.post("/", async (req, res) => {
  const { userId, name, notes } = req.body;

  const newWorkout = new Workout({
    userId,
    name,
    notes,
  });

  try {
    const savedWorkout = await newWorkout.save();

    const user = await User.findById(userId);
    user.workouts.push(savedWorkout);
    await user.save();

    res.json(savedWorkout);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
