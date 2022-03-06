import React from "react";
import { ICON_NAME } from "../utils";

function WorkoutExerciseCard({
  exercise,
  handleUpdateWeight,
  handleUpdateReps,
  handleAddSet,
  handleRemoveExerciseFromWorkout,
}) {
  const DeleteIcon = ICON_NAME["DeleteIcon"];
  return (
    <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs mt-5">
      <div className="flex justify-between ">
        <h2 className="text-lg">{exercise.name}</h2>
        <button onClick={() => handleRemoveExerciseFromWorkout(exercise)}>
          <DeleteIcon />
        </button>
      </div>
      <table className="mx-auto">
        <thead>
          <tr>
            <th className="text-center">Set</th>
            <th className="text-center pl-3">Weight</th>
            <th className="text-center pl-3">Reps</th>
          </tr>
        </thead>
        <tbody>
          {exercise.reps.map((ex, idx) => {
            return (
              <tr key={idx} className="b-5">
                <td>#{idx + 1}</td>
                <td className="pl-3">
                  <input
                    type="number"
                    className="w-20 rounded-md text-center mb-1"
                    value={exercise.weight[idx]}
                    onChange={(e) => handleUpdateWeight(e, exercise, idx)}
                    min="0"
                    required
                  />
                </td>
                <td className="pl-3">
                  <input
                    type="number"
                    className="w-20 rounded-md text-center mb-1"
                    value={exercise.reps[idx]}
                    onChange={(e) => handleUpdateReps(e, exercise, idx)}
                    min="0"
                    required
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button
          className="text-center bg-blue-300 mt-3 rounded-full px-4 py-0.5"
          onClick={() => handleAddSet(exercise)}
        >
          Add a set
        </button>
      </div>
    </div>
  );
}

export default WorkoutExerciseCard;
