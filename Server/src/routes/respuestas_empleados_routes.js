const { Router } = require("express");
const {
  getRespuestasEmpleados,
  getRespuestasEmpleado,
  postRespuestasEmpleado,
} = require("../handlers/respuestas_empleados_handlers");

const { authenticateToken } = require("../auth/index");

const respuestas_empleados = Router();

respuestas_empleados.get(
  "/empleado/:empleado_id",
  authenticateToken,
  getRespuestasEmpleado
);

respuestas_empleados.post(
  "/allRespuestasEmpleados",
  authenticateToken,
  getRespuestasEmpleados
);
respuestas_empleados.post("/", authenticateToken, postRespuestasEmpleado);

module.exports = respuestas_empleados;
