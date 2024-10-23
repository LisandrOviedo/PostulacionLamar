import { Router } from "express";
import {
  getEmpleados,
  getEmpleado,
  getEmpleadoExistencia,
  getLogin,
  postEmpleado,
  putClaveTemporalEmpleado,
  putEmpleado,
  putFotoEmpleado,
  putClaveEmpleado,
  putReiniciarClave,
  deleteEmpleado,
} from "../handlers/empleados_handlers.js";

import { DDMMYYYYHHMM } from "../utils/formatearFecha.js";

import { authenticateToken } from "../auth/index.js";

const empleados = Router();

import multer from "multer";
import path from "node:path";
const MIMETYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
import fs from "node:fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { cedula } = req.body;

    const uploadPath = path.join(
      __dirname,
      `../../public/documentosEmpleados/${cedula}/`
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${DDMMYYYYHHMM()} - ${file.originalname}`);
  },
  limits: {
    fileSize: 10000000,
  },
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo incorrecto"));
    }
  },
});

const upload = multer({ storage: storage });

empleados.get("/detalle/:empleado_id", authenticateToken, getEmpleado);
empleados.get("/empleadoExistencia", authenticateToken, getEmpleadoExistencia);

empleados.post("/login", getLogin);
empleados.post("/allEmpleados", authenticateToken, getEmpleados);
empleados.post("/", authenticateToken, postEmpleado);

empleados.put("/modificarClaveTemporal", putClaveTemporalEmpleado);
empleados.put("/modificarClave", authenticateToken, putClaveEmpleado);
empleados.put("/reiniciarClave", authenticateToken, putReiniciarClave);
empleados.put("/modificar", authenticateToken, putEmpleado);
empleados.put(
  "/modificarFoto",
  authenticateToken,
  upload.single("foto_perfil"),
  putFotoEmpleado
);
empleados.put("/inactivar", authenticateToken, deleteEmpleado);

export default empleados;
