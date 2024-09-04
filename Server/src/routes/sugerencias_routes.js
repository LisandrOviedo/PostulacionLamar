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

sugerencias.get("/activas", authenticateToken, getSugerenciasActivas);
sugerencias.get("/activasNoRevisadas", getSugerenciasActivasNoRevisadas);

sugerencias.post("/detalle", authenticateToken, getSugerencia);
sugerencias.post("/", postSugerencia);
sugerencias.post("/allSugerencias", getSugerencias);

sugerencias.put("/inactivar", authenticateToken, deleteSugerencia);

module.exports = sugerencias;
