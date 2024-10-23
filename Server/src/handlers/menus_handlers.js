import {
  todosLosMenus,
  todosLosMenusActivos,
  traerMenu,
  crearMenu,
  modificarMenu,
  inactivarMenu,
} from "../controllers/menus_controllers.js";

export const getMenus = async (req, res) => {
  try {
    const response = await todosLosMenus();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getMenusActivos = async (req, res) => {
  try {
    const response = await todosLosMenusActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getMenu = async (req, res) => {
  const { menu_id } = req.params;

  try {
    const response = await traerMenu(menu_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postMenu = async (req, res) => {
  const { padre_id, titulo, ruta, orden, icono } = req.body;

  try {
    const response = await crearMenu(padre_id, titulo, ruta, orden, icono);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putMenu = async (req, res) => {
  const { menu_id, padre_id, titulo, ruta, orden, icono } = req.body;

  try {
    const response = await modificarMenu(
      menu_id,
      padre_id,
      titulo,
      ruta,
      orden,
      icono
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  const { menu_id } = req.body;

  try {
    const response = await inactivarMenu(menu_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
