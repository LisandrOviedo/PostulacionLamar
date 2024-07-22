const { Router } = require("express");
const {
  getPreguntasKostick,
} = require("../handlers/preguntas_kostick_handlers");

const { authenticateToken } = require("../auth/index");

const preguntas_kostick = Router();

preguntas_kostick.get("/", authenticateToken, getPreguntasKostick);

module.exports = preguntas_kostick;
