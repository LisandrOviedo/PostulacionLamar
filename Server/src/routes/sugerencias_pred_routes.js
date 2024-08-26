const { Router } = require("express");
const {
  getSugerenciasPred,
  getSugerenciasPredActivas,
  getSugerenciaPred,
  postSugerenciaPred,
  putSugerenciaPred,
  deleteSugerenciaPred,
} = require("../handlers/sugerencias_pred_handlers");

const { authenticateToken } = require("../auth/index");

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

module.exports = sugerencias_pred;
