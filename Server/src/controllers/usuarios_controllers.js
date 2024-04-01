const { Usuario } = require("../db");

const bcrypt = require("bcrypt");

const todosLosUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!usuarios) {
      throw new Error("No existen usuarios");
    }

    return usuarios;
  } catch (error) {
    throw new Error("Error al traer todos los usuarios: ", error.message);
  }
};

const traerUsuario = async (usuario_id) => {
  if (!usuario_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const usuario = await Usuario.findByPk(usuario_id, {
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!usuario) {
      throw new Error("No existe ese usuario");
    }

    return usuario;
  } catch (error) {
    throw new Error("Error al traer el usuario: ", error.message);
  }
};

const login = async (cedula, clave) => {
  if (!cedula || !clave) {
    throw new Error("Datos faltantes");
  }

  try {
    const usuario = await Usuario.findOne({
      attributes: ["usuario_id", "clave", "activo"],
      where: { cedula: cedula },
    });

    if (!usuario) {
      throw new Error("Datos incorrectos");
    }

    const claveCoincide = await bcrypt.compare(clave, usuario.clave);

    if (!claveCoincide) {
      throw new Error("Datos incorrectos");
    }

    return usuario;
  } catch (error) {
    throw new Error("Error al loguear: ", error.message);
  }
};

const crearUsuario = async (
  cedula,
  clave,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion
) => {
  if (
    !cedula ||
    !clave ||
    !nombres ||
    !apellidos ||
    !correo ||
    !telefono ||
    !direccion
  ) {
    throw new Error("Datos faltantes");
  }

  try {
    const claveCifrada = await bcrypt.hash(clave, 10);

    const [usuario, created] = await Usuario.findOrCreate({
      where: { cedula: cedula },
      defaults: {
        cedula: cedula,
        clave: claveCifrada,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
      },
    });

    if (created) {
      return usuario;
    }

    throw new Error(
      "Ya existe un usuario con ese número de cédula de identidad"
    );
  } catch (error) {
    throw new Error("Error al crear el usuario: ", error.message);
  }
};

const modificarUsuario = async (
  usuario_id,
  cedula,
  clave,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion,
  activo
) => {
  if (
    !usuario_id ||
    !cedula ||
    !clave ||
    !nombres ||
    !apellidos ||
    !correo ||
    !telefono ||
    !direccion ||
    !activo
  ) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerUsuario(usuario_id);

    const claveCifrada = await bcrypt.hash(clave, 10);

    await Usuario.update(
      {
        cedula: cedula,
        clave: claveCifrada,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
        activo: activo,
      },
      {
        where: {
          usuario_id: usuario_id,
        },
      }
    );

    return await traerUsuario(usuario_id);
  } catch (error) {
    throw new Error("Error al modificar el usuario: ", error.message);
  }
};

const inactivarUsuario = async (usuario_id) => {
  if (!usuario_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const usuario = await traerUsuario(usuario_id);

    await Usuario.update(
      { activo: !usuario.activo },
      {
        where: { usuario_id: usuario_id },
      }
    );

    return await traerUsuario(usuario_id);
  } catch (error) {
    throw new Error("Error al inactivar el usuario: ", error.message);
  }
};

module.exports = {
  todosLosUsuarios,
  traerUsuario,
  login,
  crearUsuario,
  modificarUsuario,
  inactivarUsuario,
};
