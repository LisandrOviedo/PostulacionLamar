const {
  todosLosAreaInteres,
  traerAreaInteres,
  crearAreaInteres,
  modificarAreaInteres,
  inactivarAreaInteres,
} = require("../controllers/areas_interes_controllers");

const getAreasInteres = async (req, res) => {
  try {
    const response = await todosLosAreaInteres();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAreaInteres = async (req, res) => {
  const { area_interes_id } = req.params;

  try {
    const response = await traerAreaInteres(area_interes_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postAreaInteres = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearAreaInteres(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putAreaInteres = async (req, res) => {
  const { area_interes_id, nombre, activo } = req.body;

  try {
    const response = await modificarAreaInteres(
      area_interes_id,
      nombre,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteAreaInteres = async (req, res) => {
  const { area_interes_id } = req.body;

  try {
    const response = await inactivarAreaInteres(area_interes_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAreasInteres,
  getAreaInteres,
  postAreaInteres,
  putAreaInteres,
  deleteAreaInteres,
};
