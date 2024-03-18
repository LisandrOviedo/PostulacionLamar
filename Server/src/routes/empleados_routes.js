const { Router } = require("express");
const {
  getEmpleados,
  getEmpleado,
  postEmpleado,
  putEmpleado,
  deleteEmpleado,
} = require("../handlers/empleados_handlers");

const empleados = Router();

empleados.get("/", getEmpleados);
empleados.get("/detalle/:empleado_id", getEmpleado);

empleados.post("/", postEmpleado);

empleados.put("/modificar", putEmpleado);
empleados.put("/inactivar", deleteEmpleado);

module.exports = empleados;
