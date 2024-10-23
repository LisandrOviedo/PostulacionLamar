import {
  todosLosRolesMenus,
  traerRolMenu,
  crearRolMenu,
  modificarRolMenu,
  inactivarRolMenu,
} from "../controllers/roles_menus_controllers.js";

export const getRolesMenus = async (req, res) => {
  const { rol_id } = req.params;

  try {
    const response = await todosLosRolesMenus(rol_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getRolMenu = async (req, res) => {
  const { rol_menu_id } = req.params;

  try {
    const response = await traerRolMenu(rol_menu_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postRolMenu = async (req, res) => {
  const { rol_id, menu_id } = req.body;

  try {
    const response = await crearRolMenu(rol_id, menu_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putRolMenu = async (req, res) => {
  const { rol_menu_id, rol_id, menu_id } = req.body;

  try {
    const response = await modificarRolMenu(rol_menu_id, rol_id, menu_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteRolMenu = async (req, res) => {
  const { rol_menu_id } = req.body;

  try {
    const response = await inactivarRolMenu(rol_menu_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
