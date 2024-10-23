import { Router } from "express";
import {
  getSugerencias,
  getSugerenciasActivas,
  getSugerenciasActivasNoRevisadas,
  getSugerencia,
  postSugerencia,
  deleteSugerencia,
} from "../handlers/sugerencias_handlers.js";

import { authenticateToken } from "../auth/index.js";

const sugerencias = Router();

sugerencias.get("/activas", authenticateToken, getSugerenciasActivas);
sugerencias.get("/activasNoRevisadas", getSugerenciasActivasNoRevisadas);

sugerencias.post("/detalle", authenticateToken, getSugerencia);
sugerencias.post("/", postSugerencia);
sugerencias.post("/allSugerencias", getSugerencias);

sugerencias.put("/inactivar", authenticateToken, deleteSugerencia);

export default sugerencias;
