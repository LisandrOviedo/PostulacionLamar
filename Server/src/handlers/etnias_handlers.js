const {
  todasLasEtnias,
  todasLasEtniasActivas,
  traerEtnia,
  crearEtnia,
  modificarEtnia,
  inactivarEtnia,
} = require("../controllers/etnias_controllers");

const getEtnias = async (req, res) => {
  try {
    const response = await todasLasEtnias();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEtniasActivas = async (req, res) => {
  try {
    const response = await todasLasEtniasActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEtnia = async (req, res) => {
  const { etnia_id } = req.params;

  try {
    const response = await traerEtnia(etnia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEtnia = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearEtnia(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putEtnia = async (req, res) => {
  const { etnia_id, nombre } = req.body;

  try {
    const response = await modificarEtnia(etnia_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteEtnia = async (req, res) => {
  const { etnia_id } = req.body;

  try {
    const response = await inactivarEtnia(etnia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEtnias,
  getEtniasActivas,
  getEtnia,
  postEtnia,
  putEtnia,
  deleteEtnia,
};
