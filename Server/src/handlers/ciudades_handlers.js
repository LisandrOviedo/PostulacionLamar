const {
  todasLasCiudades,
  todasLasCiudadesActivas,
  traerCiudad,
  crearCiudad,
  modificarCiudad,
  inactivarCiudad,
} = require("../controllers/ciudades_controllers");

const getCiudades = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const response = await todasLasCiudades(estado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCiudadesActivas = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const response = await todasLasCiudadesActivas(estado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCiudad = async (req, res) => {
  const { ciudad_id } = req.params;

  try {
    const response = await traerCiudad(ciudad_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCiudad = async (req, res) => {
  const { estado_id, nombre } = req.body;

  try {
    const response = await crearCiudad(estado_id, nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCiudad = async (req, res) => {
  const { ciudad_id, estado_id, nombre } = req.body;

  try {
    const response = await modificarCiudad(ciudad_id, estado_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCiudad = async (req, res) => {
  const { ciudad_id } = req.body;

  try {
    const response = await inactivarCiudad(ciudad_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCiudades,
  getCiudadesActivas,
  getCiudad,
  postCiudad,
  putCiudad,
  deleteCiudad,
};
