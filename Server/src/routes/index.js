const { Router } = require("express");
const areasinteres = require("./areas_interes_routes");
const curriculos = require("./curriculos_routes");
const empleados = require("./empleados_routes");
const experiencias = require("./experiencias_routes");
const titulos_obtenidos = require("./titulos_obtenidos_routes");
const usuarios = require("./usuarios_routes");

const router = Router();

router.use("/tthh/areasinteres", areasinteres);
router.use("/tthh/cargostitulos", cargostitulos);
router.use("/tthh/curriculos", curriculos);
router.use("/tthh/empleados", empleados);
router.use("/tthh/experiencias", experiencias);
router.use("/tthh/titulosobtenidos", titulos_obtenidos);
router.use("/tthh/usuarios", usuarios);

module.exports = router;
