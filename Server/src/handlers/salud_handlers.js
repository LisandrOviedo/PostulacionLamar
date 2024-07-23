const {
  todosLosSalud,
  todosLosSaludActivos,
  traerSalud,
  crearSalud,
  modificarSalud,
  inactivarSalud,
} = require("../controllers/salud_controllers");

const getSaluds = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosSalud(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSaludActivas = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosSaludActivos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSalud = async (req, res) => {
  const { salud_id } = req.params;

  try {
    const response = await traerSalud(salud_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSalud = async (req, res) => {
  const {
    empleado_id,
    alergia_medicamentos,
    alergia_alimentos,
    alergia_otros,
    alergia_especifique,
    fuma,
    cicatriz_especifique,
  } = req.body;

  try {
    const response = await crearSalud(
      empleado_id,
      alergia_medicamentos,
      alergia_alimentos,
      alergia_otros,
      alergia_especifique,
      fuma,
      cicatriz_especifique
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putSalud = async (req, res) => {
  const {
    salud_id,
    alergia_medicamentos,
    alergia_alimentos,
    alergia_otros,
    alergia_especifique,
    fuma,
    cicatriz_especifique,
  } = req.body;

  try {
    const response = await modificarSalud(
      salud_id,
      alergia_medicamentos,
      alergia_alimentos,
      alergia_otros,
      alergia_especifique,
      fuma,
      cicatriz_especifique
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteSalud = async (req, res) => {
  const { salud_id } = req.body;

  try {
    const response = await inactivarSalud(salud_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSaluds,
  getSaludActivas,
  getSalud,
  postSalud,
  putSalud,
  deleteSalud,
};
