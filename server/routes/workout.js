// # TO DO:
// - Add server side validation
// - Add error handling

const express = require("express");
const { workoutValidation } = require("../validation");

const Workout = require("../models/Workout");
const User = require("../models/User");

const router = express.Router();

// Create a workout
router.post("/", async (req, res) => {
  // Input validation using Joi
  const { error } = workoutValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userId, name, notes, date, exercises } = req.body;

  const newWorkout = new Workout({
    userId,
    name,
    notes,
    date,
    exercises,
  });

  try {
    // Save the new workout
    const savedWorkout = await newWorkout.save();

    // Add the workout to the user's workout array
    const user = await User.findById(userId);
    user.workouts.push(savedWorkout);
    await user.save();

    // Add the workout to each exercise's workout array
    // -- Do i need this?

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

// Delete a workout
router.delete("/:id", async (req, res) => {
  const workoutId = req.params.id;
  const { userId } = req.body;

  try {
    // Get the workout
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).send("Workout does not exist");
    }

    // Check if the userId attached to the workout matched the user trying to delete it
    if (!workout.userId.equals(userId)) {
      return res
        .status(400)
        .send("Do not have permission to delete this exericse");
    }

    // Remove the workout id from the User's workout array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    user.workouts.pull(workoutId);
    await user.save();

    // Remove all workouts from each exercise's workout array
    // -- Do i need this? Haven't workouts to the exercise's workout array
    // workout.exercises.map(async (exercise) => {
    //   const foundExercise = await Exercise.findById(exercise.exerciseId);
    //   if (!foundExercise) {
    //     return res.status(400).send("Exercise already deleted");
    //   }
    //   foundExercise.workouts.pull(workoutId);
    //   await foundExercise.save();
    // });

    // Delete the workout
    await Workout.deleteOne({ _id: workoutId });

    res.send("deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
