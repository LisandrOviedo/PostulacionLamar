const { Router } = require("express");
const {
  getEmpleados,
  getEmpleado,
  getCargoActual,
  getLogin,
  postEmpleado,
  putClaveEmpleado,
  putEmpleado,
  deleteEmpleado,
} = require("../handlers/empleados_handlers");

const empleados = Router();

empleados.get("/", getEmpleados);
empleados.get("/detalle/:empleado_id", getEmpleado);
empleados.get("/cargoActual/:empleado_id", getCargoActual);
empleados.get("/login", getLogin);

empleados.post("/", postEmpleado);

empleados.put("/modificarClave", putClaveEmpleado);
empleados.put("/modificar", putEmpleado);
empleados.put("/inactivar", deleteEmpleado);

module.exports = empleados;
