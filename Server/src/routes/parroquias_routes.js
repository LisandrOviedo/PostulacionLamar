const { Router } = require("express");
const {
  getParroquias,
  getParroquiasActivos,
  getParroquia,
  postParroquia,
  putParroquia,
  deleteParroquia,
} = require("../handlers/parroquias_handlers");

const { authenticateToken } = require("../auth/index");

const parroquias = Router();

parroquias.get("/:municipio_id", authenticateToken, getParroquias);
parroquias.get(
  "/activas/:municipio_id",
  authenticateToken,
  getParroquiasActivos
);
parroquias.get("/detalle/:parroquia_id", authenticateToken, getParroquia);

parroquias.post("/", authenticateToken, postParroquia);

parroquias.put("/modificar", authenticateToken, putParroquia);
parroquias.put("/inactivar", authenticateToken, deleteParroquia);

module.exports = parroquias;
