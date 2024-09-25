const { Router } = require("express");
const {
  getClasesMovimientos,
  getClasesMovimientosActivos,
  getClaseMovimiento,
  postClaseMovimiento,
  putClaseMovimiento,
  deleteClaseMovimiento,
} = require("../handlers/clases_movimientos_handlers");

const { authenticateToken } = require("../auth/index");

const clases_movimientos = Router();

clases_movimientos.get("/", authenticateToken, getClasesMovimientos);
clases_movimientos.get(
  "/activas",
  authenticateToken,
  getClasesMovimientosActivos
);
clases_movimientos.get(
  "/detalle/:clase_movimiento_id",
  authenticateToken,
  getClaseMovimiento
);

clases_movimientos.post("/", authenticateToken, postClaseMovimiento);

clases_movimientos.put("/modificar", authenticateToken, putClaseMovimiento);
clases_movimientos.put("/inactivar", authenticateToken, deleteClaseMovimiento);

module.exports = clases_movimientos;
