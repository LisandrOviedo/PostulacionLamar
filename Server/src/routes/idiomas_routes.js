import { Router } from "express";
import {
  getIdiomas,
  getIdiomasActivos,
  getIdioma,
  postIdioma,
  putIdioma,
  deleteIdioma,
  postIdiomasCurriculo,
} from "../handlers/idiomas_handlers.js";

import { authenticateToken } from "../auth/index.js";

const idiomas = Router();

idiomas.get("/", authenticateToken, getIdiomas);
idiomas.get("/activos", authenticateToken, getIdiomasActivos);
idiomas.get("/detalle/:idioma_id", authenticateToken, getIdioma);

idiomas.post("/", authenticateToken, postIdioma);
idiomas.post("/agregarIdioma", authenticateToken, postIdiomasCurriculo);

idiomas.put("/modificar", authenticateToken, putIdioma);
idiomas.put("/inactivar", authenticateToken, deleteIdioma);

export default idiomas;
