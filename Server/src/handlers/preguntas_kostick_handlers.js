import { todasLasPreguntasKostick } from "../controllers/preguntas_kostick_controllers.js";

export const getPreguntasKostick = async (req, res) => {
  try {
    const response = await todasLasPreguntasKostick();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
