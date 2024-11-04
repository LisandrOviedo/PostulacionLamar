const {
  todasLasPruebas,
  traerPruebasEmpleados,
  traerPrueba,
  crearPrueba,
} = require("../controllers/pruebas_empleados_controllers");

const getPruebas = async (req, res) => {
  const { filtros, paginaActual, limitePorPagina } = req.body;

  try {
    const response = await todasLasPruebas(
      filtros,
      paginaActual,
      limitePorPagina
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPruebasEmpleado = async (req, res) => {
  const { empleado_id, prueba } = req.body;

  try {
    const response = await traerPruebasEmpleados(empleado_id, prueba);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPrueba = async (req, res) => {
  const { prueba_id } = req.params;

  try {
    const response = await traerPrueba(prueba_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postPrueba = async (req, res) => {
  const { empleado_id, prueba } = req.body;

  try {
    const response = await crearPrueba(empleado_id, prueba);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPruebas,
  getPruebasEmpleado,
  getPrueba,
  postPrueba,
};
