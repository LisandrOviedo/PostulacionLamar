import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./components/Landing/Landing";

function App() {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
