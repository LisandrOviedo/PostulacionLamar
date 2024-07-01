const { conn, Roles } = require("../db");

const { roles } = require("../utils/roles");

const { fechaHoraActual } = require("../utils/formatearFecha");

const todosLosRoles = async () => {
  try {
    const roles = await Roles.findAll();

    if (!roles.length) {
      throw new Error(`${fechaHoraActual()} - No existen roles`);
    }

    return roles;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer todos los roles:`,
      error.message
    );
  }
};

const traerRol = async (rol_id) => {
  if (!rol_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const rol = await Roles.findByPk(rol_id);

    if (!rol) {
      throw new Error(`${fechaHoraActual()} - No existe ese rol`);
    }

    return rol;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer el rol:`,
      error.message
    );
  }
};

const cargarRoles = async () => {
  let t;

  try {
    t = await conn.transaction();

    for (const rol of roles) {
      const [crearRol, created] = await Roles.findOrCreate({
        where: { nombre: rol.nombre },
        defaults: {
          nombre: rol.nombre,
          descripcion: rol.descripcion,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear los roles:`,
      error.message
    );
  }
};

const crearRol = async (nombre, descripcion) => {
  if (!nombre || !descripcion) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [rol, created] = await Roles.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return rol;
    }

    throw new Error(`${fechaHoraActual()} - Ya existe un rol con ese nombre`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear el rol:`,
      error.message
    );
  }
};

const modificarRol = async (rol_id, nombre, descripcion, activo) => {
  if (!rol_id || !nombre || !descripcion || !activo) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerRol(rol_id);

    await Roles.update(
      {
        rol_id: rol_id,
        nombre: nombre,
        descripcion: descripcion,
        activo: activo,
      },
      {
        where: {
          rol_id: rol_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRol(rol_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el rol:`,
      error.message
    );
  }
};

const inactivarRol = async (rol_id) => {
  if (!rol_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }
  let t;

  try {
    t = await conn.transaction();

    const rol = await traerRol(rol_id);

    await Roles.update(
      { activo: !rol.activo },
      {
        where: { rol_id: rol_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRol(rol_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al inactivar el rol:`,
      error.message
    );
  }
};

module.exports = {
  todosLosRoles,
  traerRol,
  cargarRoles,
  crearRol,
  modificarRol,
  inactivarRol,
};
