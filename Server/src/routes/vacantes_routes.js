const { Router } = require("express");
const {
  getVacantes,
  getVacante,
  getVacanteEmpleados,
  postVacante,
  postVacanteEmpleado,
  putVacante,
  deleteVacante,
} = require("../handlers/vacantes_handlers");

const { authenticateToken } = require("../auth/index");

const vacantes = Router();

vacantes.get("/", authenticateToken, getVacantes);
vacantes.get("/detalle/:vacante_id", authenticateToken, getVacante);

vacantes.post("/vacanteEmpleados", authenticateToken, getVacanteEmpleados);
vacantes.post("/", authenticateToken, postVacante);
vacantes.post("/postulacion", authenticateToken, postVacanteEmpleado);

vacantes.put("/modificar", authenticateToken, putVacante);
vacantes.put("/inactivar", authenticateToken, deleteVacante);

module.exports = vacantes;
