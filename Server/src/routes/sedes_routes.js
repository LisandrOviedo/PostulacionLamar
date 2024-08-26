const { Router } = require("express");
const {
  getSedes,
  getSedesActivas,
  getSede,
  postSede,
  putSede,
  deleteSede,
} = require("../handlers/sedes_handlers");

const { authenticateToken } = require("../auth/index");

const sedes = Router();

sedes.get("/:empresa_id", authenticateToken, getSedes);
sedes.get("/activas/:empresa_id", getSedesActivas);
sedes.get("/detalle/:sede_id", authenticateToken, getSede);

sedes.post("/", authenticateToken, postSede);

sedes.put("/modificar", authenticateToken, putSede);
sedes.put("/inactivar", authenticateToken, deleteSede);

module.exports = sedes;
