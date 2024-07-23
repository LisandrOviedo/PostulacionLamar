const { Router } = require("express");
const {
  getSaluds,
  getSaludActivas,
  getSalud,
  postSalud,
  putSalud,
  deleteSalud,
} = require("../handlers/salud_handlers");

const { authenticateToken } = require("../auth/index");

const salud = Router();

salud.get("/:empleado_id", authenticateToken, getSaluds);
salud.get("/activas/:empleado_id", authenticateToken, getSaludActivas);
salud.get("/detalle/:salud_id", authenticateToken, getSalud);

salud.post("/", authenticateToken, postSalud);

salud.put("/modificar", authenticateToken, putSalud);
salud.put("/inactivar", authenticateToken, deleteSalud);

module.exports = salud;
