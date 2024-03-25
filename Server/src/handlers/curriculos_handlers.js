const {
  todosLosCurriculos,
  traerCurriculo,
  crearCurriculo,
  agregarAreasInteres,
  modificarCurriculo,
  inactivarCurriculo,
} = require("../controllers/curriculos_controllers");

const getCurriculos = async (req, res) => {
  try {
    const response = await todosLosCurriculos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCurriculo = async (req, res) => {
  const { curriculo_id } = req.params;

  try {
    const response = await traerCurriculo(curriculo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCurriculo = async (req, res) => {
  const {
    empleado_id,
    grado_instruccion,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
  } = req.body;

  const { originalname, path } = req.file;

  try {
    const response = await crearCurriculo(
      empleado_id,
      grado_instruccion,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      originalname,
      path
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postAreasInteres = async (req, res) => {
  const { curriculo_id, areas_interes } = req.body;

  try {
    const response = await agregarAreasInteres(curriculo_id, areas_interes);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCurriculo = async (req, res) => {
  const {
    curriculo_id,
    grado_instruccion,
    titulo_obtenido,
    centro_educativo,
    area_interes_id,
    area_interes_otro,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
    ruta_pdf,
    estado,
    activo,
  } = req.body;

  try {
    const response = await modificarCurriculo(
      curriculo_id,
      grado_instruccion,
      titulo_obtenido,
      centro_educativo,
      area_interes_id,
      area_interes_otro,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      ruta_pdf,
      estado,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCurriculo = async (req, res) => {
  const { curriculo_id } = req.body;

  try {
    const response = await inactivarCurriculo(curriculo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCurriculos,
  getCurriculo,
  postCurriculo,
  postAreasInteres,
  putCurriculo,
  deleteCurriculo,
};
