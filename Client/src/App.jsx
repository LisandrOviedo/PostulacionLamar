import "./App.css";

import { Routes, Route } from "react-router-dom";

import {
  DatosPersonales,
  Curriculo,
  CurriculoDetail,
  Landing,
  Navbar,
  NotFound,
  Login,
  Dashboard,
  Postulaciones,
  Postulacion,
} from "./components/";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/form/datospersonales/:empleado_id"
          element={<DatosPersonales />}
        />
        <Route path="/form/curriculo/:empleado_id" element={<Curriculo />} />
        <Route path="/curriculo/:curriculo_id" element={<CurriculoDetail />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/postulaciones" element={<Postulaciones />} />
        <Route path="/admin/postulacion/:id" element={<Postulacion />} />
      </Routes>
    </div>
  );
}

export default App;
