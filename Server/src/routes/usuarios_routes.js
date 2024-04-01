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

usuarios.get("/", authenticateToken, getUsuarios);
usuarios.get("/detalle/:usuario_id", authenticateToken, getUsuario);
usuarios.get("/login", getLogin);

usuarios.post("/", authenticateToken, postUsuario);

usuarios.put("/modificar", authenticateToken, putUsuario);
usuarios.put("/inactivar", authenticateToken, deleteUsuario);

module.exports = usuarios;
