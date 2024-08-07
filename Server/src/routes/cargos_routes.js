const { Router } = require("express");
const {
  getCargos,
  getCargosActivos,
  getCargo,
  postCargo,
  putCargo,
  deleteCargo,
} = require("../handlers/cargos_handlers");

const { authenticateToken } = require("../auth/index");

const cargos = Router();

cargos.get("/:departamento_id", authenticateToken, getCargos);
cargos.get("/activos/:departamento_id", authenticateToken, getCargosActivos);
cargos.get("/detalle/:cargo_id", authenticateToken, getCargo);

cargos.post("/", authenticateToken, postCargo);

cargos.put("/modificar", authenticateToken, putCargo);
cargos.put("/inactivar", authenticateToken, deleteCargo);

module.exports = cargos;
