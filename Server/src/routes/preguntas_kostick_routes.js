import { Router } from "express";
import { getPreguntasKostick } from "../handlers/preguntas_kostick_handlers.js";

import { authenticateToken } from "../auth/index.js";

const preguntas_kostick = Router();

preguntas_kostick.get("/", authenticateToken, getPreguntasKostick);

export default preguntas_kostick;
