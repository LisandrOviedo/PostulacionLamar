import { Router } from "express";
import {
  getEtnias,
  getEtniasActivas,
  getEtnia,
  postEtnia,
  putEtnia,
  deleteEtnia,
} from "../handlers/etnias_handlers.js";

import { authenticateToken } from "../auth/index.js";

const etnias = Router();

etnias.get("/", authenticateToken, getEtnias);
etnias.get("/activas", authenticateToken, getEtniasActivas);
etnias.get("/detalle/:etnia_id", authenticateToken, getEtnia);

etnias.post("/", authenticateToken, postEtnia);

etnias.put("/modificar", authenticateToken, putEtnia);
etnias.put("/inactivar", authenticateToken, deleteEtnia);

export default etnias;
