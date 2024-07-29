const { Router } = require("express");
const {
  getRevisionesFichasIngresos,
  getRevisionesFichasIngresosActivas,
  getRevisionFichaIngreso,
  postRevisionFichaIngreso,
  putRevisionFichaIngreso,
  deleteRevisionFichaIngreso,
} = require("../handlers/revisiones_fichas_ingresos_handlers");

const { authenticateToken } = require("../auth/index");

const revisiones_fichas_ingresos = Router();

revisiones_fichas_ingresos.get(
  "/",
  authenticateToken,
  getRevisionesFichasIngresos
);
revisiones_fichas_ingresos.get(
  "/activos",
  authenticateToken,
  getRevisionesFichasIngresosActivas
);
revisiones_fichas_ingresos.get(
  "/detalle/:revision_ficha_ingreso_id",
  authenticateToken,
  getRevisionFichaIngreso
);

revisiones_fichas_ingresos.post(
  "/",
  authenticateToken,
  postRevisionFichaIngreso
);

revisiones_fichas_ingresos.put(
  "/modificar",
  authenticateToken,
  putRevisionFichaIngreso
);
revisiones_fichas_ingresos.put(
  "/inactivar",
  authenticateToken,
  deleteRevisionFichaIngreso
);

module.exports = revisiones_fichas_ingresos;
