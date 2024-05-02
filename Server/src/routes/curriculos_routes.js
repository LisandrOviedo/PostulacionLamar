const { Router } = require("express");
const {
  getCurriculos,
  getCurriculo,
  getCurriculoPDF,
  getCurriculoPDFAnexos,
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
} = require("../handlers/curriculos_handlers");

const curriculos = Router();

curriculos.get("/detalle/:curriculo_id", getCurriculo);
curriculos.get("/detalleEmpleado/:empleado_id", getCurriculoEmpleado);

curriculos.post("/detalle", getCurriculoPDF);
curriculos.post("/detalleAnexos", getCurriculoPDFAnexos);
curriculos.post("/allCurriculos", getCurriculos);
curriculos.post("/", postCurriculo);

curriculos.put("/modificar", putCurriculo);
curriculos.put("/inactivar", deleteCurriculo);

module.exports = curriculos;
