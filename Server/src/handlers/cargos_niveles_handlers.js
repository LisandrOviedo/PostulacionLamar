const {
  todosLosCargosNiveles,
  todosLosCargosNivelesActivos,
  traerCargoNivel,
  crearCargoNivel,
  modificarCargoNivel,
  inactivarCargoNivel,
} = require("../controllers/cargos_niveles_controllers");

const getCargosNiveles = async (req, res) => {
  const { cargo_id } = req.params;

  try {
    const response = await todosLosCargosNiveles(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargosNivelesActivos = async (req, res) => {
  const { cargo_id } = req.params;

  try {
    const response = await todosLosCargosNivelesActivos(cargo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargoNivel = async (req, res) => {
  const { cargo_nivel_id } = req.params;

  try {
    const response = await traerCargoNivel(cargo_nivel_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCargoNivel = async (req, res) => {
  const { cargo_id, nivel, salario_min, salario_max } = req.body;

  try {
    const response = await crearCargoNivel(
      cargo_id,
      nivel,
      salario_min,
      salario_max
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCargoNivel = async (req, res) => {
  const { cargo_nivel_id, cargo_id, nivel, salario_min, salario_max } =
    req.body;

  try {
    const response = await modificarCargoNivel(
      cargo_nivel_id,
      cargo_id,
      nivel,
      salario_min,
      salario_max
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCargoNivel = async (req, res) => {
  const { cargo_nivel_id } = req.body;

  try {
    const response = await inactivarCargoNivel(cargo_nivel_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCargosNiveles,
  getCargosNivelesActivos,
  getCargoNivel,
  postCargoNivel,
  putCargoNivel,
  deleteCargoNivel,
};
