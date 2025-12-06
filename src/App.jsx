import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import Principal from "./Principal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  );
}

export default App;
