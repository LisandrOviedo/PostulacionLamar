const { Router } = require("express");
const {
  getPaises,
  getPaisesActivos,
  getPais,
  postPais,
  putPais,
  deletePais,
} = require("../handlers/paises_handlers");

const { authenticateToken } = require("../auth/index");

const paises = Router();

paises.get("/", authenticateToken, getPaises);
paises.get("/activas", authenticateToken, getPaisesActivos);
paises.get("/detalle/:pais_id", authenticateToken, getPais);

paises.post("/", authenticateToken, postPais);

paises.put("/modificar", authenticateToken, putPais);
paises.put("/inactivar", authenticateToken, deletePais);

module.exports = paises;
