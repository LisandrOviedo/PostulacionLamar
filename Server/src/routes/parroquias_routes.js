import { Router } from "express";
import {
  getParroquias,
  getParroquiasActivos,
  getParroquia,
  postParroquia,
  putParroquia,
  deleteParroquia,
} from "../handlers/parroquias_handlers.js";

import { authenticateToken } from "../auth/index.js";

const parroquias = Router();

parroquias.get("/:municipio_id", authenticateToken, getParroquias);
parroquias.get(
  "/activas/:municipio_id",
  authenticateToken,
  getParroquiasActivos
);
parroquias.get("/detalle/:parroquia_id", authenticateToken, getParroquia);

parroquias.post("/", authenticateToken, postParroquia);

parroquias.put("/modificar", authenticateToken, putParroquia);
parroquias.put("/inactivar", authenticateToken, deleteParroquia);

export default parroquias;
