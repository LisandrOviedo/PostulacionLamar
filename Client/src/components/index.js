import { lazy } from "react";

export const AccesoEmpleado = lazy(() =>
  import("./AccesoEmpleado/AccesoEmpleado")
);
export const ActualizarClave = lazy(() =>
  import("./ActualizarClave/ActualizarClave")
);
export const ActualizarClaveTemporal = lazy(() =>
  import("./ActualizarClaveTemporal/ActualizarClaveTemporal")
);
export const BarraNavegacion = lazy(() =>
  import("./BarraNavegacion/BarraNavegacion")
);
export const CrearCurriculo = lazy(() =>
  import("./CrearCurriculo/CrearCurriculo")
);
export const DatosPersonales = lazy(() =>
  import("./DatosPersonales/DatosPersonales")
);
export const EnviarSugerencia = lazy(() =>
  import("./EnviarSugerencia/EnviarSugerencia")
);
export const HistorialPostulaciones = lazy(() =>
  import("./HistorialPostulaciones/HistorialPostulaciones")
);
export const InfoCurriculo = lazy(() =>
  import("./InfoCurriculo/InfoCurriculo")
);
export const InfoPostulacion = lazy(() =>
  import("./InfoPostulacion/InfoPostulacion")
);
export const Inicio = lazy(() => import("./Inicio/Inicio"));
export const PaginaNoEncontrada = lazy(() =>
  import("./PaginaNoEncontrada/PaginaNoEncontrada")
);
export const PruebaKostick = lazy(() =>
  import("./PruebaKostick/PruebaKostick")
);
export const SubirDocumentos = lazy(() =>
  import("./SubirDocumentos/SubirDocumentos")
);

export const AsignacionAccesoEmpresas = lazy(() =>
  import("./Admin/AsignacionAccesoEmpresas")
);
export const AsignacionRoles = lazy(() => import("./Admin/AsignacionRoles"));
export const ConsultarLiquidaciones = lazy(() =>
  import("./Admin/ConsultarLiquidaciones")
);
export const DetalleEmpleado = lazy(() => import("./Admin/DetalleEmpleado"));
export const DetalleVacante = lazy(() => import("./Admin/DetalleVacante"));
export const Empleados = lazy(() => import("./Admin/Empleados"));
export const FormularioIngreso = lazy(() =>
  import("./Admin/FormularioIngreso")
);
export const Liquidaciones = lazy(() => import("./Admin/Liquidaciones"));
export const Movimientos = lazy(() => import("./Admin/Movimientos"));
export const PanelAdmin = lazy(() => import("./Admin/PanelAdmin"));
export const PerfilesProfesionales = lazy(() =>
  import("./Admin/PerfilesProfesionales")
);
export const PruebasEmpleados = lazy(() => import("./Admin/PruebasEmpleados"));
export const GestionRoles = lazy(() => import("./Admin/GestionRoles"));
export const SolicitudesMovimientos = lazy(() =>
  import("./Admin/SolicitudesMovimientos")
);
export const Sugerencias = lazy(() => import("./Admin/Sugerencias"));
export const Vacantes = lazy(() => import("./Admin/Vacantes"));
