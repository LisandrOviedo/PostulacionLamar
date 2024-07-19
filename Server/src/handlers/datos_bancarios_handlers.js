const {
  todosLosDatosBancarios,
  todosLosDatosBancariosActivos,
  traerDatoBancario,
  crearDatoBancario,
  modificarDatoBancario,
  inactivarDatoBancario,
} = require("../controllers/datos_bancarios_handlers");

const getDatosBancarios = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosDatosBancarios(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDatosBancariosActivos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosDatosBancariosActivos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDatoBancario = async (req, res) => {
  const { dato_bancario_id } = req.params;

  try {
    const response = await traerDatoBancario(dato_bancario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDatoBancario = async (req, res) => {
  const { empleado_id, datos_bancarios } = req.body;

  try {
    const response = await crearDatoBancario(empleado_id, datos_bancarios);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putDatoBancario = async (req, res) => {
  const { empleado_id, datos_bancarios } = req.body;

  try {
    const response = await modificarDatoBancario(empleado_id, datos_bancarios);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteDatoBancario = async (req, res) => {
  const { dato_bancario_id } = req.body;

  try {
    const response = await inactivarDatoBancario(dato_bancario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDatosBancarios,
  getDatosBancariosActivos,
  getDatoBancario,
  postDatoBancario,
  putDatoBancario,
  deleteDatoBancario,
};
