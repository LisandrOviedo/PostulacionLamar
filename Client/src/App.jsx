import "./App.css";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { Form } from "./components/Form/Form";
import { Landing } from "./components/Landing/Landing";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./components/Admin/Login/Login";

function App() {
  const { pathname } = useLocation();

  function NotFound() {
    return <Navigate to="/" />;
  }

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
