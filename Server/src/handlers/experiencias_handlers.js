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
  const {
    curriculo_id,
    tipo,
    cargo_titulo_id,
    cargo_titulo_otro,
    duracion,
    empresa_centro_educativo,
  } = req.body;

  try {
    const response = await crearExperiencia(
      curriculo_id,
      tipo,
      cargo_titulo_id,
      cargo_titulo_otro,
      duracion,
      empresa_centro_educativo
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putExperiencia = async (req, res) => {
  const {
    experiencia_id,
    tipo,
    cargo_titulo_id,
    cargo_titulo_otro,
    duracion,
    empresa_centro_educativo,
    inactivo,
  } = req.body;

  try {
    const response = await modificarExperiencia(
      experiencia_id,
      tipo,
      cargo_titulo_id,
      cargo_titulo_otro,
      duracion,
      empresa_centro_educativo,
      inactivo
    );

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
