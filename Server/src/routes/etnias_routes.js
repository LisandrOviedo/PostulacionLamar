const { Router } = require("express");
const {
  getEtnias,
  getEtniasActivas,
  getEtnia,
  postEtnia,
  putEtnia,
  deleteEtnia,
} = require("../handlers/etnias_handlers");

const { authenticateToken } = require("../auth/index");

const etnias = Router();

etnias.get("/", authenticateToken, getEtnias);
etnias.get("/activas", authenticateToken, getEtniasActivas);
etnias.get("/detalle/:etnia_id", authenticateToken, getEtnia);

etnias.post("/", authenticateToken, postEtnia);

etnias.put("/modificar", authenticateToken, putEtnia);
etnias.put("/inactivar", authenticateToken, deleteEtnia);

module.exports = etnias;
