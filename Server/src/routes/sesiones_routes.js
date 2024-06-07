const { Router } = require("express");
const { deleteSesion } = require("../handlers/sesiones_handlers");

const { authenticateToken } = require("../auth/index");

const sesiones = Router();

sesiones.put("/inactivar", authenticateToken, deleteSesion);

module.exports = sesiones;
