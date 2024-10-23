import { Router } from "express";
import {
  getVacantes,
  getVacante,
  getVacanteEmpleados,
  postVacante,
  postVacanteEmpleado,
  putVacante,
  deleteVacante,
} from "../handlers/vacantes_handlers.js";

import { authenticateToken } from "../auth/index.js";

const vacantes = Router();

vacantes.get("/detalle/:vacante_id", authenticateToken, getVacante);

vacantes.post("allVacantes", authenticateToken, getVacantes);
vacantes.post("/vacanteEmpleados", authenticateToken, getVacanteEmpleados);
vacantes.post("/", authenticateToken, postVacante);
vacantes.post("/postulacion", authenticateToken, postVacanteEmpleado);

vacantes.put("/modificar", authenticateToken, putVacante);
vacantes.put("/inactivar", authenticateToken, deleteVacante);

export default vacantes;
