const { Router } = require("express");
const {
  getRoles,
  getRol,
  postRol,
  putRol,
  deleteRol,
  putCambiarRolEmpleado,
} = require("../handlers/roles_handlers");

const { authenticateToken } = require("../auth/index");

const roles = Router();

roles.get("/", authenticateToken, getRoles);
roles.get("/detalle/:rol_id", authenticateToken, getRol);

roles.post("/", authenticateToken, postRol);

roles.put("/modificar", authenticateToken, putRol);
roles.put("/inactivar", authenticateToken, deleteRol);
roles.put("/cambiarRolEmpleado", authenticateToken, putCambiarRolEmpleado);

module.exports = roles;
