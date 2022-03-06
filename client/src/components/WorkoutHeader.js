import React from "react";

function WorkoutHeader({
  workout,
  handleUpdateWorkout,
  handleFinishWorkout,
  isWorkoutSubmitting,
}) {
  return (
    <div className="px-3 max-w-sm">
      <div className="flex justify-center">
        <input
          className="text-2xl font-semibold outline-none"
          placeholder="Name (e.g. Leg Day)"
          value={workout.name}
          name="name"
          onChange={(e) => handleUpdateWorkout(e)}
        />
        <button
          className="rounded-full bg-lime-500 px-4 py-1 text-white text-sm font-semibold"
          onClick={handleFinishWorkout}
        >
          {isWorkoutSubmitting ? "..." : "FINISH"}
        </button>
      </div>
      <input
        type="text-area"
        className="font-extralight w-full outline-none"
        placeholder="Notes (e.g. Focus on squat form)"
        name="notes"
        value={workout.notes}
        onChange={(e) => handleUpdateWorkout(e)}
      />
      <input
        type="date"
        className="border border-gray-300 text-gray-900 rounded-lg block p-2.5 text-sm w-full"
        name="date"
        value={workout.date}
        onChange={handleUpdateWorkout}
      />
    </div>
  );
}

export default WorkoutHeader;
