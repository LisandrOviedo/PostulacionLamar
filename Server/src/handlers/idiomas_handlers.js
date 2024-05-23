const {
  todosLosIdiomas,
  traerIdioma,
  todosLosIdiomasActivos,
  crearIdioma,
  modificarIdioma,
  inactivarIdioma,
  agregarIdiomasCurriculo,
  eliminarIdiomasCurriculo,
} = require("../controllers/idiomas_controllers");

const getIdiomas = async (req, res) => {
  try {
    const response = await todosLosIdiomas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getIdioma = async (req, res) => {
  const { idioma_id } = req.params;

  try {
    const response = await traerIdioma(idioma_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getIdiomasActivos = async (req, res) => {
  try {
    const response = await todosLosIdiomasActivos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postIdioma = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearIdioma(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putIdioma = async (req, res) => {
  const { idioma_id, nombre, activo } = req.body;

  try {
    const response = await modificarIdioma(idioma_id, nombre, activo);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteIdioma = async (req, res) => {
  const { idioma_id } = req.body;

  try {
    const response = await inactivarIdioma(idioma_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postIdiomasCurriculo = async (req, res) => {
  const { curriculo_id, idiomas } = req.body;

  try {
    const response = await agregarIdiomasCurriculo(curriculo_id, idiomas);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteIdiomasCurriculo = async (req, res) => {
  const { curriculo_id } = req.params;

  try {
    const response = await eliminarIdiomasCurriculo(curriculo_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIdiomas,
  getIdioma,
  getIdiomasActivos,
  postIdioma,
  putIdioma,
  deleteIdioma,
  postIdiomasCurriculo,
  deleteIdiomasCurriculo,
};
