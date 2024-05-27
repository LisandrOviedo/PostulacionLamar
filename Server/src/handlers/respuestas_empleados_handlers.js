const {
  todasLasRespuestasEmpleados,
  traerRespuestasEmpleado,
  crearRespuestasEmpleado,
} = require("../controllers/respuestas_empleados_controllers");

const getRespuestasEmpleados = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todasLasRespuestasEmpleados(
      filtros,
      parseInt(paginaActual),
      parseInt(limitePorPagina)
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRespuestasEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerRespuestasEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postRespuestasEmpleado = async (req, res) => {
  const { empleado_id, prueba } = req.body;

  try {
    const response = await crearRespuestasEmpleado(empleado_id, prueba);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRespuestasEmpleados,
  getRespuestasEmpleado,
  postRespuestasEmpleado,
};
