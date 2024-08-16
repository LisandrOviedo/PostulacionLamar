const { Router } = require("express");
const {
  getTiposMovimientos,
  getTiposMovimientosActivos,
  getTipoMovimiento,
  postTipoMovimiento,
  putTipoMovimiento,
  deleteTipoMovimiento,
} = require("../handlers/tipos_movimientos_handlers");

const { authenticateToken } = require("../auth/index");

const tipos_movimientos = Router();

tipos_movimientos.get("/", authenticateToken, getTiposMovimientos);
tipos_movimientos.get(
  "/activos",
  authenticateToken,
  getTiposMovimientosActivos
);
tipos_movimientos.get(
  "/detalle/:tipo_movimiento_id",
  authenticateToken,
  getTipoMovimiento
);

tipos_movimientos.post("/", authenticateToken, postTipoMovimiento);

tipos_movimientos.put("/modificar", authenticateToken, putTipoMovimiento);
tipos_movimientos.put("/inactivar", authenticateToken, deleteTipoMovimiento);

module.exports = tipos_movimientos;
