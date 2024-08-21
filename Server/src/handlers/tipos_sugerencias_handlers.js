const {
  todosLosTiposSugerencias,
  todosLosTiposSugerenciasActivas,
  traerTipoSugerencia,
  crearTipoSugerencia,
  modificarTipoSugerencia,
  inactivarTipoSugerencia,
} = require("../controllers/tipos_sugerencias_controllers");

const getTiposSugerencias = async (req, res) => {
  try {
    const response = await todosLosTiposSugerencias();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTiposSugerenciasActivas = async (req, res) => {
  try {
    const response = await todosLosTiposSugerenciasActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id } = req.params;

  try {
    const response = await traerTipoSugerencia(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postTipoSugerencia = async (req, res) => {
  const { descripcion } = req.body;

  try {
    const response = await crearTipoSugerencia(descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id, descripcion } = req.body;

  try {
    const response = await modificarTipoSugerencia(
      tipo_sugerencia_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id } = req.body;

  try {
    const response = await inactivarTipoSugerencia(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTiposSugerencias,
  getTiposSugerenciasActivas,
  getTipoSugerencia,
  postTipoSugerencia,
  putTipoSugerencia,
  deleteTipoSugerencia,
};
