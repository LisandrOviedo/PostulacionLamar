const { Router } = require("express");
const {
  getVacantes,
  getVacante,
  getPostulacionesEmpleado,
  postVacante,
  postVacanteEmpleado,
  putVacante,
  deleteVacante,
} = require("../handlers/vacantes_handlers");

const { authenticateToken } = require("../auth/index");

const vacantes = Router();

vacantes.get("/", authenticateToken, getVacantes);
vacantes.get("/detalle/:vacante_id", authenticateToken, getVacante);
vacantes.get(
  "/postulacionesEmpleado/:empleado_id",
  authenticateToken,
  getPostulacionesEmpleado
);

vacantes.post("/", authenticateToken, postVacante);
vacantes.post("/postulacion", authenticateToken, postVacanteEmpleado);

vacantes.put("/modificar", authenticateToken, putVacante);
vacantes.put("/inactivar", authenticateToken, deleteVacante);

module.exports = vacantes;
