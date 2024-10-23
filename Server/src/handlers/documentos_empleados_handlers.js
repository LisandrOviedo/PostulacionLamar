import {
  traerAnexos,
  crearAnexos,
} from "../controllers/documentos_empleados_controllers.js";

export const getAnexos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerAnexos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postAnexos = async (req, res) => {
  const { empleado_id } = req.body;
  const anexos = req.files;

  try {
    const response = await crearAnexos(empleado_id, anexos);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
