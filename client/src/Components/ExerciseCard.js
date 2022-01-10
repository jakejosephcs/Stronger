import DeleteIcon from "../Assests/DeleteIcon";

function ExerciseCard({ exercise, handleDeleteExercise }) {
  return (
    <div className="flex justify-between w-56 bg-slate-200 py-2 px-3 rounded mb-4">
      <h3 className="truncate text-ellipsis overflow-hidden">
        {exercise.name}
      </h3>
      <button onClick={() => handleDeleteExercise(exercise._id)}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default ExerciseCard;
