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

const { authenticateToken } = require("../auth/index");

const areasinteres = Router();

areasinteres.get("/", authenticateToken, getAreasInteres);
areasinteres.get("/activas", authenticateToken, getAreasInteresActivas);
areasinteres.get(
  "/detalle/:area_interes_id",
  authenticateToken,
  getAreaInteres
);

areasinteres.post("/", authenticateToken, postAreaInteres);
areasinteres.post("/agregarArea", authenticateToken, postAreasInteresCurriculo);

areasinteres.put("/modificar", authenticateToken, putAreaInteres);
areasinteres.put("/inactivar", authenticateToken, deleteAreaInteres);

areasinteres.delete(
  "/eliminarAreas/:curriculo_id",
  authenticateToken,
  deleteAreasInteresCurriculo
);

module.exports = areasinteres;
