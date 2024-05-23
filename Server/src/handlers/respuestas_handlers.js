const {
  todasLasRespuestas,
  traerRespuesta,
  crearRespuestas,
  modificarRespuesta,
  inactivarRespuesta,
} = require("../controllers/respuestas_controllers");

const getRespuestas = async (req, res) => {
  try {
    const response = await todasLasRespuestas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRespuesta = async (req, res) => {
  const { respuesta_id } = req.params;

  try {
    const response = await traerRespuesta(respuesta_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postRespuestas = async (req, res) => {
  try {
    const response = await crearRespuestas();

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putRespuesta = async (req, res) => {
  const { respuesta_id, numero_pregunta, respuesta, activo } = req.body;

  try {
    const response = await modificarRespuesta(
      respuesta_id,
      numero_pregunta,
      respuesta,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteRespuesta = async (req, res) => {
  const { respuesta_id } = req.body;

  try {
    const response = await inactivarRespuesta(respuesta_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRespuestas,
  getRespuesta,
  postRespuestas,
  putRespuesta,
  deleteRespuesta,
};
