import {
  todasLosSugerenciasPred,
  todasLosSugerenciasPredActivas,
  traerSugerenciaPred,
  crearSugerenciaPred,
  modificarSugerenciaPred,
  inactivarSugerenciaPred,
} from "../controllers/sugerencias_pred_controllers.js";

export const getSugerenciasPred = async (req, res) => {
  const { tipo_sugerencia_id } = req.params;

  try {
    const response = await todasLosSugerenciasPred(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSugerenciasPredActivas = async (req, res) => {
  const { tipo_sugerencia_id } = req.params;

  try {
    const response = await todasLosSugerenciasPredActivas(tipo_sugerencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSugerenciaPred = async (req, res) => {
  const { sugerencia_pred_id } = req.params;

  try {
    const response = await traerSugerenciaPred(sugerencia_pred_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postSugerenciaPred = async (req, res) => {
  const { tipo_sugerencia_id, descripcion } = req.body;

  try {
    const response = await crearSugerenciaPred(tipo_sugerencia_id, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putSugerenciaPred = async (req, res) => {
  const { sugerencia_pred_id, tipo_sugerencia_id, descripcion } = req.body;

  try {
    const response = await modificarSugerenciaPred(
      sugerencia_pred_id,
      tipo_sugerencia_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSugerenciaPred = async (req, res) => {
  const { sugerencia_pred_id } = req.body;

  try {
    const response = await inactivarSugerenciaPred(sugerencia_pred_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
