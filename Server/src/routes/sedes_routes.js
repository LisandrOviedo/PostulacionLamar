import { Router } from "express";
import {
  getSedes,
  getSedesActivas,
  getSede,
  postSede,
  putSede,
  deleteSede,
} from "../handlers/sedes_handlers.js";

import { authenticateToken } from "../auth/index.js";

const sedes = Router();

sedes.get("/:empresa_id", authenticateToken, getSedes);
sedes.get("/activas/:empresa_id", getSedesActivas);
sedes.get("/detalle/:sede_id", authenticateToken, getSede);

sedes.post("/", authenticateToken, postSede);

sedes.put("/modificar", authenticateToken, putSede);
sedes.put("/inactivar", authenticateToken, deleteSede);

export default sedes;
