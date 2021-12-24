import { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "../Assests/AddIcon";
import CalenderIcon from "../Assests/CalenderIcon";
import GraphIcon from "../Assests/GraphIcon";
import NoteIcon from "../Assests/NoteIcon";

function Landing() {
  const [token, setToken] = useState(true);

  let buttonsToRender = (isUserLoggedIn) => {
    if (!isUserLoggedIn) {
      return (
        <section className="mb-10">
          <div className="bg-blue-500 text-white py-2 px-5 rounded-full text-center mb-4">
            <button>
              <Link to="/registration">Register</Link>
            </button>
          </div>
          <div className="bg-blue-500 text-white py-2 px-5 rounded-full text-center">
            <button>
              <Link to="/login">Login</Link>
            </button>
          </div>
        </section>
      );
    }
    return (
      <section className="mb-10">
        <div className="bg-blue-500 text-white py-2 px-5 rounded-full text-center">
          <Link to="/home">Workout</Link>
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto items-center">
      <section className="text-center tracking-widest mb-8">
        <div className="text-3xl">
          Get <span className="font-bold">Stronger</span>
        </div>
        <div className="text-3xl">Be Consistent</div>
        <div className="text-3xl">See Results</div>
      </section>
      {buttonsToRender(token)}
      <section>
        <div className="flex bg-slate-200 py-4 px-3 rounded mb-4">
          <NoteIcon />
          <p className="ml-4">Track sets, reps and weight</p>
        </div>
        <div className="flex bg-slate-200 py-4 px-3 rounded mb-4">
          <CalenderIcon />
          <p className="ml-4">View previous workouts</p>
        </div>
        <div className="flex bg-slate-200 py-4 px-3 rounded mb-4">
          <AddIcon />
          <p className="ml-4">Add your own exercises</p>
        </div>
        <div className="flex bg-slate-200 py-4 px-3 rounded mb-4">
          <GraphIcon />
          <p className="ml-4">Comprehensive statistics</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
