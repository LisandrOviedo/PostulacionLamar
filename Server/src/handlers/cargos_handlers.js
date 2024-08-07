const {
  todosLosCargos,
  todosLosCargosActivos,
  traerCargo,
  crearCargo,
  modificarCargo,
  inactivarCargo,
} = require("../controllers/cargos_controllers");

const getCargos = async (req, res) => {
  const { departamento_id } = req.params;

  try {
    const response = await todosLosCargos(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargosActivos = async (req, res) => {
  const { departamento_id } = req.params;

  try {
    const response = await todosLosCargosActivos(departamento_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargo = async (req, res) => {
  const { cargo_id } = req.params;

  try {
    const response = await traerCargo(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCargo = async (req, res) => {
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

const putCargo = async (req, res) => {
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

const deleteCargo = async (req, res) => {
  const { cargo_id } = req.body;

  try {
    const response = await inactivarCargo(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCargos,
  getCargosActivos,
  getCargo,
  postCargo,
  putCargo,
  deleteCargo,
};
