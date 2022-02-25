const { workoutValidation } = require("../middleware/validation");
const Workout = require("../models/Workout");
const User = require("../models/User");

// @desc Get workouts
// @route GET /workouts
// @access Private
const getWorkouts = async (req, res) => {
  const { user: userId } = req;

  try {
    const allWorkouts = await Workout.find({ userId });
    res.json(allWorkouts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Get workout based on id
// @route GET /workout/:id
// @access Public
const getWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const workout = await Workout.findById(workoutId);
    if (!workout)
      return res.status(404).json({ error: "Workout does not exist" });
    res.json(workout);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Delete workout based on id
// @route DELETE /workouts
// @access Private
const deleteWorkout = async (req, res) => {
  const workoutId = req.params.id;
  const { user: userId } = req;

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

    // Delete the workout
    await Workout.deleteOne({ _id: workoutId });

    res.send("deleted");
  } catch (e) {
    res.status(500).send(e);
  }
};

// @desc Create workout
// @route POST /workouts
// @access Private
const createWorkout = async (req, res) => {
  // Input validation using Joi
  const { error } = workoutValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, notes, date, exercises } = req.body;
  const { user: userId } = req;

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
};

module.exports = {
  getWorkouts,
  getWorkout,
  deleteWorkout,
  createWorkout,
};
