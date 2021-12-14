const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
