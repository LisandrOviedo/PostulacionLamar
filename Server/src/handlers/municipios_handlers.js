const {
  todosLosMunicipios,
  todosLosMunicipiosActivos,
  traerMunicipio,
  crearMunicipio,
  modificarMunicipio,
  inactivarMunicipio,
} = require("../controllers/municipios_controllers");

const getMunicipios = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const response = await todosLosMunicipios(estado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMunicipiosActivos = async (req, res) => {
  const { estado_id } = req.params;

  try {
    const response = await todosLosMunicipiosActivos(estado_id);

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
  const { estado_id, nombre } = req.body;

  try {
    const response = await crearMunicipio(estado_id, nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMunicipio = async (req, res) => {
  const { municipio_id, estado_id, nombre } = req.body;

  try {
    const response = await modificarMunicipio(municipio_id, estado_id, nombre);

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
