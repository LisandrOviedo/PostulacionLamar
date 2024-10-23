import {
  todosLosContactosEmergencia,
  todosLosContactosEmergenciaActivos,
  traerContactoEmergencia,
  crearContactoEmergencia,
  modificarContactoEmergencia,
  inactivarContactoEmergencia,
} from "../controllers/contactos_emergencia_controllers.js";

export const getContactosEmergencia = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosContactosEmergencia(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getContactosEmergenciaActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosContactosEmergenciaActivos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getContactoEmergencia = async (req, res) => {
  const { contacto_emergencia_id } = req.params;

  try {
    const response = await traerContactoEmergencia(contacto_emergencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postContactoEmergencia = async (req, res) => {
  const { empleado_id, contactos_emergencia } = req.body;

  try {
    const response = await crearContactoEmergencia(
      empleado_id,
      contactos_emergencia
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putContactoEmergencia = async (req, res) => {
  const {
    contacto_emergencia_id,
    nombre_apellido,
    parentesco,
    telefono,
    direccion,
  } = req.body;

  try {
    const response = await modificarContactoEmergencia(
      contacto_emergencia_id,
      nombre_apellido,
      parentesco,
      telefono,
      direccion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteContactoEmergencia = async (req, res) => {
  const { contacto_emergencia_id } = req.body;

  try {
    const response = await inactivarContactoEmergencia(contacto_emergencia_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
