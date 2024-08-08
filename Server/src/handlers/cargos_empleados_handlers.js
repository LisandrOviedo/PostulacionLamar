const {
  todosLosCargosEmpleados,
  todosLosCargosEmpleadosActivos,
  traerCargoEmpleado,
  crearCargoEmpleado,
  modificarCargoEmpleado,
  inactivarCargoEmpleado,
} = require("../controllers/cargos_empleados_controllers");

const getCargosEmpleadosEmpleados = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosCargosEmpleados(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargosEmpleadosEmpleadosActivos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosCargosEmpleadosActivos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargoEmpleado = async (req, res) => {
  const { cargo_empleado_id } = req.params;

  try {
    const response = await traerCargoEmpleado(cargo_empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCargoEmpleado = async (req, res) => {
  const { empleado_id, datosIngreso } = req.body;

  try {
    const response = await crearCargoEmpleado(empleado_id, datosIngreso);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCargoEmpleado = async (req, res) => {
  const {
    cargo_empleado_id,
    cargo_nivel_id,
    salario,
    fecha_ingreso,
    fecha_egreso,
  } = req.body;

  try {
    const response = await modificarCargoEmpleado(
      cargo_empleado_id,
      cargo_nivel_id,
      salario,
      fecha_ingreso,
      fecha_egreso
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCargoEmpleado = async (req, res) => {
  const { cargo_empleado_id } = req.body;

  try {
    const response = await inactivarCargoEmpleado(cargo_empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCargosEmpleadosEmpleados,
  getCargosEmpleadosEmpleadosActivos,
  getCargoEmpleado,
  postCargoEmpleado,
  putCargoEmpleado,
  deleteCargoEmpleado,
};
