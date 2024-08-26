const {
  todasLasSedes,
  todasLasSedesActivas,
  traerSede,
  crearSede,
  modificarSede,
  inactivarSede,
} = require("../controllers/sedes_controllers");

const getSedes = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todasLasSedes(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSedesActivas = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todasLasSedesActivas(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSede = async (req, res) => {
  const { sede_id } = req.params;

  try {
    const response = await traerSede(sede_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSede = async (req, res) => {
  const { empresa_id, nombre, tipo, direccion, latitud, longitud } = req.body;

  try {
    const response = await crearSede(
      empresa_id,
      nombre,
      tipo,
      direccion,
      latitud,
      longitud
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putSede = async (req, res) => {
  const { sede_id, empresa_id, nombre, tipo, direccion, latitud, longitud } =
    req.body;

  try {
    const response = await modificarSede(
      sede_id,
      empresa_id,
      nombre,
      tipo,
      direccion,
      latitud,
      longitud
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteSede = async (req, res) => {
  const { sede_id } = req.body;

  try {
    const response = await inactivarSede(sede_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSedes,
  getSedesActivas,
  getSede,
  postSede,
  putSede,
  deleteSede,
};
