import {
  todosLosIdiomas,
  todosLosIdiomasActivos,
  traerIdioma,
  crearIdioma,
  modificarIdioma,
  inactivarIdioma,
  agregarIdiomasCurriculo,
} from "../controllers/idiomas_controllers.js";

export const getIdiomas = async (req, res) => {
  try {
    const response = await todosLosIdiomas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getIdiomasActivos = async (req, res) => {
  try {
    const response = await todosLosIdiomasActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getIdioma = async (req, res) => {
  const { idioma_id } = req.params;

  try {
    const response = await traerIdioma(idioma_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postIdioma = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearIdioma(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putIdioma = async (req, res) => {
  const { idioma_id, nombre } = req.body;

  try {
    const response = await modificarIdioma(idioma_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteIdioma = async (req, res) => {
  const { idioma_id } = req.body;

  try {
    const response = await inactivarIdioma(idioma_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postIdiomasCurriculo = async (req, res) => {
  const { curriculo_id, idiomas } = req.body;

  try {
    const response = await agregarIdiomasCurriculo(curriculo_id, idiomas);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
