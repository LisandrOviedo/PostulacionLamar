import { Router } from "express";
import {
  getClasesMovimientos,
  getClasesMovimientosActivos,
  getClaseMovimiento,
  postClaseMovimiento,
  putClaseMovimiento,
  deleteClaseMovimiento,
} from "../handlers/clases_movimientos_handlers.js";

import { authenticateToken } from "../auth/index.js";

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

export default clases_movimientos;
