const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  exercises: [
    {
      exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      exerciseName: {
        type: String,
      },
      reps: [Number],
      weight: [Number],
    },
  ],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
