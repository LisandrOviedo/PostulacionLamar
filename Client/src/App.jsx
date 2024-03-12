import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { Landing } from "./components/Landing/Landing";
import { Form } from "./components/Form/Form";

function App() {
  const { pathname } = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/form/:cedula" element={<Form />} />
    </Routes>
  );
}

export default App;
