const { Router } = require("express");
const {
  getCargosNiveles,
  getCargosNivelesActivos,
  getCargoNivel,
  postCargoNivel,
  putCargoNivel,
  deleteCargoNivel,
} = require("../handlers/cargos_niveles_handlers");

const { authenticateToken } = require("../auth/index");

const cargos_niveles = Router();

cargos_niveles.get("/:cargo_id", authenticateToken, getCargosNiveles);
cargos_niveles.get(
  "/activos/:cargo_id",
  authenticateToken,
  getCargosNivelesActivos
);
cargos_niveles.get(
  "/detalle/:cargo_nivel_id",
  authenticateToken,
  getCargoNivel
);

cargos_niveles.post("/", authenticateToken, postCargoNivel);

cargos_niveles.put("/modificar", authenticateToken, putCargoNivel);
cargos_niveles.put("/inactivar", authenticateToken, deleteCargoNivel);

module.exports = cargos_niveles;
