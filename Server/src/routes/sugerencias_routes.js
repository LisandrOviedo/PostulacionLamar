const { Router } = require("express");
const {
  getSugerencias,
  getSugerenciasActivas,
  getSugerenciasActivasNoRevisadas,
  getSugerencia,
  postSugerencia,
  deleteSugerencia,
} = require("../handlers/sugerencias_handlers");

const { authenticateToken } = require("../auth/index");

const sugerencias = Router();

sugerencias.get("/", authenticateToken, getSugerencias);
sugerencias.get("/activas", authenticateToken, getSugerenciasActivas);
sugerencias.get("/activasNoRevisadas", getSugerenciasActivasNoRevisadas);

sugerencias.post("/detalle", authenticateToken, getSugerencia);
sugerencias.post("/", postSugerencia);

sugerencias.put("/inactivar", authenticateToken, deleteSugerencia);

module.exports = sugerencias;
