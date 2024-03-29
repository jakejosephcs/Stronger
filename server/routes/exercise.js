const router = require("express").Router();
const authentication = require("../middleware/authentication");
const {
  getExercises,
  getExercise,
  deleteExercise,
  createExercise,
} = require("../controller/exerciseController");

// Create a new exercise
router.post("/", authentication, createExercise);

// Get all exercises
router.get("/", authentication, getExercises);

// Get a particular exercise based on id
router.get("/:id", getExercise);

// Delete an exercise
router.delete("/:id", authentication, deleteExercise);

module.exports = router;
