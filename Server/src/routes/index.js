const { Router } = require("express");
const areasinteres = require("./areas_interes_routes");
const curriculos = require("./curriculos_routes");
const empleados = require("./empleados_routes");
const usuarios = require("./usuarios_routes");

const router = Router();

router.use("/areasinteres", areasinteres);
router.use("/curriculos", curriculos);
router.use("/empleados", empleados);
router.use("/usuarios", usuarios);

module.exports = router;
