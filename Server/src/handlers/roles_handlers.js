const {
  todosLosRoles,
  traerRol,
  crearRol,
  modificarRol,
  inactivarRol,
} = require("../controllers/roles_controllers");

const getRoles = async (req, res) => {
  try {
    const response = await todosLosRoles();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRol = async (req, res) => {
  const { rol_id } = req.params;

  try {
    const response = await traerRol(rol_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postRol = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const response = await crearRol(nombre, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putRol = async (req, res) => {
  const { rol_id, nombre, descripcion } = req.body;

  try {
    const response = await modificarRol(rol_id, nombre, descripcion);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteRol = async (req, res) => {
  const { rol_id } = req.body;

  try {
    const response = await inactivarRol(rol_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRoles,
  getRol,
  postRol,
  putRol,
  deleteRol,
};
