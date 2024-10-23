import {
  todosLosPaises,
  todosLosPaisesActivos,
  traerPais,
  crearPais,
  modificarPais,
  inactivarPais,
} from "../controllers/paises_controllers.js";

export const getPaises = async (req, res) => {
  try {
    const response = await todosLosPaises();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPaisesActivos = async (req, res) => {
  try {
    const response = await todosLosPaisesActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPais = async (req, res) => {
  const { pais_id } = req.params;

  try {
    const response = await traerPais(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postPais = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearPais(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putPais = async (req, res) => {
  const { pais_id, nombre } = req.body;

  try {
    const response = await modificarPais(pais_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deletePais = async (req, res) => {
  const { pais_id } = req.body;

  try {
    const response = await inactivarPais(pais_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
