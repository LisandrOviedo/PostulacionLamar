const {
  todosLosMunicipios,
  todosLosMunicipiosActivos,
  traerMunicipio,
  crearMunicipio,
  modificarMunicipio,
  inactivarMunicipio,
} = require("../controllers/municipios_controllers");

const getMunicipios = async (req, res) => {
  const { ciudad_id } = req.params;

  try {
    const response = await todosLosMunicipios(ciudad_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMunicipiosActivos = async (req, res) => {
  const { ciudad_id } = req.params;

  try {
    const response = await todosLosMunicipiosActivos(ciudad_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMunicipio = async (req, res) => {
  const { municipio_id } = req.params;

  try {
    const response = await traerMunicipio(municipio_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postMunicipio = async (req, res) => {
  const { ciudad_id, nombre } = req.body;

  try {
    const response = await crearMunicipio(ciudad_id, nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMunicipio = async (req, res) => {
  const { municipio_id, ciudad_id, nombre } = req.body;

  try {
    const response = await modificarMunicipio(municipio_id, ciudad_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMunicipio = async (req, res) => {
  const { municipio_id } = req.body;

  try {
    const response = await inactivarMunicipio(municipio_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMunicipios,
  getMunicipiosActivos,
  getMunicipio,
  postMunicipio,
  putMunicipio,
  deleteMunicipio,
};
