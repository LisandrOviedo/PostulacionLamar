const {
  todosLosCurriculos,
  traerCurriculo,
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

const postCurriculo = async (req, res) => {
  const {
    grado_instruccion,
    titulo_obtenido,
    area_interes_otro,
    ruta_pdf,
    estado,
  } = req.body;

  try {
    const response = await crearCurriculo(
      grado_instruccion,
      titulo_obtenido,
      area_interes_otro,
      ruta_pdf,
      estado
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
    titulo_obtenido,
    area_interes_otro,
    ruta_pdf,
    estado,
    inactivo,
  } = req.body;

  try {
    const response = await modificarCurriculo(
      curriculo_id,
      grado_instruccion,
      titulo_obtenido,
      area_interes_otro,
      ruta_pdf,
      estado,
      inactivo
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
  putCurriculo,
  deleteCurriculo,
};
