import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import { Form } from "./components/Form/Form";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form/:cedula" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
