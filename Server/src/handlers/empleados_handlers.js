const {
  todosLosEmpleados,
  traerEmpleado,
  login,
  crearEmpleado,
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
  const { cedula } = req.query;

  try {
    const response = await login(cedula);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postEmpleado = async (req, res) => {
  const { cedula, nombres, apellidos, correo, telefono, direccion, clave } =
    req.body;

  try {
    const response = await crearEmpleado(
      cedula,
      nombres,
      apellidos,
      correo,
      telefono,
      direccion,
      clave
    );

    return res.status(201).json(response);
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
    inactivo,
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
      inactivo
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
  postEmpleado,
  putEmpleado,
  deleteEmpleado,
};
