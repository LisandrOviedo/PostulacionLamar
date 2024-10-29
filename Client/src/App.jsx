import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AccesoEmpleado,
  ActualizarClave,
  ActualizarClaveTemporal,
  BarraNavegacion,
  CrearCurriculo,
  DatosPersonales,
  EnviarSugerencia,
  InfoCurriculo,
  Inicio,
  PaginaNoEncontrada,
  PruebaKostick,
  SubirDocumentos,
  AccesoAdmin,
  DetalleEmpleado,
  DetalleVacante,
  Empleados,
  FormularioIngreso,
  Liquidaciones,
  Movimientos,
  PanelAdmin,
  PerfilesProfesionales,
  PruebasEmpleados,
  Roles_Permisologia,
  SolicitudesMovimientos,
  Sugerencias,
  Vacantes,
} from "./components/";

import {
  ProteccionActualizarClave,
  ProteccionAdmin,
  ProteccionEmpleado,
} from "./ProteccionRutas/";

import { Suspense } from "react";

function App() {
  const { pathname } = useLocation();
  const userState = useSelector((state) => state.empleados.empleado);

  return (
    <div>
      <Suspense fallback={<>Cargando</>}>
        {pathname.toLowerCase() !== "/" &&
          pathname.toLowerCase() !== "/admin/acceso" &&
          pathname.toLocaleLowerCase() !==
            "/miperfil/actualizarclavetemporal" &&
          pathname.toLocaleLowerCase() !== "/sugerencias" &&
          userState.empleado_id && <BarraNavegacion />}
        <Routes>
          <Route path="/" element={<AccesoEmpleado />} />
          <Route path="/admin/acceso" element={<AccesoAdmin />} />
          <Route path="/sugerencias" element={<EnviarSugerencia />} />

          <Route element={<ProteccionActualizarClave />}>
            <Route
              path="/miPerfil/actualizarClaveTemporal"
              element={<ActualizarClaveTemporal />}
            />
          </Route>

          {/* Rutas Empleado */}
          <Route element={<ProteccionEmpleado />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route
              path="/miPerfil/datosPersonales"
              element={<DatosPersonales />}
            />
            <Route
              path="/miPerfil/actualizarClave"
              element={<ActualizarClave />}
            />
            <Route path="/perfilProfesional/info" element={<InfoCurriculo />} />
            <Route
              path="/perfilProfesional/registro"
              element={<CrearCurriculo />}
            />
            <Route
              path="/perfilProfesional/misDocumentos"
              element={<SubirDocumentos />}
            />
            <Route
              path="/perfilProfesional/pruebaKostick"
              element={<PruebaKostick />}
            />
          </Route>

          {/* Rutas Admin */}
          <Route element={<ProteccionAdmin />}>
            <Route path="/admin/panel" element={<PanelAdmin />} />
            <Route
              path="/admin/miPerfil/datosPersonales"
              element={<DatosPersonales />}
            />
            <Route
              path="/admin/miPerfil/actualizarClave"
              element={<ActualizarClave />}
            />
            <Route
              path="/admin/perfilesProfesionales"
              element={<PerfilesProfesionales />}
            />
            <Route path="/admin/empleados" element={<Empleados />} />
            <Route
              path="/admin/empleados/:empleado_id"
              element={<DetalleEmpleado />}
            />
            <Route
              path="/admin/pruebasEmpleados"
              element={<PruebasEmpleados />}
            />
            <Route
              path="/admin/formularioIngreso"
              element={<FormularioIngreso />}
            />
            <Route path="/admin/movimientos" element={<Movimientos />} />
            <Route
              path="/admin/solicitudesMovimientos"
              element={<SolicitudesMovimientos />}
            />
            <Route path="/admin/liquidaciones" element={<Liquidaciones />} />
            <Route
              path="/admin/rolesPermisologia"
              element={<Roles_Permisologia />}
            />
            <Route path="/admin/sugerencias" element={<Sugerencias />} />
            <Route path="/admin/vacantes" element={<Vacantes />} />
            <Route
              path="/admin/vacantes/:vacante_id"
              element={<DetalleVacante />}
            />
          </Route>
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
