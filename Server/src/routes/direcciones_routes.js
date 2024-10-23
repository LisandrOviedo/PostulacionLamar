import { Router } from "express";
import {
  getDirecciones,
  getDireccionesActivas,
  getDireccion,
  postDireccion,
  putDireccion,
  deleteDireccion,
} from "../handlers/direcciones_handlers.js";

import { authenticateToken } from "../auth/index.js";

const direcciones = Router();

direcciones.get("/:empleado_id", authenticateToken, getDirecciones);
direcciones.get(
  "/activas/:empleado_id",
  authenticateToken,
  getDireccionesActivas
);
direcciones.get("/detalle/:direccion_id", authenticateToken, getDireccion);

direcciones.post("/", authenticateToken, postDireccion);

direcciones.put("/modificar", authenticateToken, putDireccion);
direcciones.put("/inactivar", authenticateToken, deleteDireccion);

export default direcciones;
