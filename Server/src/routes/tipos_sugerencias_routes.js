import { Router } from "express";
import {
  getTiposSugerencias,
  getTiposSugerenciasActivas,
  getTipoSugerencia,
  postTipoSugerencia,
  putTipoSugerencia,
  deleteTipoSugerencia,
} from "../handlers/tipos_sugerencias_handlers.js";

import { authenticateToken } from "../auth/index.js";

const tipos_sugerencias = Router();

tipos_sugerencias.get("/", authenticateToken, getTiposSugerencias);
tipos_sugerencias.get("/activas", getTiposSugerenciasActivas);
tipos_sugerencias.get(
  "/detalle/:tipo_sugerencia_id",
  authenticateToken,
  getTipoSugerencia
);

tipos_sugerencias.post("/", authenticateToken, postTipoSugerencia);

tipos_sugerencias.put("/modificar", authenticateToken, putTipoSugerencia);
tipos_sugerencias.put("/inactivar", authenticateToken, deleteTipoSugerencia);

export default tipos_sugerencias;
