import { Router } from "express";
import {
  getAnexos,
  postAnexos,
} from "../handlers/documentos_empleados_handlers.js";

import { authenticateToken } from "../auth/index.js";

import { DDMMYYYYHHMM } from "../utils/formatearFecha.js";

const documentos_empleados = Router();

import multer from "multer";
import path from "node:path";
const MIMETYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
import fs from "node:fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { identificacion } = req.body;

    const uploadPath = path.join(
      __dirname,
      `../../public/documentosEmpleados/${identificacion}/`
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

documentos_empleados.get("/detalle/:empleado_id", authenticateToken, getAnexos);

documentos_empleados.get(
  "/documento/:identificacion/:originalname",
  (req, res) => {
    const { identificacion, originalname } = req.params;

    res.sendFile(
      path.join(
        __dirname,
        `../../public/documentosEmpleados/${identificacion}/${originalname}`
      )
    );
  }
);

documentos_empleados.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "foto_carnet", maxCount: 1 },
    { name: "foto_cedula", maxCount: 1 },
    { name: "rif", maxCount: 1 },
    { name: "resumen_curricular", maxCount: 1 },
    { name: "titulo_bachiller", maxCount: 1 },
    { name: "titulos_universitarios", maxCount: 1 },
    { name: "otros_estudios", maxCount: 1 },
    { name: "referencia_personal", maxCount: 1 },
    { name: "cuenta_bancaria", maxCount: 1 },
  ]),
  postAnexos
);

export default documentos_empleados;
