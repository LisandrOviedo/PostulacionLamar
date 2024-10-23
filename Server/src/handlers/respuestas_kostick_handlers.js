import { crearRespuestasKostick } from "../controllers/respuestas_kostick_controllers.js";

export const postRespuestasKostick = async (req, res) => {
  const { empleado_id, prueba_id, prueba } = req.body;

  try {
    const response = await crearRespuestasKostick(
      empleado_id,
      prueba_id,
      prueba
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
