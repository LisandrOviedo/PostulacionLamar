const {
  todosLosTiposMovimientos,
  todosLosTiposMovimientosActivos,
  traerTipoMovimiento,
  crearTipoMovimiento,
  modificarTipoMovimiento,
  inactivarTipoMovimiento,
} = require("../controllers/tipos_movimientos_controllers");

const getTiposMovimientos = async (req, res) => {
  try {
    const response = await todosLosTiposMovimientos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTiposMovimientosActivos = async (req, res) => {
  try {
    const response = await todosLosTiposMovimientosActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTipoMovimiento = async (req, res) => {
  const { tipo_movimiento_id } = req.params;

  try {
    const response = await traerTipoMovimiento(tipo_movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postTipoMovimiento = async (req, res) => {
  const { descripcion } = req.body;

  try {
    const response = await crearTipoMovimiento(descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putTipoMovimiento = async (req, res) => {
  const { tipo_movimiento_id, descripcion } = req.body;

  try {
    const response = await modificarTipoMovimiento(
      tipo_movimiento_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTipoMovimiento = async (req, res) => {
  const { tipo_movimiento_id } = req.body;

  try {
    const response = await inactivarTipoMovimiento(tipo_movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTiposMovimientos,
  getTiposMovimientosActivos,
  getTipoMovimiento,
  postTipoMovimiento,
  putTipoMovimiento,
  deleteTipoMovimiento,
};
