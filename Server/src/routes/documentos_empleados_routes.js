const { Router } = require("express");
const {
  getAnexos,
  postAnexos,
  putAnexos,
} = require("../handlers/documentos_empleados_handlers");

const documentos_empleados = Router();

const multer = require("multer");
const path = require("path");
const MIMETYPES = ["image/jpeg", "image/jpg", "application/pdf"];
const fs = require("fs");

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
    cb(null, Date.now() + " - " + file.originalname);
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

documentos_empleados.get("/detalle/:empleado_id", getAnexos);

documentos_empleados.post("/", upload.array("anexos", 20), postAnexos);

documentos_empleados.put("/modificar", upload.array("anexos", 20), putAnexos);

module.exports = documentos_empleados;
