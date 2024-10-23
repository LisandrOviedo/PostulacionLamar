import { Router } from "express";
import {
  getCargosNiveles,
  getCargosNivelesActivos,
  getCargoNivel,
  postCargoNivel,
  putCargoNivel,
  deleteCargoNivel,
} from "../handlers/cargos_niveles_handlers.js";

import { authenticateToken } from "../auth/index.js";

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

export default cargos_niveles;
