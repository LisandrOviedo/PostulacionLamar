const { Router } = require("express");
const {
  getDepartamentos,
  getDepartamentosActivos,
  getDepartamento,
  postDepartamento,
  putDepartamento,
  deleteDepartamento,
} = require("../handlers/departamentos_handlers");

const { authenticateToken } = require("../auth/index");

const departamentos = Router();

departamentos.get("/:empresa_id", authenticateToken, getDepartamentos);
departamentos.get(
  "/activos/:empresa_id",
  authenticateToken,
  getDepartamentosActivos
);
departamentos.get("/detalle/:departamento_id", authenticateToken, getDepartamento);

departamentos.post("/", authenticateToken, postDepartamento);

departamentos.put("/modificar", authenticateToken, putDepartamento);
departamentos.put("/inactivar", authenticateToken, deleteDepartamento);

module.exports = departamentos;
