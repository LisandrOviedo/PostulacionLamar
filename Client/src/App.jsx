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
  DetalleCurriculo,
  InfoCurriculo,
  Inicio,
  PaginaNoEncontrada,
  PruebaKostick,
  SubirDocumentos,
  AccesoAdmin,
  DetalleEmpleado,
  Empleados,
  PanelAdmin,
  Postulaciones,
  PruebasEmpleados,
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
            "/miPerfil/actualizarclavetemporal" &&
          userState.empleado_id && <BarraNavegacion />}
        <Routes>
          <Route path="*" element={<PaginaNoEncontrada />} />
          <Route path="/" element={<AccesoEmpleado />} />
          <Route path="/admin/acceso" element={<AccesoAdmin />} />

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
              path="/perfilProfesional/detalle/:curriculo_id"
              element={<DetalleCurriculo />}
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
            <Route path="/admin/postulaciones" element={<Postulaciones />} />
            <Route path="/admin/empleados" element={<Empleados />} />
            <Route
              path="/admin/empleado/:empleado_id"
              element={<DetalleEmpleado />}
            />
            <Route
              path="/admin/pruebasEmpleados"
              element={<PruebasEmpleados />}
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
