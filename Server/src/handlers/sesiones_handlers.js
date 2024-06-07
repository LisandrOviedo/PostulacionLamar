const { cerrarSesion } = require("../controllers/sesiones_controllers");

const deleteSesion = async (req, res) => {
  const { empleado_id } = req.body;

  try {
    const response = await cerrarSesion(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteSesion,
};
