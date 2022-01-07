import React from "react";
import DeleteIcon from "../Assests/DeleteIcon";

function WorkoutExerciseCard({
  exercise,
  handleUpdateWeight,
  handleUpdateReps,
  handleAddSet,
}) {
  return (
    <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs my-5">
      <div className="flex justify-between ">
        <h2 className="text-lg">{exercise.name}</h2>
        <button>
          <DeleteIcon />
        </button>
      </div>
      <table>
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
              <tr className="b-5">
                <td>#{idx + 1}</td>
                <td className="pl-3">
                  <input
                    type="number"
                    className="w-20 rounded-md text-center"
                    value={exercise.weight[idx]}
                    onChange={(e) => handleUpdateWeight(e, exercise, idx)}
                  />
                </td>
                <td className="pl-3">
                  <input
                    type="number"
                    className="w-20 rounded-md text-center"
                    value={exercise.reps[idx]}
                    onChange={(e) => handleUpdateReps(e, exercise, idx)}
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
