import CalenderIcon from "../Assests/CalenderIcon";
import TrashIcon from "../Assests/TrashIcon";

function WorkoutCard({ workout, handleDeleteWorkout, exercises }) {
  const renderExercises = (exercise) => {
    const exerciseName = exercises.find(
      (ex) => ex._id === exercise.exerciseId
    )?.name;

    return (
      <tr>
        <td className="text-center">{exercise.reps.length}</td>
        <td className="pl-1 max-w-[8rem] whitespace-nowrap overflow-hidden text-ellipses truncate">
          {exerciseName}
        </td>
        <td className="text-center">{Math.max(...exercise.weight)}</td>
      </tr>
    );
  };

  return (
    <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs mb-5">
      <div className="flex justify-between">
        <h3 className="font-semibold">{workout.name}</h3>
        <button onClick={() => handleDeleteWorkout(workout)}>
          <TrashIcon />
        </button>
      </div>
      <div className="flex">
        <CalenderIcon />
        <span>{workout.date}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th className="font-medium">Sets</th>
            <th className="font-medium text-left pl-1">Exercises</th>
            <th className="font-medium">Best weight</th>
          </tr>
        </thead>
        <tbody>
          {workout.exercises.map((exercise) => renderExercises(exercise))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutCard;
