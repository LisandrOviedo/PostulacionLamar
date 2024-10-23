import { Router } from "express";
import {
  getEstados,
  getEstadosActivos,
  getEstado,
  postEstado,
  putEstado,
  deleteEstado,
} from "../handlers/estados_handlers.js";

import { authenticateToken } from "../auth/index.js";

const estados = Router();

estados.get("/:pais_id", authenticateToken, getEstados);
estados.get("/activos/:pais_id", authenticateToken, getEstadosActivos);
estados.get("/detalle/:estado_id", authenticateToken, getEstado);

estados.post("/", authenticateToken, postEstado);

estados.put("/modificar", authenticateToken, putEstado);
estados.put("/inactivar", authenticateToken, deleteEstado);

export default estados;
