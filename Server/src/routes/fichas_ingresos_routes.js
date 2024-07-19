const { Router } = require("express");
const {
  getFichasIngresos,
  getFichaIngreso,
  postFichaIngreso,
  putFichaIngreso,
  deleteFichaIngreso,
} = require("../handlers/fichas_ingresos_handlers");

const { authenticateToken } = require("../auth/index");

const fichas_ingresos = Router();

fichas_ingresos.get("/", authenticateToken, getFichasIngresos);
fichas_ingresos.get(
  "/detalle/:empleado_id",
  authenticateToken,
  getFichaIngreso
);

fichas_ingresos.post("/", authenticateToken, postFichaIngreso);

fichas_ingresos.put("/modificar", authenticateToken, putFichaIngreso);
fichas_ingresos.put("/inactivar", authenticateToken, deleteFichaIngreso);

module.exports = fichas_ingresos;
