const { Router } = require("express");
const {
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
} = require("../handlers/empleados_handlers");

const { DDMMYYYYHHMM } = require("../utils/formatearFecha");

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
empleados.get("/login", getLogin);
empleados.get("/empleadoExistencia", authenticateToken, getEmpleadoExistencia);

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

module.exports = empleados;
