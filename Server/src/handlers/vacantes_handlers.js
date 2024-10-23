import {
  todasLasVacantes,
  traerVacante,
  traerVacanteEmpleados,
  crearVacante,
  modificarVacante,
  inactivarVacante,
  postularVacanteEmpleado,
} from "../controllers/vacantes_controllers.js";

export const getVacantes = async (req, res) => {
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

export const getVacante = async (req, res) => {
  const { vacante_id } = req.params;

  try {
    const response = await traerVacante(vacante_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getVacanteEmpleados = async (req, res) => {
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

export const postVacante = async (req, res) => {
  const { area_interes_id, descripcion } = req.body;

  try {
    const response = await crearVacante(area_interes_id, descripcion);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postVacanteEmpleado = async (req, res) => {
  const { vacante_id, empleado_id } = req.body;

  try {
    const response = await postularVacanteEmpleado(vacante_id, empleado_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putVacante = async (req, res) => {
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

export const deleteVacante = async (req, res) => {
  const { vacante_id } = req.body;

  try {
    const response = await inactivarVacante(vacante_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
