import { calculateOneRepMax, ICON_NAME } from "../utils";

function WorkoutCard({ workout, handleDeleteWorkout, isDeletingExercise }) {
  const [CalenderIconDark, TrashIcon] = [
    ICON_NAME["CalenderIconDark"],
    ICON_NAME["TrashIcon"],
  ];
  const Exercises = ({ exercise }) => {
    const oneRepMax = calculateOneRepMax(exercise);
    return (
      <tr>
        <td className="text-center">{exercise.reps.length}</td>
        <td>
          <p className="w-44 overflow-hidden text-ellipses truncate text-center">
            {exercise.exerciseName}
          </p>
        </td>
        <td className="text-center">{oneRepMax}</td>
      </tr>
    );
  };

  return (
    <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs mb-5">
      <div className="flex justify-between">
        <h3 className="font-semibold">{workout.name}</h3>
        <button onClick={() => handleDeleteWorkout(workout)}>
          {isDeletingExercise ? "..." : <TrashIcon />}
        </button>
      </div>
      <div className="flex ">
        <CalenderIconDark />
        <span className="ml-1 text-sm">{workout.date}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th className="font-medium">Sets</th>
            <th className="font-medium text-center pl-1 w-44">Exercises</th>
            <th className="font-medium">1RM</th>
          </tr>
        </thead>
        <tbody>
          {workout.exercises.map((exercise) => (
            <Exercises key={exercise._id} exercise={exercise} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutCard;
