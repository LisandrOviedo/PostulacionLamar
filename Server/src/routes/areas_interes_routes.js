const { Router } = require("express");
const {
  getAreasInteres,
  getAreasInteresActivas,
  getAreaInteres,
  postAreaInteres,
  postAreasInteresCurriculo,
  putAreaInteres,
  deleteAreaInteres,
  deleteAreasInteresCurriculo,
} = require("../handlers/areas_interes_handlers");

const areasinteres = Router();

areasinteres.get("/", getAreasInteres);
areasinteres.get("/activas", getAreasInteresActivas);
areasinteres.get("/detalle/:area_interes_id", getAreaInteres);

areasinteres.post("/", postAreaInteres);
areasinteres.post("/agregarArea", postAreasInteresCurriculo);

areasinteres.put("/modificar", putAreaInteres);
areasinteres.put("/inactivar", deleteAreaInteres);

areasinteres.delete(
  "/eliminarAreas/:curriculo_id",
  deleteAreasInteresCurriculo
);

module.exports = areasinteres;
