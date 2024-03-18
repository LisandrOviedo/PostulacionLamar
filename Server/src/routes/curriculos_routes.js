const { Router } = require("express");
const {
  getCurriculos,
  getCurriculo,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
} = require("../handlers/curriculos_handlers");

const curriculos = Router();

curriculos.get("/", getCurriculos);
curriculos.get("/detalle/:curriculo_id", getCurriculo);

curriculos.post("/", postCurriculo);

curriculos.put("/modificar", putCurriculo);
curriculos.put("/inactivar", deleteCurriculo);

module.exports = curriculos;
