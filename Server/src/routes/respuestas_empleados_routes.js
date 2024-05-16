const { Router } = require("express");
const {
  getRespuestasEmpleados,
  getRespuestasEmpleado,
  postRespuestasEmpleado,
  putRespuestasEmpleado,
  deleteRespuestasEmpleado,
} = require("../handlers/respuestas_empleados_handlers");

const { authenticateToken } = require("../auth/index");

const respuestas_empleados = Router();

respuestas_empleados.get("/", authenticateToken, getRespuestasEmpleados);
respuestas_empleados.get(
  "/empleado/:empleado_id",
  authenticateToken,
  getRespuestasEmpleado
);

respuestas_empleados.post("/", authenticateToken, postRespuestasEmpleado);

respuestas_empleados.put(
  "/modificar",
  authenticateToken,
  putRespuestasEmpleado
);
respuestas_empleados.put(
  "/inactivar",
  authenticateToken,
  deleteRespuestasEmpleado
);

module.exports = respuestas_empleados;
