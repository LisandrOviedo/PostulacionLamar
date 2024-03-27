const { Router } = require("express");
const {
  getAreasInteres,
  getAreasInteresActivas,
  getAreaInteres,
  postAreaInteres,
  putAreaInteres,
  deleteAreaInteres,
  postAreasInteresCurriculo,
} = require("../handlers/areas_interes_handlers");

const areasinteres = Router();

areasinteres.get("/", getAreasInteres);
areasinteres.get("/activas", getAreasInteresActivas);
areasinteres.get("/detalle/:area_interes_id", getAreaInteres);

areasinteres.post("/", postAreaInteres);
areasinteres.post("/agregarArea", postAreasInteresCurriculo);

areasinteres.put("/modificar", putAreaInteres);
areasinteres.put("/inactivar", deleteAreaInteres);

module.exports = areasinteres;
