import { Router } from "express";
import {
  getSugerenciasPred,
  getSugerenciasPredActivas,
  getSugerenciaPred,
  postSugerenciaPred,
  putSugerenciaPred,
  deleteSugerenciaPred,
} from "../handlers/sugerencias_pred_handlers.js";

import { authenticateToken } from "../auth/index.js";

const sugerencias_pred = Router();

sugerencias_pred.get(
  "/:tipo_sugerencia_id",
  authenticateToken,
  getSugerenciasPred
);
sugerencias_pred.get("/activas/:tipo_sugerencia_id", getSugerenciasPredActivas);
sugerencias_pred.get(
  "/detalle/:sugerencia_pred_id",
  authenticateToken,
  getSugerenciaPred
);

sugerencias_pred.post("/", authenticateToken, postSugerenciaPred);

sugerencias_pred.put("/modificar", authenticateToken, putSugerenciaPred);
sugerencias_pred.put("/inactivar", authenticateToken, deleteSugerenciaPred);

export default sugerencias_pred;
