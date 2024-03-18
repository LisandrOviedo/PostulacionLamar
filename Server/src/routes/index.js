const { Router } = require("express");
const areasinteres = require("./areas_interes_routes");
const cargostitulos = require("./cargo_titulos_routes");
const curriculos = require("./curriculos_routes");
const empleados = require("./empleados_routes");
const experiencias = require("./experiencias_routes");
const usuarios = require("./usuarios_routes");

const router = Router();

router.use("/areasinteres", areasinteres);
router.use("/cargostitulos", cargostitulos);
router.use("/curriculos", curriculos);
router.use("/empleados", empleados);
router.use("/experiencias", experiencias);
router.use("/usuarios", usuarios);

module.exports = router;
