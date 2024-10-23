import { Router } from "express";
import {
  getDepartamentos,
  getDepartamentosActivos,
  getDepartamento,
  postDepartamento,
  putDepartamento,
  deleteDepartamento,
} from "../handlers/departamentos_handlers.js";

import { authenticateToken } from "../auth/index.js";

const departamentos = Router();

departamentos.get("/:empresa_id", authenticateToken, getDepartamentos);
departamentos.get(
  "/activos/:empresa_id",
  authenticateToken,
  getDepartamentosActivos
);
departamentos.get(
  "/detalle/:departamento_id",
  authenticateToken,
  getDepartamento
);

departamentos.post("/", authenticateToken, postDepartamento);

departamentos.put("/modificar", authenticateToken, putDepartamento);
departamentos.put("/inactivar", authenticateToken, deleteDepartamento);

export default departamentos;
