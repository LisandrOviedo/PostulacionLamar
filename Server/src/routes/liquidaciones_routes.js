const { Router } = require("express");
const {
  getLiquidaciones,
  getLiquidacion,
  postLiquidacion,
  putLiquidacion,
  deleteLiquidacion,
} = require("../handlers/liquidaciones_handlers");

const { authenticateToken } = require("../auth/index");

const liquidaciones = Router();

liquidaciones.get("/", authenticateToken, getLiquidaciones);
liquidaciones.get("/detalle/:liquidacion_id", authenticateToken, getLiquidacion);

liquidaciones.post("/", authenticateToken, postLiquidacion);

liquidaciones.put("/modificar", authenticateToken, putLiquidacion);
liquidaciones.put("/inactivar", authenticateToken, deleteLiquidacion);

module.exports = liquidaciones;
