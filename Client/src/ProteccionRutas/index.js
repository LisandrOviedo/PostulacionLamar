import { lazy } from "react";

export const ProteccionAdmin = lazy(() => import("./ProteccionAdmin"));
export const ProteccionEmpleado = lazy(() => import("./ProteccionEmpleado"));
export const ProteccionActualizarClave = lazy(() =>
  import("./ProteccionActualizarClave")
);
