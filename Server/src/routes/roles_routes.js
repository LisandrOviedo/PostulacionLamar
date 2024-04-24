const { Router } = require("express");
const {
  getRoles,
  getRol,
  postRol,
  putRol,
  deleteRol,
} = require("../handlers/roles_handlers");

const roles = Router();

roles.get("/", getRoles);
roles.get("/detalle/:rol_id", getRol);

roles.post("/", postRol);

roles.put("/modificar", putRol);
roles.put("/inactivar", deleteRol);

module.exports = roles;
