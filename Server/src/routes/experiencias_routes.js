import { Router } from "express";
import {
  getExperiencias,
  getExperiencia,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
} from "../handlers/experiencias_handlers.js";

import { authenticateToken } from "../auth/index.js";

const experiencias = Router();

experiencias.get("/", authenticateToken, getExperiencias);
experiencias.get(
  "/detalle/:cargo_titulo_id",
  authenticateToken,
  getExperiencia
);

experiencias.post("/", authenticateToken, postExperiencia);

experiencias.put("/modificar", authenticateToken, putExperiencia);
experiencias.put("/inactivar", authenticateToken, deleteExperiencia);

export default experiencias;
