import { Router } from "express";
import {
  getRoles,
  getRol,
  postRol,
  putRol,
  deleteRol,
} from "../handlers/roles_handlers.js";

import { authenticateToken } from "../auth/index.js";

const roles = Router();

roles.get("/", authenticateToken, getRoles);
roles.get("/detalle/:rol_id", authenticateToken, getRol);

roles.post("/", authenticateToken, postRol);

roles.put("/modificar", authenticateToken, putRol);
roles.put("/inactivar", authenticateToken, deleteRol);

export default roles;
