const express = require("express");
const { workoutValidation } = require("../middleware/validation");
const authentication = require("../middleware/authentication");
const {
  getWorkouts,
  getWorkout,
  deleteWorkout,
  createWorkout,
} = require("../controller/workoutController");

const router = express.Router();

// Create a workout
router.post("/", authentication, createWorkout);

// Get all workouts
router.get("/", authentication, getWorkouts);

// Get a single workout
router.get("/:id", getWorkout);

// Delete a workout
router.delete("/:id", authentication, deleteWorkout);

module.exports = router;
