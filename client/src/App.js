import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Exercises from "./Pages/Exercises";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Workout from "./Pages/Workout";
import Landing from "./Pages/Landing";
import { ExericseContextProvider } from "./Context/exerciseContext";

function App() {
  return (
    <ExericseContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>
      </BrowserRouter>
    </ExericseContextProvider>
  );
}

export default App;
