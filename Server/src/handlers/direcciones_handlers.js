import {
  todasLasDirecciones,
  todasLasDireccionesActivas,
  traerDireccion,
  crearDireccion,
  modificarDireccion,
  inactivarDireccion,
} from "../controllers/direcciones_controllers.js";

export const getDirecciones = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasDirecciones(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getDireccionesActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasDireccionesActivas(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getDireccion = async (req, res) => {
  const { direccion_id } = req.params;

  try {
    const response = await traerDireccion(direccion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postDireccion = async (req, res) => {
  const { empleado_id, datosIngreso } = req.body;

  try {
    const response = await crearDireccion(empleado_id, datosIngreso);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putDireccion = async (req, res) => {
  const {
    direccion_id,
    calle_avenida,
    parroquia_id,
    municipio_id,
    tipo_vivienda,
    numero_casa,
    piso,
    apartamento,
    urbanizacion_sector,
    estado_id,
    pais_id,
  } = req.body;

  try {
    const response = await modificarDireccion(
      direccion_id,
      calle_avenida,
      parroquia_id,
      municipio_id,
      tipo_vivienda,
      numero_casa,
      piso,
      apartamento,
      urbanizacion_sector,
      estado_id,
      pais_id
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteDireccion = async (req, res) => {
  const { direccion_id } = req.body;

  try {
    const response = await inactivarDireccion(direccion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
