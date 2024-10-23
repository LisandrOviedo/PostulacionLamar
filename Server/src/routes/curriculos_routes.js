import { Router } from "express";
import {
  getCurriculos,
  getCurriculo,
  getCurriculoPDF,
  getCurriculoPDFAnexos,
  getCurriculoEmpleado,
  putCurriculo,
  putCurriculoEstado,
  deleteCurriculo,
} from "../handlers/curriculos_handlers.js";

import { authenticateToken } from "../auth/index.js";

const curriculos = Router();

curriculos.get("/detalle/:curriculo_id", authenticateToken, getCurriculo);
curriculos.get(
  "/detalleEmpleado/:empleado_id",
  authenticateToken,
  getCurriculoEmpleado
);

curriculos.post("/detalle", authenticateToken, getCurriculoPDF);
curriculos.post("/detalleAnexos", authenticateToken, getCurriculoPDFAnexos);
curriculos.post("/allCurriculos", authenticateToken, getCurriculos);

curriculos.put("/modificar", authenticateToken, putCurriculo);
curriculos.put("/modificarEstado", authenticateToken, putCurriculoEstado);
curriculos.put("/inactivar", authenticateToken, deleteCurriculo);

export default curriculos;
