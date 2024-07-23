const { Router } = require("express");
const {
  getEstados,
  getEstadosActivos,
  getEstado,
  postEstado,
  putEstado,
  deleteEstado,
} = require("../handlers/estados_handlers");

const { authenticateToken } = require("../auth/index");

const estados = Router();

estados.get("/:pais_id", authenticateToken, getEstados);
estados.get("/activas/:pais_id", authenticateToken, getEstadosActivos);
estados.get("/detalle/:estado_id", authenticateToken, getEstado);

estados.post("/", authenticateToken, postEstado);

estados.put("/modificar", authenticateToken, putEstado);
estados.put("/inactivar", authenticateToken, deleteEstado);

module.exports = estados;
