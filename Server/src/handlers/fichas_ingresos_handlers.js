const {
  todasLasFichasIngresos,
  todasLasFichasIngresosActivas,
  traerFichaIngreso,
  traerFichaIngresoEmpleado,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
} = require("../controllers/fichas_ingresos_controllers");

const getFichasIngresos = async (req, res) => {
  try {
    const response = await todasLasFichasIngresos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichasIngresosActivas = async (req, res) => {
  try {
    const response = await todasLasFichasIngresosActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichaIngreso = async (req, res) => {
  const { ficha_ingreso_id } = req.params;

  try {
    const response = await traerFichaIngreso(ficha_ingreso_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFichaIngresoEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await traerFichaIngresoEmpleado(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postFichaIngreso = async (req, res) => {
  const {
    codigo_revision_id,
    empleado_id,
    cargo_id,
    salario,
    fecha_ingreso,
    observaciones,
  } = req.body;

  try {
    const response = await crearFichaIngreso(
      codigo_revision_id,
      empleado_id,
      cargo_id,
      salario,
      fecha_ingreso,
      observaciones
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putFichaIngreso = async (req, res) => {
  const {
    ficha_ingreso_id,
    codigo_revision_id,
    cargo_id,
    salario,
    fecha_ingreso,
    observaciones,
  } = req.body;

  try {
    const response = await modificarFichaIngreso(
      ficha_ingreso_id,
      codigo_revision_id,
      cargo_id,
      salario,
      fecha_ingreso,
      observaciones
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteFichaIngreso = async (req, res) => {
  const { ficha_ingreso_id } = req.body;

  try {
    const response = await inactivarFichaIngreso(ficha_ingreso_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getFichasIngresos,
  getFichasIngresosActivas,
  getFichaIngreso,
  getFichaIngresoEmpleado,
  postFichaIngreso,
  putFichaIngreso,
  deleteFichaIngreso,
};
