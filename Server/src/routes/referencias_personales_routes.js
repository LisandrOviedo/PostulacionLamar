import { Router } from "express";
import {
  getReferenciasPersonales,
  getReferenciasPersonalesActivas,
  getReferenciaPersonal,
  postReferenciaPersonal,
  putReferenciaPersonal,
  deleteReferenciaPersonal,
} from "../handlers/referencias_personales_handlers.js";

import { authenticateToken } from "../auth/index.js";

const referencias_personales = Router();

referencias_personales.get(
  "/:empleado_id",
  authenticateToken,
  getReferenciasPersonales
);
referencias_personales.get(
  "/activos/:empleado_id",
  authenticateToken,
  getReferenciasPersonalesActivas
);
referencias_personales.get(
  "/detalle/:referencia_personal_id",
  authenticateToken,
  getReferenciaPersonal
);

referencias_personales.post("/", authenticateToken, postReferenciaPersonal);

referencias_personales.put(
  "/modificar",
  authenticateToken,
  putReferenciaPersonal
);
referencias_personales.put(
  "/inactivar",
  authenticateToken,
  deleteReferenciaPersonal
);

export default referencias_personales;
