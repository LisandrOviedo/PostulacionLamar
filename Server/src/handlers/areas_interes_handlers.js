import {
  todosLosAreaInteres,
  todosLosAreaInteresActivas,
  traerAreaInteres,
  crearAreaInteres,
  modificarAreaInteres,
  inactivarAreaInteres,
  agregarAreasInteresCurriculo,
} from "../controllers/areas_interes_controllers.js";

export const getAreasInteres = async (req, res) => {
  try {
    const response = await todosLosAreaInteres();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAreasInteresActivas = async (req, res) => {
  try {
    const response = await todosLosAreaInteresActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAreaInteres = async (req, res) => {
  const { area_interes_id } = req.params;

  try {
    const response = await traerAreaInteres(area_interes_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postAreaInteres = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearAreaInteres(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putAreaInteres = async (req, res) => {
  const { area_interes_id, nombre } = req.body;

  try {
    const response = await modificarAreaInteres(area_interes_id, nombre);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteAreaInteres = async (req, res) => {
  const { area_interes_id } = req.body;

  try {
    const response = await inactivarAreaInteres(area_interes_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postAreasInteresCurriculo = async (req, res) => {
  const { curriculo_id, areas_interes } = req.body;

  try {
    const response = await agregarAreasInteresCurriculo(
      curriculo_id,
      areas_interes
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
