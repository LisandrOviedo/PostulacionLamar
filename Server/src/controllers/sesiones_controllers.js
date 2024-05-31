const { conn, Sesiones } = require("../db");

const cerrarSesiones = async () => {
  let t;

  try {
    t = await conn.transaction();

    await Sesiones.update(
      {
        activo: false,
      },
      {
        where: {
          activo: true,
        },
        transaction: t,
      }
    );

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      "Error al cerrar todas las sesiones de los empleados: " + error.message
    );
  }
};

const traerSesion = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const sesion = Sesiones.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });

    if (sesion) {
      return sesion;
    }

    throw new Error("El empleado no posee una sesión");
  } catch (error) {
    throw new Error("Error al traer la sesión del empleado: " + error.message);
  }
};

const crearSesion = async (empleado_id, token) => {
  if (!empleado_id || !token) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    const sesionEmpleado = await traerSesion(empleado_id);

    if (!sesionEmpleado) {
      const sesion = await Sesiones.create(
        {
          empleado_id: empleado_id,
          token: token,
        },
        { transaction: t }
      );

      await t.commit();

      return sesion;
    } else {
      await Sesiones.update(
        {
          token: token,
          activo: true,
        },
        {
          where: {
            empleado_id: empleado_id,
          },
          transaction: t,
        }
      );

      await t.commit();

      return await traerSesion(empleado_id);
    }
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error("Error al crear la sesión del empleado: " + error.message);
  }
};

module.exports = {
  cerrarSesiones,
  traerSesion,
  crearSesion,
};
