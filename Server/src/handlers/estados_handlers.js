const {
  todosLosEstados,
  todosLosEstadosActivos,
  traerEstado,
  crearEstado,
  modificarEstado,
  inactivarEstado,
} = require("../controllers/estados_controllers");

const getEstados = async (req, res) => {
  const { pais_id } = req.params;

  try {
    const response = await todosLosEstados(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEstadosActivos = async (req, res) => {
  const { pais_id } = req.params;

  try {
    const response = await todosLosEstadosActivos(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEstado = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const response = await traerEstado(estado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEstado = async (req, res) => {
  const { pais_id, nombre } = req.body;

  try {
    const response = await crearEstado(pais_id, nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putEstado = async (req, res) => {
  const { estado_id, pais_id, nombre } = req.body;

  try {
    const response = await modificarEstado(estado_id, pais_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteEstado = async (req, res) => {
  const { estado_id } = req.body;

  try {
    const response = await inactivarEstado(estado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEstados,
  getEstadosActivos,
  getEstado,
  postEstado,
  putEstado,
  deleteEstado,
};
