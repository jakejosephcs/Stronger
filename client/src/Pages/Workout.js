import DeleteIcon from "../Assests/DeleteIcon";
import PlusIcon from "../Assests/PlusIcon";
import XIcon from "../Assests/XIcon";
import UnCheckedCheckMark from "../Assests/UnCheckedCheckMark";

function Workout() {
  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <div className="w-screen px-3">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Workout Name</h1>
          <button className="rounded-full bg-lime-500 px-4 py-1 text-white text-sm font-semibold">
            FINISH
          </button>
        </div>
        <p className="font-extralight">Workout notes</p>
      </div>
      <div className="bg-slate-200 px-4 py-4 rounded mx-3 w-72 max-w-xs my-5">
        <div className="flex justify-between">
          <h2 className="text-lg">Exercise Name</h2>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1</td>
              <td className="pl-3">
                <input type="number" className="w-20 rounded-md text-center" />
              </td>
              <td className="pl-3">
                <input type="number" className="w-20 rounded-md text-center" />
              </td>
              <td className="pl-3">
                <UnCheckedCheckMark />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center">
          <button className="text-center bg-blue-300 mt-3 rounded-full px-4 py-0.5">
            Add a set
          </button>
        </div>
      </div>
      <div className="flex bg-red-600 py-2 px-3 rounded mb-4 ">
        <PlusIcon />
        <button className="text-white ml-2">Add an exercise</button>
      </div>
      <div className="flex bg-blue-600 py-2 px-3 rounded mb-4">
        <XIcon />
        <button className="text-white ml-2">Cancel workout</button>
      </div>
    </div>
  );
}

export default Workout;
