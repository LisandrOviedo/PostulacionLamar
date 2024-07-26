const {
  todosLosEmpleados,
  traerEmpleado,
  traerEmpleadoExistencia,
  login,
  crearEmpleado,
  actualizarClaveTemporalEmpleado,
  modificarEmpleado,
  modificarFotoEmpleado,
  actualizarClaveEmpleado,
  reiniciarClaveEmpleado,
  inactivarEmpleado,
} = require("../controllers/empleados_controllers");

const getEmpleados = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todosLosEmpleados(
      filtros,
      parseInt(paginaActual),
      parseInt(limitePorPagina)
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEmpleadoExistencia = async (req, res) => {
  const { tipo_identificacion, numero_identificacion } = req.query;

  try {
    const response = await traerEmpleadoExistencia(
      tipo_identificacion,
      numero_identificacion
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getLogin = async (req, res) => {
  const { tipo_identificacion, numero_identificacion, clave } = req.query;

  try {
    const response = await login(
      tipo_identificacion,
      numero_identificacion,
      clave
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEmpleado = async (req, res) => {
  const { datosPersonales } = req.body;

  try {
    const response = await crearEmpleado(datosPersonales);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putClaveTemporalEmpleado = async (req, res) => {
  const { empleado_id, clave } = req.body;

  try {
    const response = await actualizarClaveTemporalEmpleado(empleado_id, clave);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putEmpleado = async (req, res) => {
  const { datosPersonales } = req.body;

  try {
    const response = await modificarEmpleado(datosPersonales);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putFotoEmpleado = async (req, res) => {
  const { empleado_id } = req.body;
  const { filename, path } = req.file;

  try {
    const response = await modificarFotoEmpleado(empleado_id, filename, path);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putClaveEmpleado = async (req, res) => {
  const { empleado_id, claveAnterior, claveNueva } = req.body;

  try {
    const response = await actualizarClaveEmpleado(
      empleado_id,
      claveAnterior,
      claveNueva
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putReiniciarClave = async (req, res) => {
  const { empleado_id } = req.body;

  try {
    const response = await reiniciarClaveEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteEmpleado = async (req, res) => {
  const { empleado_id } = req.body;

  try {
    const response = await inactivarEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEmpleados,
  getEmpleado,
  getEmpleadoExistencia,
  getLogin,
  postEmpleado,
  putClaveTemporalEmpleado,
  putEmpleado,
  putFotoEmpleado,
  putClaveEmpleado,
  putReiniciarClave,
  deleteEmpleado,
};
