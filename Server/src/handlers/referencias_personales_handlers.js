const {
  todasLasReferenciasPersonales,
  todasLasReferenciasPersonalesActivas,
  traerReferenciaPersonal,
  crearReferenciaPersonal,
  modificarReferenciaPersonal,
  inactivarReferenciaPersonal,
} = require("../controllers/referencia_personal_controllers");

const getReferenciasPersonales = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasReferenciasPersonales(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReferenciasPersonalesActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasReferenciasPersonalesActivas(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReferenciaPersonal = async (req, res) => {
  const { referencia_personal_id } = req.params;

  try {
    const response = await traerReferenciaPersonal(referencia_personal_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postReferenciaPersonal = async (req, res) => {
  const { empleado_id, referencias_personales } = req.body;

  try {
    const response = await crearReferenciaPersonal(
      empleado_id,
      referencias_personales
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putReferenciaPersonal = async (req, res) => {
  const { empleado_id, referencias_personales } = req.body;

  try {
    const response = await modificarReferenciaPersonal(
      empleado_id,
      referencias_personales
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteReferenciaPersonal = async (req, res) => {
  const { referencia_personal_id } = req.body;

  try {
    const response = await inactivarReferenciaPersonal(referencia_personal_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getReferenciasPersonales,
  getReferenciasPersonalesActivas,
  getReferenciaPersonal,
  postReferenciaPersonal,
  putReferenciaPersonal,
  deleteReferenciaPersonal,
};
