const { Router } = require("express");
const {
  getAreasInteres,
  getAreaInteres,
  postAreaInteres,
  putAreaInteres,
  deleteAreaInteres,
} = require("../handlers/areas_interes_handlers");

const areasinteres = Router();

areasinteres.get("/", getAreasInteres);
areasinteres.get("/detalle/:id", getAreaInteres);

areasinteres.post("/", postAreaInteres);

areasinteres.put("/modificar", putAreaInteres);
areasinteres.put("/inactivar", deleteAreaInteres);

module.exports = areasinteres;
