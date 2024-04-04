const { Router } = require("express");
const {
  getCurriculos,
  getCurriculo,
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
} = require("../handlers/curriculos_handlers");

const curriculos = Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../curriculosPDF"),
  filename: function (req, file, cb) {
    cb(null, Date.now() + " - " + file.originalname);
  },
});

const upload = multer({ storage: storage });

curriculos.get("/", getCurriculos);
curriculos.get("/detalle/:curriculo_id", getCurriculo);
curriculos.get("/detalleEmpleado/:empleado_id", getCurriculoEmpleado);

curriculos.post("/", upload.single("pdf"), postCurriculo);

curriculos.put("/modificar", upload.single("pdf"), putCurriculo);
curriculos.put("/inactivar", deleteCurriculo);

module.exports = curriculos;
