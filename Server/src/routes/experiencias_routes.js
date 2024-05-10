const { Router } = require("express");
const {
  getExperiencias,
  getExperiencia,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
  deleteExperienciasCurriculo,
} = require("../handlers/experiencias_handlers");

const { authenticateToken } = require("../auth/index");

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

experiencias.delete(
  "/eliminarExperiencias/:curriculo_id",
  authenticateToken,
  deleteExperienciasCurriculo
);

module.exports = experiencias;
