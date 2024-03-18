const { Router } = require("express");
const {
  getCargosTitulos,
  getCargoTitulo,
  postCargoTitulo,
  putCargoTitulo,
  deleteCargoTitulo,
} = require("../handlers/cargo_titulos_handlers");

const cargotitulos = Router();

cargotitulos.get("/", getCargosTitulos);
cargotitulos.get("/detalle/:cargo_titulo_id", getCargoTitulo);

cargotitulos.post("/", postCargoTitulo);

cargotitulos.put("/modificar", putCargoTitulo);
cargotitulos.put("/inactivar", deleteCargoTitulo);

module.exports = cargotitulos;
