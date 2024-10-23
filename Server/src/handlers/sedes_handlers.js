import {
  todasLasSedes,
  todasLasSedesActivas,
  traerSede,
  crearSede,
  modificarSede,
  inactivarSede,
} from "../controllers/sedes_controllers.js";

export const getSedes = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todasLasSedes(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSedesActivas = async (req, res) => {
  const { empresa_id } = req.params;

  try {
    const response = await todasLasSedesActivas(empresa_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getSede = async (req, res) => {
  const { sede_id } = req.params;

  try {
    const response = await traerSede(sede_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postSede = async (req, res) => {
  const { empresa_id, nombre, tipo, direccion, latitud, longitud } = req.body;

  try {
    const response = await crearSede(
      empresa_id,
      nombre,
      tipo,
      direccion,
      latitud,
      longitud
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putSede = async (req, res) => {
  const { sede_id, empresa_id, nombre, tipo, direccion, latitud, longitud } =
    req.body;

  try {
    const response = await modificarSede(
      sede_id,
      empresa_id,
      nombre,
      tipo,
      direccion,
      latitud,
      longitud
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteSede = async (req, res) => {
  const { sede_id } = req.body;

  try {
    const response = await inactivarSede(sede_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
