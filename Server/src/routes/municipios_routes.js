const { Router } = require("express");
const {
  getMunicipios,
  getMunicipiosActivos,
  getMunicipio,
  postMunicipio,
  putMunicipio,
  deleteMunicipio,
} = require("../handlers/municipios_handlers");

const { authenticateToken } = require("../auth/index");

const municipios = Router();

municipios.get("/:ciudad_id", authenticateToken, getMunicipios);
municipios.get("/activas/:ciudad_id", authenticateToken, getMunicipiosActivos);
municipios.get("/detalle/:municipio_id", authenticateToken, getMunicipio);

municipios.post("/", authenticateToken, postMunicipio);

municipios.put("/modificar", authenticateToken, putMunicipio);
municipios.put("/inactivar", authenticateToken, deleteMunicipio);

module.exports = municipios;
