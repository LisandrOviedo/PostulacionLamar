import { Router } from "express";
import { postRespuestasKostick } from "../handlers/respuestas_kostick_handlers.js";

import { authenticateToken } from "../auth/index.js";

const respuestas_kostick = Router();

respuestas_kostick.post("/", authenticateToken, postRespuestasKostick);

export default respuestas_kostick;
