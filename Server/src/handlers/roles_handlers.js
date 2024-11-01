const {
  todosLosRolesFiltrados,
  todosLosRoles,
  traerRol,
  crearRol,
  modificarRol,
  inactivarRol,
  cambiarRolEmpleado,
} = require("../controllers/roles_controllers");

const getRolesFiltrados = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosRolesFiltrados(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

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
  const { nombre, descripcion, acceso_admin } = req.body;

  try {
    const response = await crearRol(nombre, descripcion, acceso_admin);

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

const putCambiarRolEmpleado = async (req, res) => {
  const { rol_id, empleado_id } = req.body;

  try {
    const response = await cambiarRolEmpleado(rol_id, empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRolesFiltrados,
  getRoles,
  getRol,
  postRol,
  putRol,
  deleteRol,
  putCambiarRolEmpleado,
};
