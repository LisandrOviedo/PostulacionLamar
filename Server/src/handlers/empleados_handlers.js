const {
  todosLosEmpleados,
  traerEmpleado,
  login,
  traerCargoActual,
  crearEmpleado,
  actualizarClaveEmpleado,
  modificarEmpleado,
  inactivarEmpleado,
} = require("../controllers/empleados_controllers");

const getEmpleados = async (req, res) => {
  try {
    const response = await todosLosEmpleados();

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
  const { rol, cedula, nombres, apellidos, correo, telefono, direccion } =
    req.body;

  try {
    const response = await crearEmpleado(
      rol,
      cedula,
      nombres,
      apellidos,
      correo,
      telefono,
      direccion
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putClaveEmpleado = async (req, res) => {
  const { empleado_id, clave } = req.body;

  try {
    const response = await actualizarClaveEmpleado(empleado_id, clave);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putEmpleado = async (req, res) => {
  const {
    empleado_id,
    cedula,
    nombres,
    apellidos,
    correo,
    telefono,
    direccion,
    activo,
  } = req.body;

  try {
    const response = await modificarEmpleado(
      empleado_id,
      cedula,
      nombres,
      apellidos,
      correo,
      telefono,
      direccion,
      activo
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
  putClaveEmpleado,
  putEmpleado,
  deleteEmpleado,
};
