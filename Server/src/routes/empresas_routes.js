const { Router } = require("express");
const {
  getEmpresas,
  getEmpresasActivas,
  getEmpresa,
  postEmpresa,
  putEmpresa,
  deleteEmpresa,
} = require("../handlers/empresas_handlers");

const { authenticateToken } = require("../auth/index");

const empresas = Router();

empresas.get("/", authenticateToken, getEmpresas);
empresas.get("/activos", authenticateToken, getEmpresasActivas);
empresas.get("/detalle/:empresa_id", authenticateToken, getEmpresa);

empresas.post("/", authenticateToken, postEmpresa);

empresas.put("/modificar", authenticateToken, putEmpresa);
empresas.put("/inactivar", authenticateToken, deleteEmpresa);

module.exports = empresas;
