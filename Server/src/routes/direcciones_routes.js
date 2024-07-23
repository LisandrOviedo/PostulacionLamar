const { Router } = require("express");
const {
  getDirecciones,
  getDireccionesActivas,
  getDireccion,
  postDireccion,
  putDireccion,
  deleteDireccion,
} = require("../handlers/direcciones_handlers");

const { authenticateToken } = require("../auth/index");

const direcciones = Router();

direcciones.get("/:empleado_id", authenticateToken, getDirecciones);
direcciones.get(
  "/activas/:empleado_id",
  authenticateToken,
  getDireccionesActivas
);
direcciones.get("/detalle/:direccion_id", authenticateToken, getDireccion);

direcciones.post("/", authenticateToken, postDireccion);

direcciones.put("/modificar", authenticateToken, putDireccion);
direcciones.put("/inactivar", authenticateToken, deleteDireccion);

module.exports = direcciones;
