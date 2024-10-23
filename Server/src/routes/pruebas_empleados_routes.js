import { Router } from "express";
import {
  getPruebas,
  getPruebasEmpleado,
  getPrueba,
  postPrueba,
} from "../handlers/pruebas_empleados_handlers.js";

import { authenticateToken } from "../auth/index.js";

const pruebas_empleados = Router();

pruebas_empleados.get("/empleado/:empleado_id", authenticateToken, getPrueba);

pruebas_empleados.post(
  "/pruebasEmpleados",
  authenticateToken,
  getPruebasEmpleado
);
pruebas_empleados.post("/allPruebasEmpleados", authenticateToken, getPruebas);

pruebas_empleados.post("/", authenticateToken, postPrueba);

export default pruebas_empleados;
