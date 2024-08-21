const { Router } = require("express");
const {
  getTiposSugerencias,
  getTiposSugerenciasActivas,
  getTipoSugerencia,
  postTipoSugerencia,
  putTipoSugerencia,
  deleteTipoSugerencia,
} = require("../handlers/sugerencias_pred_handlers");

const { authenticateToken } = require("../auth/index");

const tipos_sugerencias = Router();

tipos_sugerencias.get("/", authenticateToken, getTiposSugerencias);
tipos_sugerencias.get(
  "/activos",
  authenticateToken,
  getTiposSugerenciasActivas
);
tipos_sugerencias.get(
  "/detalle/:tipo_sugerencia_id",
  authenticateToken,
  getTipoSugerencia
);

tipos_sugerencias.post("/", authenticateToken, postTipoSugerencia);

tipos_sugerencias.put("/modificar", authenticateToken, putTipoSugerencia);
tipos_sugerencias.put("/inactivar", authenticateToken, deleteTipoSugerencia);

module.exports = tipos_sugerencias;
