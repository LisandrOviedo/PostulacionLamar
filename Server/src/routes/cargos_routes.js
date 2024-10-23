import { Router } from "express";
import {
  getCargos,
  getCargosActivos,
  getCargo,
  postCargo,
  putCargo,
  deleteCargo,
} from "../handlers/cargos_handlers.js";

import { authenticateToken } from "../auth/index.js";

const cargos = Router();

cargos.get("/:departamento_id", authenticateToken, getCargos);
cargos.get("/activos/:departamento_id", authenticateToken, getCargosActivos);
cargos.get("/detalle/:cargo_id", authenticateToken, getCargo);

cargos.post("/", authenticateToken, postCargo);

cargos.put("/modificar", authenticateToken, putCargo);
cargos.put("/inactivar", authenticateToken, deleteCargo);

export default cargos;
