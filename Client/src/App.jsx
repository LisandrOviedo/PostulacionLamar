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
  PruebasKostick,
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
          pathname.toLocaleLowerCase() !== "/actualizarclavetemporal" &&
          userState.empleado_id && <BarraNavegacion />}
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
            <Route path="/pruebaKostick" element={<PruebaKostick />} />
          </Route>

          {/* Rutas Admin */}
          <Route element={<ProteccionAdmin />}>
            <Route path="/admin/panel" element={<PanelAdmin />} />
            <Route
              path="/admin/datosPersonales"
              element={<DatosPersonales />}
            />
            <Route path="/admin/postulaciones" element={<Postulaciones />} />
            <Route path="/admin/empleados" element={<Empleados />} />
            <Route
              path="/admin/empleado/:empleado_id"
              element={<DetalleEmpleado />}
            />
            <Route
              path="/admin/actualizarClave"
              element={<ActualizarClave />}
            />
            <Route path="/admin/pruebasKostick" element={<PruebasKostick />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
