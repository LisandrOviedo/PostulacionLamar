const { Router } = require("express");
const {
  getContactosEmergencia,
  getContactosEmergenciaActivas,
  getContactoEmergencia,
  postContactoEmergencia,
  putContactoEmergencia,
  deleteContactoEmergencia,
} = require("../handlers/contactos_emergencia_handlers");

const { authenticateToken } = require("../auth/index");

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

module.exports = contactos_emergencia;
