import { Router } from "express";
import {
  getDatosBancarios,
  getDatosBancariosActivos,
  getDatoBancario,
  postDatoBancario,
  putDatoBancario,
  deleteDatoBancario,
} from "../handlers/datos_bancarios_handlers.js";

import { authenticateToken } from "../auth/index.js";

const datos_bancarios = Router();

datos_bancarios.get("/:empleado_id", authenticateToken, getDatosBancarios);
datos_bancarios.get(
  "/activos/:empleado_id",
  authenticateToken,
  getDatosBancariosActivos
);
datos_bancarios.get(
  "/detalle/:dato_bancario_id",
  authenticateToken,
  getDatoBancario
);

datos_bancarios.post("/", authenticateToken, postDatoBancario);

datos_bancarios.put("/modificar", authenticateToken, putDatoBancario);
datos_bancarios.put("/inactivar", authenticateToken, deleteDatoBancario);

export default datos_bancarios;
