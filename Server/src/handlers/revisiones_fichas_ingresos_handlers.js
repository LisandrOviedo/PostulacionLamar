const {
  todasLasRevisionesFichasIngresos,
  todasLasRevisionesFichasIngresosActivas,
  traerRevisionFichaIngreso,
  crearRevisionFichaIngreso,
  modificarRevisionFichaIngreso,
  inactivarRevisionFichaIngreso,
} = require("../controllers/revisiones_fichas_ingresos_controllers");

const getRevisionesFichasIngresos = async (req, res) => {
  try {
    const response = await todasLasRevisionesFichasIngresos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRevisionesFichasIngresosActivas = async (req, res) => {
  try {
    const response = await todasLasRevisionesFichasIngresosActivas();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getRevisionFichaIngreso = async (req, res) => {
  const { revision_ficha_ingreso_id } = req.params;

  try {
    const response = await traerRevisionFichaIngreso(revision_ficha_ingreso_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postRevisionFichaIngreso = async (req, res) => {
  const { codigo, fecha, numero } = req.body;

  try {
    const response = await crearRevisionFichaIngreso(codigo, fecha, numero);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putRevisionFichaIngreso = async (req, res) => {
  const { revision_ficha_ingreso_id, codigo, fecha, numero } = req.body;

  try {
    const response = await modificarRevisionFichaIngreso(
      revision_ficha_ingreso_id,
      codigo,
      fecha,
      numero
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteRevisionFichaIngreso = async (req, res) => {
  const { revision_ficha_ingreso_id } = req.body;

  try {
    const response = await inactivarRevisionFichaIngreso(
      revision_ficha_ingreso_id
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRevisionesFichasIngresos,
  getRevisionesFichasIngresosActivas,
  getRevisionFichaIngreso,
  postRevisionFichaIngreso,
  putRevisionFichaIngreso,
  deleteRevisionFichaIngreso,
};
