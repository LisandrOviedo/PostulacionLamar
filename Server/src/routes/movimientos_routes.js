const { Router } = require("express");
const {
  getMovimientos,
  getMovimiento,
  postMovimiento,
  putMovimiento,
  putAprobarMovimiento,
  putDenegarMovimiento,
  deleteMovimiento,
} = require("../handlers/movimientos_handlers");

const { authenticateToken } = require("../auth/index");

const movimientos = Router();

movimientos.get("/detalle/:movimiento_id", authenticateToken, getMovimiento);

movimientos.post("/", authenticateToken, postMovimiento);
movimientos.post("/allMovimientos", authenticateToken, getMovimientos);

movimientos.put("/modificar", authenticateToken, putMovimiento);
movimientos.put("/aprobar", authenticateToken, putAprobarMovimiento);
movimientos.put("/denegar", authenticateToken, putDenegarMovimiento);
movimientos.put("/inactivar", authenticateToken, deleteMovimiento);

module.exports = movimientos;
