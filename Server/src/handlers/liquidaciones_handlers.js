const {
  todasLasLiquidaciones,
  traerLiquidacion,
  crearLiquidacion,
  modificarLiquidacion,
  inactivarLiquidacion,
} = require("../controllers/liquidaciones_controllers");

const getLiquidaciones = async (req, res) => {
  const {
    paginaActual,
    limitePorPagina,
    buscar_por,
    buscar,
    orden_campo,
    orden_por,
  } = req.query;

  try {
    const response = await todasLasLiquidaciones(
      paginaActual,
      limitePorPagina,
      buscar_por,
      buscar,
      orden_campo,
      orden_por
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getLiquidacion = async (req, res) => {
  const { liquidacion_id } = req.params;

  try {
    const response = await traerLiquidacion(liquidacion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postLiquidacion = async (req, res) => {
  const {
    codigo,
    empleado_id,
    cargo_empleado_id,
    fecha_egreso,
    motivo_retiro,
    causa,
    ssst,
    anticipos_prestamos,
    vacaciones_vencidas,
    dias_cesta_ticket,
    poliza_hcm,
    bonificacion,
    creado_por_id,
  } = req.body.datosLiquidaciones;

  try {
    const response = await crearLiquidacion(
      codigo,
      empleado_id,
      cargo_empleado_id,
      fecha_egreso,
      motivo_retiro,
      causa,
      ssst,
      anticipos_prestamos,
      vacaciones_vencidas,
      dias_cesta_ticket,
      poliza_hcm,
      bonificacion,
      creado_por_id
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putLiquidacion = async (req, res) => {
  const {
    liquidacion_id,
    codigo,
    fecha_egreso,
    motivo_retiro,
    causa,
    ssst,
    anticipos_prestamos,
    vacaciones_vencidas,
    dias_cesta_ticket,
    poliza_hcm,
    bonificacion,
  } = req.body;

  try {
    const response = await modificarLiquidacion(
      liquidacion_id,
      codigo,
      fecha_egreso,
      motivo_retiro,
      causa,
      ssst,
      anticipos_prestamos,
      vacaciones_vencidas,
      dias_cesta_ticket,
      poliza_hcm,
      bonificacion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteLiquidacion = async (req, res) => {
  const { liquidacion_id } = req.body;

  try {
    const response = await inactivarLiquidacion(liquidacion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getLiquidaciones,
  getLiquidacion,
  postLiquidacion,
  putLiquidacion,
  deleteLiquidacion,
};
