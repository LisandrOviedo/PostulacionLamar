import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import {
  AnexarDocumentos,
  CreateCurriculo,
  CurriculoDetail,
  Dashboard,
  DatosPersonales,
  Empleados,
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
        {pathname.toLowerCase() !== "/" &&
          pathname.toLowerCase() !== "/admin/login" && <Navbar />}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LoginEmpleado />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

          <Route element={<AuthGuardUpdatePassword />}>
            <Route path="/empleado/cambioClave" element={<UpdatePassword />} />
          </Route>

          {/* Rutas Empleado */}
          <Route element={<AuthGuardEmpleado />}>
            <Route path="/home" element={<Home />} />
            <Route path="/datosPersonales" element={<DatosPersonales />} />
            <Route path="/curriculo/info" element={<LandingCurriculo />} />
            <Route path="/curriculo/registro" element={<CreateCurriculo />} />
            <Route
              path="/curriculo/curriculoDetalle/:curriculo_id"
              element={<CurriculoDetail />}
            />
            <Route path="/documentos" element={<AnexarDocumentos />} />
          </Route>

          {/* Rutas Admin */}
          <Route element={<AuthGuardAdmin />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/datosPersonales"
              element={<DatosPersonales />}
            />
            <Route path="/admin/postulaciones" element={<Postulaciones />} />
            <Route
              path="/admin/postulacion/:curriculo_id"
              element={<Postulacion />}
            />

            <Route path="/admin/empleados" element={<Empleados />} />
            {/* <Route
              path="/admin/empleado/:empleado_id"
              element={<Empleado />}
            /> */}
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
