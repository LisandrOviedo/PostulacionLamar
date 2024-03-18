const { Router } = require("express");
const {
  getCargosTitulos,
  getCargoTitulo,
  postCargoTitulo,
  putCargoTitulo,
  deleteCargoTitulo,
} = require("../handlers/cargo_titulos_handlers");

const cargostitulos = Router();

cargostitulos.get("/", getCargosTitulos);
cargostitulos.get("/detalle/:cargo_titulo_id", getCargoTitulo);

cargostitulos.post("/", postCargoTitulo);

cargostitulos.put("/modificar", putCargoTitulo);
cargostitulos.put("/inactivar", deleteCargoTitulo);

module.exports = cargostitulos;
