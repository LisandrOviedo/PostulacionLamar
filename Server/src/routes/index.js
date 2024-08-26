const { Router } = require("express");

const areas_interes = require("./areas_interes_routes");
const cargos_empleados = require("./cargos_empleados_routes");
const cargos_niveles = require("./cargos_niveles_routes");
const cargos = require("./cargos_routes");
const contactos_emergencia = require("./contactos_emergencia_routes");
const curriculos = require("./curriculos_routes");
const datos_bancarios = require("./datos_bancarios_routes");
const departamentos = require("./departamentos_routes");
const direcciones = require("./direcciones_routes");
const documentos_empleados = require("./documentos_empleados_routes");
const empleados = require("./empleados_routes");
const empresas = require("./empresas_routes");
const estados = require("./estados_routes");
const etnias = require("./etnias_routes");
const experiencias = require("./experiencias_routes");
const fichas_ingresos = require("./fichas_ingresos_routes");
const idiomas = require("./idiomas_routes");
const movimientos = require("./movimientos_routes");
const municipios = require("./municipios_routes");
const paises = require("./paises_routes");
const parroquias = require("./parroquias_routes");
const preguntas_kostick = require("./preguntas_kostick_routes");
const pruebas_empleados = require("./pruebas_empleados_routes");
const referencias_personales = require("./referencias_personales_routes");
const respuestas_kostick = require("./respuestas_kostick_routes");
const roles = require("./roles_routes");
const salud = require("./salud_routes");
const sedes = require("./sedes_routes");
const sesiones = require("./sesiones_routes");
const sugerencias_pred = require("./sugerencias_pred_routes");
const sugerencias = require("./sugerencias_routes");
const tipos_movimientos = require("./tipos_movimientos_routes");
const tipos_sugerencias = require("./tipos_sugerencias_routes");
const titulos_obtenidos = require("./titulos_obtenidos_routes");

const router = Router();

router.use("/tthh/areas_interes", areas_interes);
router.use("/tthh/cargos_empleados", cargos_empleados);
router.use("/tthh/cargos_niveles", cargos_niveles);
router.use("/tthh/cargos", cargos);
router.use("/tthh/contactos_emergencia", contactos_emergencia);
router.use("/tthh/curriculos", curriculos);
router.use("/tthh/datos_bancarios", datos_bancarios);
router.use("/tthh/departamentos", departamentos);
router.use("/tthh/direcciones", direcciones);
router.use("/tthh/documentos_empleados", documentos_empleados);
router.use("/tthh/empleados", empleados);
router.use("/tthh/empresas", empresas);
router.use("/tthh/estados", estados);
router.use("/tthh/etnias", etnias);
router.use("/tthh/experiencias", experiencias);
router.use("/tthh/fichas_ingresos", fichas_ingresos);
router.use("/tthh/idiomas", idiomas);
router.use("/tthh/movimientos", movimientos);
router.use("/tthh/municipios", municipios);
router.use("/tthh/paises", paises);
router.use("/tthh/parroquias", parroquias);
router.use("/tthh/preguntas_kostick", preguntas_kostick);
router.use("/tthh/pruebas_empleados", pruebas_empleados);
router.use("/tthh/referencias_personales", referencias_personales);
router.use("/tthh/respuestas_kostick", respuestas_kostick);
router.use("/tthh/roles", roles);
router.use("/tthh/salud", salud);
router.use("/tthh/sedes", sedes);
router.use("/tthh/sesiones", sesiones);
router.use("/tthh/sugerencias_pred", sugerencias_pred);
router.use("/tthh/sugerencias", sugerencias);
router.use("/tthh/tipos_movimientos", tipos_movimientos);
router.use("/tthh/tipos_sugerencias", tipos_sugerencias);
router.use("/tthh/titulos_obtenidos", titulos_obtenidos);

module.exports = router;
