const {
  crearRespuestasKostick,
} = require("../controllers/respuestas_kostick_controllers");

const postRespuestasKostick = async (req, res) => {
  const { empleado_id, prueba_id, prueba } = req.body;

  try {
    const response = await crearRespuestasKostick(
      empleado_id,
      prueba_id,
      prueba
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postRespuestasKostick,
};
