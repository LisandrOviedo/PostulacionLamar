const {
  todasLasExperiencias,
  traerExperiencia,
  crearExperiencia,
  modificarExperiencia,
  inactivarExperiencia,
} = require("../controllers/experiencias_controllers");

const getExperiencias = async (req, res) => {
  try {
    const response = await todasLasExperiencias();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getExperiencia = async (req, res) => {
  const { experiencia_id } = req.params;

  try {
    const response = await traerExperiencia(experiencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postExperiencia = async (req, res) => {
  const { curriculo_id, experiencias } = req.body;

  try {
    const response = await crearExperiencia(curriculo_id, experiencias);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putExperiencia = async (req, res) => {
  const { curriculo_id, experiencias } = req.body;

  try {
    const response = await modificarExperiencia(curriculo_id, experiencias);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteExperiencia = async (req, res) => {
  const { experiencia_id } = req.body;

  try {
    const response = await inactivarExperiencia(experiencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getExperiencias,
  getExperiencia,
  postExperiencia,
  putExperiencia,
  deleteExperiencia,
};
