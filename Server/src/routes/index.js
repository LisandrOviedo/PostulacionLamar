const { Router } = require("express");
const areasinteres = require("./areas_interes_routes");
const curriculos = require("./curriculos_routes");
const documentos_empleados = require("./documentos_empleados_routes");
const empleados = require("./empleados_routes");
const experiencias = require("./experiencias_routes");
const titulos_obtenidos = require("./titulos_obtenidos_routes");

const router = Router();

router.use("/tthh/areasinteres", areasinteres);
router.use("/tthh/curriculos", curriculos);
router.use("/tthh/documentos_empleados", documentos_empleados);
router.use("/tthh/empleados", empleados);
router.use("/tthh/experiencias", experiencias);
router.use("/tthh/titulosobtenidos", titulos_obtenidos);

module.exports = router;
