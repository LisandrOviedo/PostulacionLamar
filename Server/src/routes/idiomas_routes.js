const { Router } = require("express");
const {
  getIdiomas,
  getIdiomasActivos,
  getIdioma,
  postIdioma,
  putIdioma,
  deleteIdioma,
  postIdiomasCurriculo,
} = require("../handlers/idiomas_handlers");

const { authenticateToken } = require("../auth/index");

const idiomas = Router();

idiomas.get("/", authenticateToken, getIdiomas);
idiomas.get("/activos", authenticateToken, getIdiomasActivos);
idiomas.get("/detalle/:idioma_id", authenticateToken, getIdioma);

idiomas.post("/", authenticateToken, postIdioma);
idiomas.post("/agregarIdioma", authenticateToken, postIdiomasCurriculo);

idiomas.put("/modificar", authenticateToken, putIdioma);
idiomas.put("/inactivar", authenticateToken, deleteIdioma);

module.exports = idiomas;
