const { Router } = require("express");
const {
  getTitulosObtenidos,
  getTituloObtenido,
  postTitulosObtenidos,
  putTituloObtenido,
  deleteTituloObtenido,
  deleteTitulosCurriculo,
} = require("../handlers/titulo_obtenidos_handlers");

const titulos_obtenidos = Router();

titulos_obtenidos.get("/curriculo/:curriculo_id", getTitulosObtenidos);
titulos_obtenidos.get("/detalle/:titulo_obtenido_id", getTituloObtenido);

titulos_obtenidos.post("/", postTitulosObtenidos);

titulos_obtenidos.put("/modificar", putTituloObtenido);
titulos_obtenidos.put("/inactivar", deleteTituloObtenido);

titulos_obtenidos.delete(
  "/eliminarTitulos/:curriculo_id",
  deleteTitulosCurriculo
);

module.exports = titulos_obtenidos;
