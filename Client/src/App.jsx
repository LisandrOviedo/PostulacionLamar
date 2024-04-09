import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import {
  CreateCurriculo,
  CurriculoDetail,
  Dashboard,
  DatosPersonales,
  Home,
  LandingCurriculo,
  LoginAdmin,
  LoginEmpleado,
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
  const { pathname } = useLocation();

  return (
    <div>
      <Suspense fallback={<>Cargando</>}>
        {pathname !== "/" && pathname !== "/admin/login" && <Navbar />}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LoginEmpleado />} />

          <Route element={<AuthGuardUpdatePassword />}>
            <Route path="/empleado/cambioClave" element={<UpdatePassword />} />
          </Route>

          <Route element={<AuthGuardEmpleado />}>
            <Route path="/home" element={<Home />} />
            <Route path="/datosPersonales" element={<DatosPersonales />} />
            <Route path="/curriculo/info" element={<LandingCurriculo />} />
            <Route path="/curriculo/registro" element={<CreateCurriculo />} />
            <Route
              path="/curriculo/curriculoDetalle/:curriculo_id"
              element={<CurriculoDetail />}
            />
          </Route>

          <Route path="/admin/login" element={<LoginAdmin />} />
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
