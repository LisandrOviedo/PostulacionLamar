const {
  todasLasDirecciones,
  todasLasDireccionesActivas,
  traerDireccion,
  crearDireccion,
  modificarDireccion,
  inactivarDireccion,
} = require("../controllers/direcciones_controllers");

const getDirecciones = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasDirecciones(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDireccionesActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todasLasDireccionesActivas(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDireccion = async (req, res) => {
  const { direccion_id } = req.params;

  try {
    const response = await traerDireccion(direccion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDireccion = async (req, res) => {
  const { empleado_id, direccion } = req.body;

  try {
    const response = await crearDireccion(empleado_id, direccion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putDireccion = async (req, res) => {
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

const deleteDireccion = async (req, res) => {
  const { direccion_id } = req.body;

  try {
    const response = await inactivarDireccion(direccion_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDirecciones,
  getDireccionesActivas,
  getDireccion,
  postDireccion,
  putDireccion,
  deleteDireccion,
};
