const { Router } = require("express");
const {
  getUsuarios,
  getUsuario,
  getLogin,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../handlers/usuarios_handlers");

const { authenticateToken } = require("../auth/index");

const usuarios = Router();

usuarios.get("/", getUsuarios);
usuarios.get("/detalle/:usuario_id", getUsuario);
usuarios.get("/login", getLogin);

usuarios.post("/", postUsuario);

usuarios.put("/modificar", putUsuario);
usuarios.put("/inactivar", authenticateToken, deleteUsuario);

module.exports = usuarios;
