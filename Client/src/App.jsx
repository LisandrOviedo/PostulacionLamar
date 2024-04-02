import "./App.css";

import { Routes, Route } from "react-router-dom";

import {
  Curriculo,
  CurriculoDetail,
  Dashboard,
  DatosPersonales,
  Landing,
  Login,
  Navbar,
  NotFound,
  Postulacion,
  Postulaciones,
  UpdatePassword,
} from "./components/";

import { AuthGuardAdmin } from "./guards/AuthGuardAdmin";
import { AuthGuardEmpleado } from "./guards/AuthGuardEmpleado";
import { AuthGuardUpdatePassword } from "./guards/AuthGuardUpdatePassword";

import { Suspense } from "react";

function App() {
  return (
    <div>
      <Suspense fallback={<>Cargando</>}>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />

          <Route element={<AuthGuardUpdatePassword />}>
            <Route path="/empleado/cambioClave" element={<UpdatePassword />} />
          </Route>

          <Route element={<AuthGuardEmpleado />}>
            <Route path="/form/datosPersonales" element={<DatosPersonales />} />
            <Route path="/form/curriculo" element={<Curriculo />} />
            <Route
              path="/curriculo/:curriculo_id"
              element={<CurriculoDetail />}
            />
          </Route>

          <Route path="/admin/login" element={<Login />} />
          <Route element={<AuthGuardAdmin />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/postulaciones" element={<Postulaciones />} />
            <Route path="/admin/postulacion/:id" element={<Postulacion />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
