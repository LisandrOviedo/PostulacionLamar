const {
  todosLosMovimientos,
  traerMovimiento,
  crearMovimiento,
  modificarMovimiento,
  aprobarMovimiento,
  denegarMovimiento,
  inactivarMovimiento,
} = require("../controllers/movimientos_controllers");

const getMovimientos = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosMovimientos(
      filtros,
      parseInt(paginaActual),
      parseInt(limitePorPagina)
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMovimiento = async (req, res) => {
  const { movimiento_id, empleado_id } = req.query;

  try {
    const response = await traerMovimiento(movimiento_id, empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postMovimiento = async (req, res) => {
  const {
    empleado_id,
    cargo_empleado_id,
    clase_movimiento_id,
    duracion_movimiento,
    duracion_movimiento_dias,
    requiere_periodo_prueba,
    duracion_periodo_prueba,
    justificacion_movimiento,
    empresa_id,
    cargo_nivel_id,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
    tipo_nomina,
    otro_tipo_nomina,
    frecuencia_nomina,
    otra_frecuencia_nomina,
    sueldo,
    codigo_nomina,
    solicitante_id,
    supervisor_id,
    gerencia_id,
    tthh_id,
  } = req.body;

  try {
    const response = await crearMovimiento(
      empleado_id,
      cargo_empleado_id,
      clase_movimiento_id,
      duracion_movimiento,
      duracion_movimiento_dias,
      requiere_periodo_prueba,
      duracion_periodo_prueba,
      justificacion_movimiento,
      empresa_id,
      cargo_nivel_id,
      vigencia_movimiento_desde,
      vigencia_movimiento_hasta,
      tipo_nomina,
      otro_tipo_nomina,
      frecuencia_nomina,
      otra_frecuencia_nomina,
      sueldo,
      codigo_nomina,
      solicitante_id,
      supervisor_id,
      gerencia_id,
      tthh_id
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMovimiento = async (req, res) => {
  const {
    movimiento_id,
    clase_movimiento_id,
    duracion_movimiento,
    duracion_movimiento_dias,
    requiere_periodo_prueba,
    duracion_periodo_prueba,
    justificacion_movimiento,
    empresa_id,
    cargo_nivel_id,
    vigencia_movimiento_desde,
    vigencia_movimiento_hasta,
    tipo_nomina,
    otro_tipo_nomina,
    frecuencia_nomina,
    otra_frecuencia_nomina,
    sueldo,
    codigo_nomina,
    solicitante_id,
    supervisor_id,
    gerencia_id,
    tthh_id,
  } = req.body;

  try {
    const response = await modificarMovimiento(
      movimiento_id,
      clase_movimiento_id,
      duracion_movimiento,
      duracion_movimiento_dias,
      requiere_periodo_prueba,
      duracion_periodo_prueba,
      justificacion_movimiento,
      empresa_id,
      cargo_nivel_id,
      vigencia_movimiento_desde,
      vigencia_movimiento_hasta,
      tipo_nomina,
      otro_tipo_nomina,
      frecuencia_nomina,
      otra_frecuencia_nomina,
      sueldo,
      codigo_nomina,
      solicitante_id,
      supervisor_id,
      gerencia_id,
      tthh_id
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putAprobarMovimiento = async (req, res) => {
  const { movimiento_id, revisado_por_id, observaciones } = req.body;

  try {
    const response = await aprobarMovimiento(
      movimiento_id,
      revisado_por_id,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putDenegarMovimiento = async (req, res) => {
  const { movimiento_id, revisado_por_id, observaciones } = req.body;

  try {
    const response = await denegarMovimiento(
      movimiento_id,
      revisado_por_id,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMovimiento = async (req, res) => {
  const { movimiento_id } = req.body;

  try {
    const response = await inactivarMovimiento(movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMovimientos,
  getMovimiento,
  postMovimiento,
  putMovimiento,
  putAprobarMovimiento,
  putDenegarMovimiento,
  deleteMovimiento,
};
