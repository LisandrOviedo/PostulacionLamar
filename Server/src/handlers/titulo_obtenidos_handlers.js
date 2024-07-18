const {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
  eliminarTitulosEmpleado,
} = require("../controllers/titulo_obtenido_controllers");

const getTitulosObtenidos = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await todosLosTitulosObtenidos(empleado_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTituloObtenido = async (req, res) => {
  const { titulo_obtenido_id } = req.params;

  try {
    const response = await traerTituloObtenido(titulo_obtenido_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postTitulosObtenidos = async (req, res) => {
  const { empleado_id, titulos_obtenidos } = req.body;

  try {
    const response = await crearTitulosObtenidos(
      empleado_id,
      titulos_obtenidos
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putTituloObtenido = async (req, res) => {
  const { empleado_id, titulos_obtenidos } = req.body;

  try {
    const response = await modificarTitulosObtenidos(
      empleado_id,
      titulos_obtenidos
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTituloObtenido = async (req, res) => {
  const { titulo_obtenido_id } = req.body;

  try {
    const response = await inactivarTituloObtenido(titulo_obtenido_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteTitulosEmpleado = async (req, res) => {
  const { empleado_id } = req.params;

  try {
    const response = await eliminarTitulosEmpleado(empleado_id);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTitulosObtenidos,
  getTituloObtenido,
  postTitulosObtenidos,
  putTituloObtenido,
  deleteTituloObtenido,
  deleteTitulosEmpleado,
};
