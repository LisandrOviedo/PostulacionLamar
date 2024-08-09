const { Router } = require("express");
const {
  getExperiencias,
  getExperiencia,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
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

module.exports = experiencias;
