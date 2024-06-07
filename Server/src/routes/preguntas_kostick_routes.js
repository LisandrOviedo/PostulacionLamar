const { Router } = require("express");
const {
  getPreguntasKostick,
  postPreguntasKostick,
} = require("../handlers/preguntas_kostick_handlers");

const { authenticateToken } = require("../auth/index");

const preguntas_kostick = Router();

preguntas_kostick.get("/", authenticateToken, getPreguntasKostick);

preguntas_kostick.post("/", postPreguntasKostick);

module.exports = preguntas_kostick;
