const { Router } = require("express");
const {
  getFichasIngresos,
  getFichasIngresosActivas,
  getFichaIngreso,
  getFichaIngresoEmpleado,
  postFichaIngreso,
  putFichaIngreso,
  deleteFichaIngreso,
} = require("../handlers/fichas_ingresos_handlers");

const { authenticateToken } = require("../auth/index");

const fichas_ingresos = Router();

fichas_ingresos.get("/", authenticateToken, getFichasIngresos);
fichas_ingresos.get("/activas", authenticateToken, getFichasIngresosActivas);
fichas_ingresos.get(
  "/detalle/:ficha_ingreso_id",
  authenticateToken,
  getFichaIngreso
);
fichas_ingresos.get(
  "/detalleEmpleado/:empleado_id",
  authenticateToken,
  getFichaIngresoEmpleado
);

fichas_ingresos.post("/", authenticateToken, postFichaIngreso);

fichas_ingresos.put("/modificar", authenticateToken, putFichaIngreso);
fichas_ingresos.put("/inactivar", authenticateToken, deleteFichaIngreso);

module.exports = fichas_ingresos;
