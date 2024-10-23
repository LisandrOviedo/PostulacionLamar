import {
  todosLosTiposSugerencias,
  todosLosTiposSugerenciasActivas,
  traerTipoSugerencia,
  crearTipoSugerencia,
  modificarTipoSugerencia,
  inactivarTipoSugerencia,
} from "../controllers/tipos_sugerencias_controllers.js";

export const getTiposSugerencias = async (req, res) => {
  try {
    const response = await todosLosTiposSugerencias();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getTiposSugerenciasActivas = async (req, res) => {
  try {
    const response = await todosLosTiposSugerenciasActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id } = req.params;

  try {
    const response = await traerTipoSugerencia(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postTipoSugerencia = async (req, res) => {
  const { descripcion } = req.body;

  try {
    const response = await crearTipoSugerencia(descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id, descripcion } = req.body;

  try {
    const response = await modificarTipoSugerencia(
      tipo_sugerencia_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteTipoSugerencia = async (req, res) => {
  const { tipo_sugerencia_id } = req.body;

  try {
    const response = await inactivarTipoSugerencia(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
