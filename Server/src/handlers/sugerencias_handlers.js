const {
  todasLasSugerencias,
  todasLasSugerenciasActivas,
  traerSugerencia,
  crearSugerencia,
  inactivarSugerencia,
} = require("../controllers/sugerencias_controllers");

const getSugerencias = async (req, res) => {
  try {
    const response = await todasLasSugerencias();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSugerenciasActivas = async (req, res) => {
  try {
    const response = await todasLasSugerenciasActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSugerencia = async (req, res) => {
  const { sugerencia_id, empleado_id } = req.body;

  try {
    const response = await traerSugerencia(sugerencia_id, empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSugerencia = async (req, res) => {
  const { sede_id, sugerencia_pred_id, descripcion } = req.body;

  try {
    const response = await crearSugerencia(
      sede_id,
      sugerencia_pred_id,
      descripcion
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteSugerencia = async (req, res) => {
  const { sugerencia_id } = req.body;

  try {
    const response = await inactivarSugerencia(sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSugerencias,
  getSugerenciasActivas,
  getSugerencia,
  postSugerencia,
  deleteSugerencia,
};
