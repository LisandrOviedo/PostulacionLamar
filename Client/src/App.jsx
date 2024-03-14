import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Form } from "./components/Form/Form";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar/Navbar";
import { NotFound } from "./components/NotFound/NotFound";
import { Login } from "./components/Admin/Login/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form/:cedula" element={<Form />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
