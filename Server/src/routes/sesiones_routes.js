import { Router } from "express";
import { deleteSesion } from "../handlers/sesiones_handlers.js";

import { authenticateToken } from "../auth/index.js";

const sesiones = Router();

sesiones.put("/inactivar", authenticateToken, deleteSesion);

export default sesiones;
