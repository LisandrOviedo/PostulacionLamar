const { Router } = require("express");
const {
  getTitulosObtenidos,
  getTituloObtenido,
  postTitulosObtenidos,
  putTituloObtenido,
  deleteTituloObtenido,
} = require("../handlers/titulos_obtenidos_handlers");

const { authenticateToken } = require("../auth/index");

const titulos_obtenidos = Router();

titulos_obtenidos.get(
  "/empleado/:empleado_id",
  authenticateToken,
  getTitulosObtenidos
);
titulos_obtenidos.get(
  "/detalle/:titulo_obtenido_id",
  authenticateToken,
  getTituloObtenido
);

titulos_obtenidos.post("/", authenticateToken, postTitulosObtenidos);

titulos_obtenidos.put("/modificar", authenticateToken, putTituloObtenido);
titulos_obtenidos.put("/inactivar", authenticateToken, deleteTituloObtenido);

module.exports = titulos_obtenidos;
