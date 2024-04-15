const { Router } = require("express");
const {
  getEmpleados,
  getEmpleado,
  getCargoActual,
  getLogin,
  postEmpleado,
  putClaveEmpleado,
  putEmpleado,
  putFotoEmpleado,
  deleteEmpleado,
} = require("../handlers/empleados_handlers");

const { authenticateToken } = require("../auth/index");

const empleados = Router();

const multer = require("multer");
const path = require("path");
const MIMETYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
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

empleados.get("/", getEmpleados);
empleados.get("/detalle/:empleado_id", getEmpleado);
empleados.get("/cargoActual/:empleado_id", getCargoActual);
empleados.get("/login", getLogin);

empleados.post("/", postEmpleado);

empleados.put("/modificarClave", putClaveEmpleado);
empleados.put("/modificar", putEmpleado);
empleados.put("/modificarFoto", upload.single("foto_perfil"), putFotoEmpleado);
empleados.put("/inactivar", deleteEmpleado);

module.exports = empleados;
