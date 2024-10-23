import {
  todasLasParroquias,
  todasLasParroquiasActivas,
  traerParroquia,
  crearParroquia,
  modificarParroquia,
  inactivarParroquia,
} from "../controllers/parroquias_controllers.js";

export const getParroquias = async (req, res) => {
  const { municipio_id } = req.params;

  try {
    const response = await todasLasParroquias(municipio_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getParroquiasActivos = async (req, res) => {
  const { municipio_id } = req.params;

  try {
    const response = await todasLasParroquiasActivas(municipio_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getParroquia = async (req, res) => {
  const { parroquia_id } = req.params;

  try {
    const response = await traerParroquia(parroquia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postParroquia = async (req, res) => {
  const { municipio_id, nombre } = req.body;

  try {
    const response = await crearParroquia(municipio_id, nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putParroquia = async (req, res) => {
  const { parroquia_id, municipio_id, nombre } = req.body;

  try {
    const response = await modificarParroquia(
      parroquia_id,
      municipio_id,
      nombre
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteParroquia = async (req, res) => {
  const { parroquia_id } = req.body;

  try {
    const response = await inactivarParroquia(parroquia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
