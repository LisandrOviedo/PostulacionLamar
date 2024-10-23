import {
  todasLasReferenciasPersonales,
  todasLasReferenciasPersonalesActivas,
  traerReferenciaPersonal,
  crearReferenciaPersonal,
  modificarReferenciaPersonal,
  inactivarReferenciaPersonal,
} from "../controllers/referencias_personales_controllers.js";

export const getReferenciasPersonales = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasReferenciasPersonales(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getReferenciasPersonalesActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasReferenciasPersonalesActivas(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getReferenciaPersonal = async (req, res) => {
  const { referencia_personal_id } = req.params;

  try {
    const response = await traerReferenciaPersonal(referencia_personal_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postReferenciaPersonal = async (req, res) => {
  const { empleado_id, referencias_personales } = req.body;

  try {
    const response = await crearReferenciaPersonal(
      empleado_id,
      referencias_personales
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putReferenciaPersonal = async (req, res) => {
  const {
    referencia_personal_id,
    nombre_apellido,
    direccion,
    telefono,
    ocupacion,
  } = req.body;

  try {
    const response = await modificarReferenciaPersonal(
      referencia_personal_id,
      nombre_apellido,
      direccion,
      telefono,
      ocupacion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteReferenciaPersonal = async (req, res) => {
  const { referencia_personal_id } = req.body;

  try {
    const response = await inactivarReferenciaPersonal(referencia_personal_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
