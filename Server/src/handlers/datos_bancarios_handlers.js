const {
  todosLosDatosBancarios,
  todosLosDatosBancariosActivos,
  traerDatoBancario,
  crearDatoBancario,
  modificarDatoBancario,
  inactivarDatoBancario,
} = require("../controllers/datos_bancarios_controllers");

const getDatosBancarios = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosDatosBancarios(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDatosBancariosActivos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosDatosBancariosActivos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDatoBancario = async (req, res) => {
  const { dato_bancario_id } = req.params;

  try {
    const response = await traerDatoBancario(dato_bancario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDatoBancario = async (req, res) => {
  const { empleado_id, datosIngreso } = req.body;

  try {
    const response = await crearDatoBancario(empleado_id, datosIngreso);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putDatoBancario = async (req, res) => {
  const {
    dato_bancario_id,
    titular_cuenta,
    entidad_bancaria,
    numero_cuenta,
    tipo_cuenta,
    nombre_apellido_tercero,
    tipo_identificacion_tercero,
    numero_identificacion_tercero,
    parentesco_tercero,
  } = req.body;

  try {
    const response = await modificarDatoBancario(
      dato_bancario_id,
      titular_cuenta,
      entidad_bancaria,
      numero_cuenta,
      tipo_cuenta,
      nombre_apellido_tercero,
      tipo_identificacion_tercero,
      numero_identificacion_tercero,
      parentesco_tercero
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteDatoBancario = async (req, res) => {
  const { dato_bancario_id } = req.body;

  try {
    const response = await inactivarDatoBancario(dato_bancario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDatosBancarios,
  getDatosBancariosActivos,
  getDatoBancario,
  postDatoBancario,
  putDatoBancario,
  deleteDatoBancario,
};
