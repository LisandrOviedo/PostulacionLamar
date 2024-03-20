const {
  todosLosCargosTitulos,
  traerCargoTitulo,
  crearCargoTitulo,
  modificarCargoTitulo,
  inactivarCargoTitulo,
} = require("../controllers/cargo_titulos_controllers");

const getCargosTitulos = async (req, res) => {
  try {
    const response = await todosLosCargosTitulos();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCargoTitulo = async (req, res) => {
  const { cargo_titulo_id } = req.params;

  try {
    const response = await traerCargoTitulo(cargo_titulo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCargoTitulo = async (req, res) => {
  const { nombre } = req.body;

  try {
    const response = await crearCargoTitulo(nombre);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCargoTitulo = async (req, res) => {
  const { cargo_titulo_id, nombre, activo } = req.body;

  try {
    const response = await modificarCargoTitulo(
      cargo_titulo_id,
      nombre,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCargoTitulo = async (req, res) => {
  const { cargo_titulo_id } = req.body;

  try {
    const response = await inactivarCargoTitulo(cargo_titulo_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCargosTitulos,
  getCargoTitulo,
  postCargoTitulo,
  putCargoTitulo,
  deleteCargoTitulo,
};
