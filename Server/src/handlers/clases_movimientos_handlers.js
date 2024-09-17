const {
  todasLasClasesMovimientos,
  todasLasClasesMovimientosActivas,
  traerClaseMovimiento,
  crearClaseMovimiento,
  modificarClaseMovimiento,
  inactivarClaseMovimiento,
} = require("../controllers/clases_movimientos_controllers");

const getClasesMovimientos = async (req, res) => {
  try {
    const response = await todasLasClasesMovimientos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getClasesMovimientosActivos = async (req, res) => {
  try {
    const response = await todasLasClasesMovimientosActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getClaseMovimiento = async (req, res) => {
  const { clase_movimiento_id } = req.params;

  try {
    const response = await traerClaseMovimiento(clase_movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postClaseMovimiento = async (req, res) => {
  const { descripcion } = req.body;

  try {
    const response = await crearClaseMovimiento(descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putClaseMovimiento = async (req, res) => {
  const { clase_movimiento_id, descripcion } = req.body;

  try {
    const response = await modificarClaseMovimiento(
      clase_movimiento_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteClaseMovimiento = async (req, res) => {
  const { clase_movimiento_id } = req.body;

  try {
    const response = await inactivarClaseMovimiento(clase_movimiento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getClasesMovimientos,
  getClasesMovimientosActivos,
  getClaseMovimiento,
  postClaseMovimiento,
  putClaseMovimiento,
  deleteClaseMovimiento,
};
