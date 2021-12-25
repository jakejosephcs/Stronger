import { Link } from "react-router-dom";
import CalenderIcon from "../Assests/CalenderIcon";
import LinkIcon from "../Assests/LinkIcon";
import TrashIcon from "../Assests/TrashIcon";

function Home() {
  return (
    <div className="flex flex-col max-w-sm items-center mx-auto">
      <div className="flex bg-slate-200 py-2 px-3 rounded mb-4">
        <LinkIcon />
        <Link to="/workout">
          <button className="ml-1">Start a new workout</button>
        </Link>
      </div>
      <div className="flex bg-slate-200 py-2 px-3 rounded mb-12">
        <LinkIcon />
        <Link to="/exercises">
          <button className="ml-1">View your exercises</button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Completed workouts</h1>
      <div className="bg-slate-200 px-4 py-4 rounded mx-3">
        <div className="flex justify-between">
          <h3 className="font-semibold">Workout name</h3>
          <TrashIcon />
        </div>
        <div className="flex">
          <CalenderIcon />
          <span>12/31/2021</span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="border-2 border-orange-600 p-1">Sets</th>
              <th className="border-2 border-orange-600 text-left p-1">
                Exercises
              </th>
              <th className="border-2 border-orange-600 p-1">Total Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-orange-600 text-center p-1">1</td>
              <td className="border-2 border-orange-600 p-1">Bench Press</td>
              <td className="border-2 border-orange-600 p-1">250lbs</td>
            </tr>
            <tr>
              <td className="border-2 border-orange-600 text-center p-1">2</td>
              <td className="border-2 border-orange-600 p-1">Bench Press</td>
              <td className="border-2 border-orange-600 p-1">250lbs</td>
            </tr>
            <tr>
              <td className="border-2 border-orange-600 text-center p-1">3</td>
              <td className="border-2 border-orange-600 p-1">
                Overhead Tricep Extensions
              </td>
              <td className="border-2 border-orange-600 p-1">25lbs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
