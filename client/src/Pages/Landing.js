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
        <section>
          <div>
            <button>
              <Link to="/registration">Register</Link>
            </button>
          </div>
          <div>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </div>
        </section>
      );
    }
    return (
      <section>
        <div>
          <Link to="/home">Workout</Link>
        </div>
      </section>
    );
  };

  return (
    <div>
      <section>
        <div>
          Get <span>Stronger</span>
        </div>
        <div>Be Consistent</div>
        <div>See Results</div>
      </section>
      {buttonsToRender(token)}
      <section>
        <div>
          <NoteIcon />
          <p>Track sets, reps and weight</p>
        </div>
        <div>
          <CalenderIcon />
          <p>View previous workouts</p>
        </div>
        <div>
          <AddIcon />
          <p>Add your own exercises</p>
        </div>
        <div>
          <GraphIcon />
          <p>Comprehensive statistics</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
