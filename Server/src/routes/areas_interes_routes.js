const { Router } = require("express");
const {
  getAreasInteres,
  getAreasInteresActivas,
  getAreaInteres,
  postAreaInteres,
  postAreasInteresCurriculo,
  putAreaInteres,
  deleteAreaInteres,
} = require("../handlers/areas_interes_handlers");

const { authenticateToken } = require("../auth/index");

const areas_interes = Router();

areas_interes.get("/", authenticateToken, getAreasInteres);
areas_interes.get("/activas", authenticateToken, getAreasInteresActivas);
areas_interes.get(
  "/detalle/:area_interes_id",
  authenticateToken,
  getAreaInteres
);

areas_interes.post("/", authenticateToken, postAreaInteres);
areas_interes.post(
  "/agregarArea",
  authenticateToken,
  postAreasInteresCurriculo
);

areas_interes.put("/modificar", authenticateToken, putAreaInteres);
areas_interes.put("/inactivar", authenticateToken, deleteAreaInteres);

module.exports = areas_interes;
