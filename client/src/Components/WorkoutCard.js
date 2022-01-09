import CalenderIcon2 from "../Assests/CalenderIcon2";
import TrashIcon from "../Assests/TrashIcon";

function WorkoutCard({
  workout,
  handleDeleteWorkout,
  exercises,
  isDeletingExercise,
}) {
  const renderExercises = (exercise) => {
    const exerciseName = exercises.find(
      (ex) => ex._id === exercise.exerciseId
    )?.name;

    const calculateOneRepMax = () => {
      let oneRepMax = 0;
      for (let i = 0; i < exercise.weight.length; i++) {
        let newOneRepMax =
          exercise.weight[i] / (1.0278 - 0.0278 * exercise.reps[i]);
        if (newOneRepMax > oneRepMax) {
          oneRepMax = newOneRepMax;
        }
      }
      return parseInt(oneRepMax);
    };

    return (
      <tr>
        <td className="text-center">{exercise.reps.length}</td>
        <td>
          <p className="w-44 overflow-hidden text-ellipses truncate text-center">
            {exerciseName}
          </p>
        </td>
        <td className="text-center">{calculateOneRepMax()}</td>
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
        <CalenderIcon2 />
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
          {workout.exercises.map((exercise) => renderExercises(exercise))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutCard;
