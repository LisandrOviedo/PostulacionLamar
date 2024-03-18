const { Router } = require("express");
const {
  getExperiencias,
  getExperiencia,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
} = require("../handlers/experiencias_handlers");

const experiencias = Router();

experiencias.get("/", getExperiencias);
experiencias.get("/detalle/:cargo_titulo_id", getExperiencia);

experiencias.post("/", postExperiencia);

experiencias.put("/modificar", putExperiencia);
experiencias.put("/inactivar", deleteExperiencia);

module.exports = experiencias;
