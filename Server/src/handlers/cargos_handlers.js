import {
  todosLosCargos,
  todosLosCargosActivos,
  traerCargo,
  crearCargo,
  modificarCargo,
  inactivarCargo,
} from "../controllers/cargos_controllers.js";

export const getCargos = async (req, res) => {
  const { departamento_id } = req.params;

  try {
    const response = await todosLosCargos(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCargosActivos = async (req, res) => {
  const { departamento_id } = req.params;

  try {
    const response = await todosLosCargosActivos(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getCargo = async (req, res) => {
  const { cargo_id } = req.params;

  try {
    const response = await traerCargo(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const postCargo = async (req, res) => {
  const {
    departamento_id,
    codigo_cargo,
    descripcion,
    descripcion_cargo_antiguo,
  } = req.body;

  try {
    const response = await crearCargo(
      departamento_id,
      codigo_cargo,
      descripcion,
      descripcion_cargo_antiguo
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const putCargo = async (req, res) => {
  const {
    cargo_id,
    departamento_id,
    codigo_cargo,
    descripcion,
    descripcion_cargo_antiguo,
  } = req.body;

  try {
    const response = await modificarCargo(
      cargo_id,
      departamento_id,
      codigo_cargo,
      descripcion,
      descripcion_cargo_antiguo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteCargo = async (req, res) => {
  const { cargo_id } = req.body;

  try {
    const response = await inactivarCargo(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
