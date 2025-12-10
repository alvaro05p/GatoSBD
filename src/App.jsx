import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Principal from "./Form";
import Home from "./Home";
import Entrenamiento from "./Entrenamiento";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/entrenamiento/:ejercicio" element={<Entrenamiento />} />
      </Routes>
    </Router>
  );
}

export default App;
