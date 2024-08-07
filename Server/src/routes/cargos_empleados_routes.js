const { Router } = require("express");
const {
  getCargosEmpleadosEmpleados,
  getCargosEmpleadosEmpleadosActivos,
  getCargoEmpleado,
  postCargoEmpleado,
  putCargoEmpleado,
  deleteCargoEmpleado,
} = require("../handlers/cargos_empleados_handlers");

const { authenticateToken } = require("../auth/index");

const cargos_empleados = Router();

cargos_empleados.get(
  "/:empleado_id",
  authenticateToken,
  getCargosEmpleadosEmpleados
);
cargos_empleados.get(
  "/activos/:empleado_id",
  authenticateToken,
  getCargosEmpleadosEmpleadosActivos
);
cargos_empleados.get(
  "/detalle/:cargo_empleado_id",
  authenticateToken,
  getCargoEmpleado
);

cargos_empleados.post("/", authenticateToken, postCargoEmpleado);

cargos_empleados.put("/modificar", authenticateToken, putCargoEmpleado);
cargos_empleados.put("/inactivar", authenticateToken, deleteCargoEmpleado);

module.exports = cargos_empleados;
