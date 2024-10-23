import { Router } from "express";
import {
  getTitulosObtenidos,
  getTituloObtenido,
  postTitulosObtenidos,
  putTituloObtenido,
  deleteTituloObtenido,
} from "../handlers/titulos_obtenidos_handlers.js";

import { authenticateToken } from "../auth/index.js";

const titulos_obtenidos = Router();

titulos_obtenidos.get(
  "/empleado/:empleado_id",
  authenticateToken,
  getTitulosObtenidos
);
titulos_obtenidos.get(
  "/detalle/:titulo_obtenido_id",
  authenticateToken,
  getTituloObtenido
);

titulos_obtenidos.post("/", authenticateToken, postTitulosObtenidos);

titulos_obtenidos.put("/modificar", authenticateToken, putTituloObtenido);
titulos_obtenidos.put("/inactivar", authenticateToken, deleteTituloObtenido);

export default titulos_obtenidos;
