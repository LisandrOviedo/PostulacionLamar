const { Router } = require("express");
const {
  getFichasIngresosEmpleado,
  getFichaIngresoEmpleado,
  getFichaIngreso,
  getFichaIngresoPDF,
  postFichaIngreso,
  putFichaIngreso,
  deleteFichaIngreso,
} = require("../handlers/fichas_ingresos_handlers");

const { authenticateToken } = require("../auth/index");

const fichas_ingresos = Router();

fichas_ingresos.get(
  "/:empleado_id",
  authenticateToken,
  getFichasIngresosEmpleado
);
fichas_ingresos.get(
  "/empleado/:empleado_id",
  authenticateToken,
  getFichaIngresoEmpleado
);
fichas_ingresos.get(
  "/detalle/:ficha_ingreso_id",
  authenticateToken,
  getFichaIngreso
);

fichas_ingresos.post("/", authenticateToken, postFichaIngreso);
fichas_ingresos.post("/detalle", authenticateToken, getFichaIngresoPDF);

fichas_ingresos.put("/modificar", authenticateToken, putFichaIngreso);
fichas_ingresos.put("/inactivar", authenticateToken, deleteFichaIngreso);

module.exports = fichas_ingresos;
