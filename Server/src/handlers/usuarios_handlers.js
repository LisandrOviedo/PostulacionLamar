const {
  todosLosUsuarios,
  traerUsuario,
  login,
  crearUsuario,
  modificarUsuario,
  inactivarUsuario,
} = require("../controllers/usuarios_controllers");

const getUsuarios = async (req, res) => {
  try {
    const response = await todosLosUsuarios();

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const response = await traerUsuario(usuario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getLogin = async (req, res) => {
  const { cedula, clave } = req.query;

  try {
    const response = await login(cedula, clave);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postUsuario = async (req, res) => {
  const { cedula, clave, nombres, apellidos, correo, telefono, direccion } =
    req.body;

  try {
    const response = await crearUsuario(
      cedula,
      clave,
      nombres,
      apellidos,
      correo,
      telefono,
      direccion
    );

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putUsuario = async (req, res) => {
  const {
    usuario_id,
    cedula,
    clave,
    nombres,
    apellidos,
    correo,
    telefono,
    direccion,
    activo,
  } = req.body;

  try {
    const response = await modificarUsuario(
      usuario_id,
      cedula,
      clave,
      nombres,
      apellidos,
      correo,
      telefono,
      direccion,
      activo
    );

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { usuario_id } = req.body;

  try {
    const response = await inactivarUsuario(usuario_id);

    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  getLogin,
  postUsuario,
  putUsuario,
  deleteUsuario,
};
