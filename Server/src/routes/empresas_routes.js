import { Router } from "express";
import {
  getEmpresas,
  getEmpresasActivas,
  getEmpresa,
  postEmpresa,
  putEmpresa,
  deleteEmpresa,
} from "../handlers/empresas_handlers.js";

import { authenticateToken } from "../auth/index.js";

const empresas = Router();

empresas.get("/", authenticateToken, getEmpresas);
empresas.get("/activas", getEmpresasActivas);
empresas.get("/detalle/:empresa_id", authenticateToken, getEmpresa);

empresas.post("/", authenticateToken, postEmpresa);

empresas.put("/modificar", authenticateToken, putEmpresa);
empresas.put("/inactivar", authenticateToken, deleteEmpresa);

export default empresas;
