const { Router } = require("express");
const {
  getPruebas,
  getPrueba,
  postPrueba,
} = require("../handlers/pruebas_empleados_handlers");

const { authenticateToken } = require("../auth/index");

const pruebas_empleados = Router();

pruebas_empleados.get("/empleado/:empleado_id", authenticateToken, getPrueba);

pruebas_empleados.post("/allPruebasEmpleados", authenticateToken, getPruebas);

pruebas_empleados.post("/", authenticateToken, postPrueba);

module.exports = pruebas_empleados;
