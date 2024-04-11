const {
  traerAnexos,
  crearAnexos,
  modificarAnexos,
} = require("../controllers/documentos_empleados_controllers");

const getAnexos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerAnexos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postAnexos = async (req, res) => {
  const { empleado_id } = req.body;
  const anexos = req.files;

  try {
    const response = await crearAnexos(empleado_id, anexos);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putAnexos = async (req, res) => {
  const { empleado_id } = req.file;

  try {
    const response = await modificarAnexos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAnexos,
  postAnexos,
  putAnexos,
};
