const {
  todosLosEmpleados,
  traerEmpleado,
  login,
  traerCargoActual,
  crearEmpleado,
  actualizarClaveTemporalEmpleado,
  modificarEmpleado,
  modificarFotoEmpleado,
  actualizarClaveEmpleado,
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

const getLogin = async (req, res) => {
  const { cedula, clave } = req.query;

  try {
    const response = await login(cedula, clave);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargoActual = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerCargoActual(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEmpleado = async (req, res) => {
  const { rol_id, cedula, nombres, apellidos, telefono, correo, direccion } =
    req.body;

  try {
    const response = await crearEmpleado(
      rol_id,
      cedula,
      nombres,
      apellidos,
      telefono,
      correo,
      direccion
    );

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
  const {
    empleado_id,
    rol_id,
    cedula,
    nombres,
    apellidos,
    telefono,
    correo,
    direccion,
    activo,
  } = req.body;

  try {
    const response = await modificarEmpleado(
      empleado_id,
      rol_id,
      cedula,
      nombres,
      apellidos,
      telefono,
      correo,
      direccion,
      activo
    );

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
  getLogin,
  getCargoActual,
  postEmpleado,
  putClaveTemporalEmpleado,
  putEmpleado,
  putFotoEmpleado,
  putClaveEmpleado,
  deleteEmpleado,
};
