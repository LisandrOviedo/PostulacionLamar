const { Router } = require("express");
const {
  getRespuestas,
  postRespuestas,
  putRespuesta,
  deleteRespuesta,
} = require("../handlers/respuestas_handlers");

const { authenticateToken } = require("../auth/index");

const respuestas = Router();

respuestas.get("/", authenticateToken, getRespuestas);

respuestas.post("/", postRespuestas);

respuestas.put("/modificar", authenticateToken, putRespuesta);
respuestas.put("/inactivar", authenticateToken, deleteRespuesta);

module.exports = respuestas;
