import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

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
  SubirDocumentos,
  AccesoAdmin,
  Empleados,
  PanelAdmin,
  Postulacion,
  Postulaciones,
} from "./components/";

import {
  ProteccionActualizarClave,
  ProteccionAdmin,
  ProteccionEmpleado,
} from "./ProteccionRutas/";

import { Suspense } from "react";

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <Suspense fallback={<>Cargando</>}>
        {pathname.toLowerCase() !== "/" &&
          pathname.toLowerCase() !== "/admin/acceso" && <BarraNavegacion />}
        <Routes>
          <Route path="*" element={<PaginaNoEncontrada />} />
          <Route path="/" element={<AccesoEmpleado />} />
          <Route path="/admin/acceso" element={<AccesoAdmin />} />

          <Route element={<ProteccionActualizarClave />}>
            <Route
              path="/actualizarClaveTemporal"
              element={<ActualizarClaveTemporal />}
            />
          </Route>

          {/* Rutas Empleado */}
          <Route element={<ProteccionEmpleado />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/datosPersonales" element={<DatosPersonales />} />
            <Route path="/curriculo/info" element={<InfoCurriculo />} />
            <Route path="/curriculo/registro" element={<CrearCurriculo />} />
            <Route
              path="/curriculo/curriculoDetalle/:curriculo_id"
              element={<DetalleCurriculo />}
            />
            <Route path="/documentos" element={<SubirDocumentos />} />
            <Route path="/actualizarClave" element={<ActualizarClave />} />
          </Route>

          {/* Rutas Admin */}
          <Route element={<ProteccionAdmin />}>
            <Route path="/admin/panel" element={<PanelAdmin />} />
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
