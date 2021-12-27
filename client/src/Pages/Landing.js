import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "../Assests/AddIcon";
import CalenderIcon from "../Assests/CalenderIcon";
import GraphIcon from "../Assests/GraphIcon";
import NoteIcon from "../Assests/NoteIcon";

function Landing() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.setItem("token", null);
    setToken("");
  };

  const buttonsToRender = (isUserLoggedIn) => {
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
        <div className="bg-blue-500 text-white py-2 px-5 rounded-full text-center mb-4">
          <Link to="/home">Workout</Link>
        </div>
        <div className="bg-red-500 text-white py-2 px-5 rounded-full text-center mb-4">
          <button onClick={clearLocalStorage}>Logout</button>
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
        <div className="flex bg-slate-200 py-4 px-3 rounded mb-4 relative">
          <span className="absolute top-0 right-0 text-xs bg-blue-300 text-white rounded-bl-full px-2">
            coming soon
          </span>
          <GraphIcon />
          <p className="ml-4">Comprehensive statistics</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
