const { Router } = require("express");
const {
  getCiudades,
  getCiudadesActivas,
  getCiudad,
  postCiudad,
  putCiudad,
  deleteCiudad,
} = require("../handlers/ciudades_handlers");

const { authenticateToken } = require("../auth/index");

const ciudades = Router();

ciudades.get("/:estado_id", authenticateToken, getCiudades);
ciudades.get("/activas/:estado_id", authenticateToken, getCiudadesActivas);
ciudades.get("/detalle/:ciudad_id", authenticateToken, getCiudad);

ciudades.post("/", authenticateToken, postCiudad);

ciudades.put("/modificar", authenticateToken, putCiudad);
ciudades.put("/inactivar", authenticateToken, deleteCiudad);

module.exports = ciudades;
