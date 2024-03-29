const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { exerciseValidation } = require("../middleware/validation");

// @desc Get exercises based on user id
// @route GET /exercises
// @access Private
const getExercises = async (req, res) => {
  const { user: userId } = req;
  try {
    const exercises = await Exercise.find({ userId });
    if (!exercises) res.status(404).json({ error: "There are no exercises" });
    res.json(exercises);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Get exercise based on exercise id
// @route GET /exercises/:id
// @access Public
const getExercise = async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) res.status(404).json({ error: "Exercise does not exist" });
    res.json(exercise);
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Delete an exercise based on exercise id
// @route DELETE /exercises/:id
// @access Private
const deleteExercise = async (req, res) => {
  const exerciseId = req.params.id;
  const { user: userId } = req;

  try {
    const exercise = await Exercise.findById(exerciseId);
    const user = await User.findById(userId);

    if (!exercise.userId.equals(user._id)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    user.exercises.pull(exerciseId);
    await user.save();

    await Exercise.deleteOne({ _id: exerciseId });

    res.json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// @desc Create an exercise
// @route POST /exercises
// @access Private
const createExercise = async (req, res) => {
  // Input validation using Joi (exercise name is required)
  const { error } = exerciseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name } = req.body;
  // userId obtained from the authentication middleware
  const { user: userId } = req;

  const newExercise = new Exercise({
    userId,
    name,
  });

  try {
    // Find out if exercise already exists under the user
    const foundExercise = await Exercise.findOne({ name });
    if (foundExercise && foundExercise.userId.equals(userId)) {
      return res.status(400).send("Exercise already exists");
    }

    const savedExercise = await newExercise.save();

    const user = await User.findById(userId);
    user.exercises.push(savedExercise);
    await user.save();

    res.json(savedExercise);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getExercises,
  getExercise,
  deleteExercise,
  createExercise,
};
