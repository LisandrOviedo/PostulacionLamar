const {
  todosLosPaises,
  todosLosPaisesActivos,
  traerPais,
  crearPais,
  modificarPais,
  inactivarPais,
} = require("../controllers/paises_controllers");

const getPaises = async (req, res) => {
  try {
    const response = await todosLosPaises();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPaisesActivos = async (req, res) => {
  try {
    const response = await todosLosPaisesActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPais = async (req, res) => {
  const { pais_id } = req.params;

  try {
    const response = await traerPais(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postPais = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearPais(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putPais = async (req, res) => {
  const { pais_id, nombre } = req.body;

  try {
    const response = await modificarPais(pais_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePais = async (req, res) => {
  const { pais_id } = req.body;

  try {
    const response = await inactivarPais(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPaises,
  getPaisesActivos,
  getPais,
  postPais,
  putPais,
  deletePais,
};
