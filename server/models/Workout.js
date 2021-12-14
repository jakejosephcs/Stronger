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
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      sets: [
        {
          reps: {
            type: Number,
          },
          weight: {
            type: Number,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Workout", WorkoutSchema);
