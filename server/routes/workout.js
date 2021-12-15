// # TO DO:
// - Add server side validation
// - Add error handling

const express = require("express");

const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
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

// Get all workouts
router.get("/", async (req, res) => {
  try {
    const allWorkouts = await Workout.find();
    res.json(allWorkouts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single workout
router.get("/:id", async (req, res) => {
  const workoutId = req.params.id;

  try {
    const workout = await Workout.findById(workoutId);
    if (!workout)
      return res.status(404).json({ error: "Workout does not exist" });
    res.json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add an exercise to a workout
router.post("/exercise/", async (req, res) => {
  const { exerciseId, workoutId, sets, reps, weights } = req.body;

  // sets: Number
  // reps: [Number, Number, ... , Number]
  // weight: [Number, Number, ... , Number]

  try {
    const exercise = await Exercise.findById(exerciseId);
    const workout = await Workout.findById(workoutId);

    workout.exercises.push(exercise);

    await workout.save();

    const newExercise = await Workout.findOne({
      "exercise.id": exerciseId,
    });

    for (let i = 0; i < sets; i++) {
      newExercise.exercises[0].sets.push({
        reps: reps[i],
        weight: weights[i],
      });
    }

    await newExercise.save();

    res.json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
