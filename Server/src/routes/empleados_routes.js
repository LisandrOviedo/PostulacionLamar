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

const { authenticateToken } = require("../auth/index");

const empleados = Router();

empleados.get("/", authenticateToken, getEmpleados);
empleados.get("/detalle/:empleado_id", authenticateToken, getEmpleado);
empleados.get("/cargoActual/:empleado_id", authenticateToken, getCargoActual);
empleados.get("/login", getLogin);

empleados.post("/", authenticateToken, postEmpleado);

empleados.put("/modificarClave", authenticateToken, putClaveEmpleado);
empleados.put("/modificar", authenticateToken, putEmpleado);
empleados.put("/inactivar", authenticateToken, deleteEmpleado);

module.exports = empleados;
