const {
  todosLosMovimientos,
  traerMovimiento,
  crearMovimiento,
  modificarMovimiento,
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
  const { movimiento_id } = req.params;

  try {
    const response = await traerMovimiento(movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postMovimiento = async (req, res) => {
  const {
    tipo_movimiento_id,
    fecha_inicio,
    fecha_fin,
    empleado_id,
    cargo_nivel_id,
    tipo_nomina,
    frecuencia,
    descripcion,
    empleado_supervisor_id,
    empleado_solicitante_id,
    empleado_rrhh_id,
    empleado_aprueba_id,
    observaciones,
  } = req.body;

  try {
    const response = await crearMovimiento(
      tipo_movimiento_id,
      fecha_inicio,
      fecha_fin,
      empleado_id,
      cargo_nivel_id,
      tipo_nomina,
      frecuencia,
      descripcion,
      empleado_supervisor_id,
      empleado_solicitante_id,
      empleado_rrhh_id,
      empleado_aprueba_id,
      observaciones
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMovimiento = async (req, res) => {
  const {
    movimiento_id,
    tipo_movimiento_id,
    fecha_inicio,
    fecha_fin,
    empleado_id,
    cargo_nivel_id,
    tipo_nomina,
    frecuencia,
    descripcion,
    empleado_supervisor_id,
    empleado_solicitante_id,
    empleado_rrhh_id,
    empleado_aprueba_id,
    observaciones,
  } = req.body;

  try {
    const response = await modificarMovimiento(
      movimiento_id,
      tipo_movimiento_id,
      fecha_inicio,
      fecha_fin,
      empleado_id,
      cargo_nivel_id,
      tipo_nomina,
      frecuencia,
      descripcion,
      empleado_supervisor_id,
      empleado_solicitante_id,
      empleado_rrhh_id,
      empleado_aprueba_id,
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
  deleteMovimiento,
};
