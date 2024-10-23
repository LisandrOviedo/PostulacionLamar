import { cerrarSesion } from "../controllers/sesiones_controllers.js";

export const deleteSesion = async (req, res) => {
  const { empleado_id } = req.body;

  try {
    const response = await cerrarSesion(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
