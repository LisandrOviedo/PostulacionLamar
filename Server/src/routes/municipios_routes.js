import { Router } from "express";
import {
  getMunicipios,
  getMunicipiosActivos,
  getMunicipio,
  postMunicipio,
  putMunicipio,
  deleteMunicipio,
} from "../handlers/municipios_handlers.js";

import { authenticateToken } from "../auth/index.js";

const municipios = Router();

municipios.get("/:estado_id", authenticateToken, getMunicipios);
municipios.get("/activos/:estado_id", authenticateToken, getMunicipiosActivos);
municipios.get("/detalle/:municipio_id", authenticateToken, getMunicipio);

municipios.post("/", authenticateToken, postMunicipio);

municipios.put("/modificar", authenticateToken, putMunicipio);
municipios.put("/inactivar", authenticateToken, deleteMunicipio);

export default municipios;
