const { Router } = require("express");
const {
  getReferenciasPersonales,
  getReferenciasPersonalesActivas,
  getReferenciaPersonal,
  postReferenciaPersonal,
  putReferenciaPersonal,
  deleteReferenciaPersonal,
} = require("../handlers/referencias_personales_handlers");

const { authenticateToken } = require("../auth/index");

const referencias_personales = Router();

referencias_personales.get(
  "/:empleado_id",
  authenticateToken,
  getReferenciasPersonales
);
referencias_personales.get(
  "/activos/:empleado_id",
  authenticateToken,
  getReferenciasPersonalesActivas
);
referencias_personales.get(
  "/detalle/:referencia_personal_id",
  authenticateToken,
  getReferenciaPersonal
);

referencias_personales.post("/", authenticateToken, postReferenciaPersonal);

referencias_personales.put(
  "/modificar",
  authenticateToken,
  putReferenciaPersonal
);
referencias_personales.put(
  "/inactivar",
  authenticateToken,
  deleteReferenciaPersonal
);

module.exports = referencias_personales;
