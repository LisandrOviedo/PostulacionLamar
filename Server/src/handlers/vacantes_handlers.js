const {
  todasLasVacantes,
  traerVacante,
  traerPostulacionesEmpleado,
  traerPostulacionEmpleado,
  crearVacante,
  modificarVacante,
  inactivarVacante,
  postularVacanteEmpleado,
} = require("../controllers/vacantes_controllers");

const getVacantes = async (req, res) => {
  const {
    paginaActual,
    limitePorPagina,
    buscar_por,
    buscar,
    orden_campo,
    orden_por,
    area_interes_id,
    activo,
  } = req.query;

  try {
    const response = await todasLasVacantes(
      paginaActual,
      limitePorPagina,
      buscar_por,
      buscar,
      orden_campo,
      orden_por,
      area_interes_id,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getVacante = async (req, res) => {
  const { vacante_id } = req.params;

  const {
    paginaActual,
    limitePorPagina,
    buscar_por,
    buscar,
    orden_campo,
    orden_por,
    activo,
  } = req.query;

  try {
    const response = await traerVacante(
      vacante_id,
      paginaActual,
      limitePorPagina,
      buscar_por,
      buscar,
      orden_campo,
      orden_por,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPostulacionesEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  const {
    paginaActual,
    limitePorPagina,
    buscar_por,
    buscar,
    area_interes_id,
    estado_solicitud,
    orden_campo,
    orden_por,
  } = req.query;

  try {
    const response = await traerPostulacionesEmpleado(
      empleado_id,
      paginaActual,
      limitePorPagina,
      buscar_por,
      buscar,
      area_interes_id,
      estado_solicitud,
      orden_campo,
      orden_por
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPostulacionEmpleado = async (req, res) => {
  const { vacante_empleado_id } = req.params;

  try {
    const response = await traerPostulacionEmpleado(vacante_empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postVacante = async (req, res) => {
  const { area_interes_id, nombre, descripcion, ubicacion } = req.body;

  try {
    const response = await crearVacante(
      area_interes_id,
      nombre,
      descripcion,
      ubicacion
    );

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
  const { vacante_id, area_interes_id, nombre, descripcion, ubicacion } =
    req.body;

  try {
    const response = await modificarVacante(
      vacante_id,
      area_interes_id,
      nombre,
      descripcion,
      ubicacion
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
  getPostulacionesEmpleado,
  getPostulacionEmpleado,
  postVacante,
  postVacanteEmpleado,
  putVacante,
  deleteVacante,
};
