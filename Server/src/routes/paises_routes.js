import { Router } from "express";
import {
  getPaises,
  getPaisesActivos,
  getPais,
  postPais,
  putPais,
  deletePais,
} from "../handlers/paises_handlers.js";

import { authenticateToken } from "../auth/index.js";

const paises = Router();

paises.get("/", authenticateToken, getPaises);
paises.get("/activos", authenticateToken, getPaisesActivos);
paises.get("/detalle/:pais_id", authenticateToken, getPais);

paises.post("/", authenticateToken, postPais);

paises.put("/modificar", authenticateToken, putPais);
paises.put("/inactivar", authenticateToken, deletePais);

export default paises;
