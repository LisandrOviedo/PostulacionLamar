import { Router } from "express";
import {
  getAreasInteres,
  getAreasInteresActivas,
  getAreaInteres,
  postAreaInteres,
  postAreasInteresCurriculo,
  putAreaInteres,
  deleteAreaInteres,
} from "../handlers/areas_interes_handlers.js";

import { authenticateToken } from "../auth/index.js";

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

export default areas_interes;
