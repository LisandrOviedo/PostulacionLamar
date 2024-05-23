const { Router } = require("express");
const {
  getIdiomas,
  getIdioma,
  getIdiomasActivos,
  postIdioma,
  putIdioma,
  deleteIdioma,
  postIdiomasCurriculo,
  deleteIdiomasCurriculo,
} = require("../handlers/idiomas_handlers");

const { authenticateToken } = require("../auth/index");

const idiomas = Router();

idiomas.get("/", authenticateToken, getIdiomas);
idiomas.get("/detalle/:idioma_id", authenticateToken, getIdioma);
idiomas.get("/activos", authenticateToken, getIdiomasActivos);

idiomas.post("/", authenticateToken, postIdioma);
idiomas.post("/agregarIdioma", authenticateToken, postIdiomasCurriculo);

idiomas.put("/modificar", authenticateToken, putIdioma);
idiomas.put("/inactivar", authenticateToken, deleteIdioma);

idiomas.delete(
  "/eliminarIdiomas/:curriculo_id",
  authenticateToken,
  deleteIdiomasCurriculo
);

module.exports = idiomas;
