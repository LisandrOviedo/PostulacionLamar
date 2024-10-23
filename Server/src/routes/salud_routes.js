import { Router } from "express";
import {
  getSaluds,
  getSaludActivas,
  getSalud,
  postSalud,
  putSalud,
  deleteSalud,
} from "../handlers/salud_handlers.js";

import { authenticateToken } from "../auth/index.js";

const salud = Router();

salud.get("/:empleado_id", authenticateToken, getSaluds);
salud.get("/activos/:empleado_id", authenticateToken, getSaludActivas);
salud.get("/detalle/:salud_id", authenticateToken, getSalud);

salud.post("/", authenticateToken, postSalud);

salud.put("/modificar", authenticateToken, putSalud);
salud.put("/inactivar", authenticateToken, deleteSalud);

export default salud;
