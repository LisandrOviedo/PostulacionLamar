const { Usuario } = require("../db");

const todosLosUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();

    if (usuarios.length === 0) {
      return "No existen usuarios";
    }

    return usuarios;
  } catch (error) {
    return "Error al traer todos los usuarios: ", error.message;
  }
};

const traerUsuario = async (usuario_id) => {
  if (!usuario_id) {
    return "Datos faltantes";
  }

  try {
    const usuario = await Usuario.findByPk(usuario_id);

    if (usuario === null) {
      return "No existe ese usuario";
    }

    return usuario;
  } catch (error) {
    return "Error al traer el usuario: ", error.message;
  }
};

const crearUsuario = async (
  cedula,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion,
  clave
) => {
  if (
    !cedula ||
    !nombres ||
    !apellidos ||
    !correo ||
    !telefono ||
    !direccion ||
    !clave
  ) {
    return "Datos faltantes";
  }

  try {
    const [usuario, created] = await Usuario.findOrCreate({
      where: { cedula: cedula },
      defaults: {
        cedula: cedula,
        nombres: nombres,
        apellidos: nombres,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
        clave: clave,
      },
    });

    if (created) {
      return usuario;
    }

    return "Ya existe un usuario con ese número de cédula de identidad";
  } catch (error) {
    return "Error al crear el usuario: ", error.message;
  }
};

const modificarUsuario = async (
  usuario_id,
  cedula,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion,
  clave,
  inactivo
) => {
  if (
    !usuario_id ||
    !cedula ||
    !nombres ||
    !apellidos ||
    !correo ||
    !telefono ||
    !direccion ||
    !clave ||
    !inactivo
  ) {
    return "Datos faltantes";
  }

  try {
    const usuario = await traerUsuario(usuario_id);

    await Usuario.update(
      {
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
        clave: clave,
        inactivo: inactivo,
      },
      {
        where: {
          usuario_id: usuario_id,
        },
      }
    );

    return await traerUsuario(usuario_id);
  } catch (error) {
    return "Error al modificar el usuario: ", error.message;
  }
};

const inactivarUsuario = async (usuario_id) => {
  if (!usuario_id) {
    return "Datos faltantes";
  }

  try {
    const usuario = await traerUsuario(usuario_id);

    await Usuario.update(
      { inactivo: !usuario.inactivo },
      {
        where: { usuario_id: usuario_id },
      }
    );

    return await traerUsuario(usuario_id);
  } catch (error) {
    return "Error al inactivar el usuario: ", error.message;
  }
};

module.exports = {
  todosLosUsuarios,
  traerUsuario,
  crearUsuario,
  modificarUsuario,
  inactivarUsuario,
};
