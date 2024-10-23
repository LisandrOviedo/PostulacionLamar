import { Router } from "express";
import {
  getContactosEmergencia,
  getContactosEmergenciaActivas,
  getContactoEmergencia,
  postContactoEmergencia,
  putContactoEmergencia,
  deleteContactoEmergencia,
} from "../handlers/contactos_emergencia_handlers.js";

import { authenticateToken } from "../auth/index.js";

const contactos_emergencia = Router();

contactos_emergencia.get(
  "/:empleado_id",
  authenticateToken,
  getContactosEmergencia
);
contactos_emergencia.get(
  "/activos/:empleado_id",
  authenticateToken,
  getContactosEmergenciaActivas
);
contactos_emergencia.get(
  "/detalle/:contacto_emergencia_id",
  authenticateToken,
  getContactoEmergencia
);

contactos_emergencia.post("/", authenticateToken, postContactoEmergencia);

contactos_emergencia.put(
  "/modificar",
  authenticateToken,
  putContactoEmergencia
);
contactos_emergencia.put(
  "/inactivar",
  authenticateToken,
  deleteContactoEmergencia
);

export default contactos_emergencia;
