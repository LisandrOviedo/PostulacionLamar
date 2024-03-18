const { Router } = require("express");
const {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
} = require("../handlers/usuarios_handlers");

const usuarios = Router();

usuarios.get("/", getUsuarios);
usuarios.get("/detalle/:id", getUsuario);

usuarios.post("/", postUsuario);

usuarios.put("/modificar", putUsuario);
usuarios.put("/inactivar", deleteUsuario);

module.exports = usuarios;
