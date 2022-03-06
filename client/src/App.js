import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Exercise from "./pages/exercise";
import Home from "./pages/home";
import Workout from "./pages/workout";
import Header from "./components/shared/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercises" element={<Exercise />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
