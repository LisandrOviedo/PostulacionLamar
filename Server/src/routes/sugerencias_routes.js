const { Router } = require("express");
const {
  getSugerencias,
  getSugerenciasActivas,
  getSugerencia,
  postSugerencia,
  deleteSugerencia,
} = require("../handlers/sugerencias_handlers");

const { authenticateToken } = require("../auth/index");

const sugerencias = Router();

sugerencias.get("/", authenticateToken, getSugerencias);
sugerencias.get("/activos", authenticateToken, getSugerenciasActivas);

sugerencias.post("/detalle", authenticateToken, getSugerencia);
sugerencias.post("/", authenticateToken, postSugerencia);

sugerencias.put("/inactivar", authenticateToken, deleteSugerencia);

module.exports = sugerencias;
