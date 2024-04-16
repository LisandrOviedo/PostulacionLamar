const {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoEmpleado,
  crearCurriculo,
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

const getCurriculoEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerCurriculoEmpleado(empleado_id);

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
    cantidad_hijos,
    habilidades_tecnicas,
  } = req.body;

  try {
    const response = await crearCurriculo(
      empleado_id,
      grado_instruccion,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      cantidad_hijos,
      habilidades_tecnicas
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCurriculo = async (req, res) => {
  const {
    curriculo_id,
    grado_instruccion,
    disponibilidad_viajar,
    disponibilidad_cambio_residencia,
    cantidad_hijos,
    habilidades_tecnicas,
  } = req.body;

  try {
    const response = await modificarCurriculo(
      curriculo_id,
      grado_instruccion,
      disponibilidad_viajar,
      disponibilidad_cambio_residencia,
      cantidad_hijos,
      habilidades_tecnicas
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
  getCurriculoEmpleado,
  postCurriculo,
  putCurriculo,
  deleteCurriculo,
};
