const { Router } = require("express");
const {
  getCurriculos,
  getCurriculo,
  getCurriculoPDF,
  getCurriculoPDFAnexos,
  getCurriculoEmpleado,
  putCurriculo,
  deleteCurriculo,
} = require("../handlers/curriculos_handlers");

const { authenticateToken } = require("../auth/index");

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
curriculos.put("/inactivar", authenticateToken, deleteCurriculo);

module.exports = curriculos;
