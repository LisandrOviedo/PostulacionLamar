import {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
} from "../controllers/titulos_obtenidos_controllers.js";

export const getTitulosObtenidos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosTitulosObtenidos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getTituloObtenido = async (req, res) => {
  const { titulo_obtenido_id } = req.params;

  try {
    const response = await traerTituloObtenido(titulo_obtenido_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postTitulosObtenidos = async (req, res) => {
  const { empleado_id, titulos_obtenidos } = req.body;

  try {
    const response = await crearTitulosObtenidos(
      empleado_id,
      titulos_obtenidos
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putTituloObtenido = async (req, res) => {
  const { empleado_id, titulos_obtenidos } = req.body;

  try {
    const response = await modificarTitulosObtenidos(
      empleado_id,
      titulos_obtenidos
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteTituloObtenido = async (req, res) => {
  const { titulo_obtenido_id } = req.body;

  try {
    const response = await inactivarTituloObtenido(titulo_obtenido_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
