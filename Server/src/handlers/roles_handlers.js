import {
  todosLosRoles,
  traerRol,
  crearRol,
  modificarRol,
  inactivarRol,
} from "../controllers/roles_controllers.js";

export const getRoles = async (req, res) => {
  try {
    const response = await todosLosRoles();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getRol = async (req, res) => {
  const { rol_id } = req.params;

  try {
    const response = await traerRol(rol_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postRol = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const response = await crearRol(nombre, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putRol = async (req, res) => {
  const { rol_id, nombre, descripcion } = req.body;

  try {
    const response = await modificarRol(rol_id, nombre, descripcion);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteRol = async (req, res) => {
  const { rol_id } = req.body;

  try {
    const response = await inactivarRol(rol_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
