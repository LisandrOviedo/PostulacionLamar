const {
  todasLasVacantes,
  traerVacante,
  traerVacanteEmpleados,
  crearVacante,
  modificarVacante,
  inactivarVacante,
  postularVacanteEmpleado,
} = require("../controllers/vacantes_controllers");

const getVacantes = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.params;

  try {
    const response = await todasLasVacantes(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getVacante = async (req, res) => {
  const { vacante_id } = req.params;

  try {
    const response = await traerVacante(vacante_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getVacanteEmpleados = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.params;

  try {
    const response = await traerVacanteEmpleados(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postVacante = async (req, res) => {
  const { area_interes_id, descripcion } = req.body;

  try {
    const response = await crearVacante(area_interes_id, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postVacanteEmpleado = async (req, res) => {
  const { vacante_id, empleado_id } = req.body;

  try {
    const response = await postularVacanteEmpleado(vacante_id, empleado_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putVacante = async (req, res) => {
  const { vacante_id, area_interes_id, descripcion } = req.body;

  try {
    const response = await modificarVacante(
      vacante_id,
      area_interes_id,
      descripcion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteVacante = async (req, res) => {
  const { vacante_id } = req.body;

  try {
    const response = await inactivarVacante(vacante_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVacantes,
  getVacante,
  getVacanteEmpleados,
  postVacante,
  postVacanteEmpleado,
  putVacante,
  deleteVacante,
};
