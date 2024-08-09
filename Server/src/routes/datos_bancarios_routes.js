const { Router } = require("express");
const {
  getDatosBancarios,
  getDatosBancariosActivos,
  getDatoBancario,
  postDatoBancario,
  putDatoBancario,
  deleteDatoBancario,
} = require("../handlers/datos_bancarios_handlers");

const { authenticateToken } = require("../auth/index");

const datos_bancarios = Router();

datos_bancarios.get("/:empleado_id", authenticateToken, getDatosBancarios);
datos_bancarios.get(
  "/activos/:empleado_id",
  authenticateToken,
  getDatosBancariosActivos
);
datos_bancarios.get(
  "/detalle/:dato_bancario_id",
  authenticateToken,
  getDatoBancario
);

datos_bancarios.post("/", authenticateToken, postDatoBancario);

datos_bancarios.put("/modificar", authenticateToken, putDatoBancario);
datos_bancarios.put("/inactivar", authenticateToken, deleteDatoBancario);

module.exports = datos_bancarios;
