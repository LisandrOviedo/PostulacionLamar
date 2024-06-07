const { Router } = require("express");
const {
  postRespuestasKostick,
} = require("../handlers/respuestas_kostick_handlers");

const { authenticateToken } = require("../auth/index");

const respuestas_kostick = Router();

respuestas_kostick.post("/", authenticateToken, postRespuestasKostick);

module.exports = respuestas_kostick;
