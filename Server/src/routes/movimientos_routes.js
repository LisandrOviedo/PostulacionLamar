import { Router } from "express";
import {
  getMovimientos,
  getMovimiento,
  getMovimientoPDF,
  postMovimiento,
  putMovimiento,
  putAprobarMovimiento,
  putDenegarMovimiento,
  deleteMovimiento,
} from "../handlers/movimientos_handlers.js";

import { authenticateToken } from "../auth/index.js";

const movimientos = Router();

movimientos.get("/detalle", authenticateToken, getMovimiento);

movimientos.post("/", authenticateToken, postMovimiento);
movimientos.post("/allMovimientos", authenticateToken, getMovimientos);
movimientos.post("/detalle", authenticateToken, getMovimientoPDF);

movimientos.put("/modificar", authenticateToken, putMovimiento);
movimientos.put("/aprobar", authenticateToken, putAprobarMovimiento);
movimientos.put("/denegar", authenticateToken, putDenegarMovimiento);
movimientos.put("/inactivar", authenticateToken, deleteMovimiento);

export default movimientos;
