const { Op } = require("sequelize");

const { conn, Roles, Empleados } = require("../db");

const { roles } = require("../utils/roles");

const { traerEmpleado } = require("./empleados_controllers");

const { cerrarSesion } = require("./sesiones_controllers");

const todosLosRolesFiltrados = async (
  filtros,
  paginaActual,
  limitePorPagina
) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataRoles } =
      await Roles.findAndCountAll({
        where: filtros.nombre
          ? {
              nombre: {
                [Op.like]: `%${filtros.nombre}%`,
              },
            }
          : filtros.descripcion
          ? {
              descripcion: {
                [Op.like]: `%${filtros.descripcion}%`,
              },
            }
          : {},
        order: [
          filtros.orden_campo ? [filtros.orden_campo, filtros.orden_por] : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const roles = dataRoles.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, roles };
  } catch (error) {
    throw new Error(
      `Error al traer todos los roles filtrados: ${error.message}`
    );
  }
};

const todosLosRoles = async () => {
  try {
    const roles = await Roles.findAll({
      order: [["nombre", "ASC"]],
    });

    return roles;
  } catch (error) {
    throw new Error(`Error al traer todos los roles: ${error.message}`);
  }
};
const traerRol = async (rol_id) => {
  if (!rol_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const rol = await Roles.findByPk(rol_id);

    if (!rol) {
      throw new Error(`No existe ese rol`);
    }

    return rol;
  } catch (error) {
    throw new Error(`Error al traer el rol: ${error.message}`);
  }
};

const cargarRoles = async () => {
  let t;

  try {
    for (const rol of roles) {
      const rolExiste = await Roles.findOne({
        where: {
          nombre: rol.nombre,
        },
      });

      if (!rolExiste) {
        t = await conn.transaction();

        await Roles.create(
          {
            nombre: rol.nombre,
            descripcion: rol.descripcion,
            acceso_admin: rol.acceso_admin || false,
          },
          { transaction: t }
        );

        await t.commit();
      }
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los roles: ${error.message}`);
  }
};

const crearRol = async (nombre, descripcion, acceso_admin) => {
  if (!nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const buscarExistenciaRol = await Roles.findOne({
      where: {
        [Op.or]: [{ nombre: nombre }, { descripcion: descripcion }],
      },
    });

    if (buscarExistenciaRol) {
      throw new Error(`Ya existe un rol con ese nombre o descripción`);
    }

    t = await conn.transaction();

    const rol = await Roles.create(
      {
        nombre: nombre,
        descripcion: descripcion,
        acceso_admin: acceso_admin,
      },
      { transaction: t }
    );

    await t.commit();

    return rol;
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el rol: ${error.message}`);
  }
};

const modificarRol = async (rol_id, nombre, descripcion, acceso_admin) => {
  if (!rol_id || !nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const buscarExistenciaRol = await Roles.findOne({
      where: {
        [Op.or]: [{ nombre: nombre }, { descripcion: descripcion }],
        rol_id: { [Op.ne]: rol_id },
      },
    });

    if (buscarExistenciaRol) {
      throw new Error(`Ya existe un rol con ese nombre o descripción`);
    }

    await traerRol(rol_id);

    t = await conn.transaction();

    await Roles.update(
      {
        rol_id: rol_id,
        nombre: nombre,
        descripcion: descripcion,
        acceso_admin: acceso_admin,
      },
      {
        where: {
          rol_id: rol_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerRol(rol_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el rol: ${error.message}`);
  }
};

const inactivarRol = async (rol_id) => {
  if (!rol_id) {
    throw new Error(`Datos faltantes`);
  }
  let t;

  try {
    //transaction lo que significa que si algo sale mal, se puede deshacer.
    t = await conn.transaction(); //conn es un objeto que se utiliza para establecer una conexión con una base de datos

    const rol = await traerRol(rol_id);

    await Roles.update(
      { activo: !rol.activo },
      {
        where: { rol_id: rol_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerRol(rol_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el rol: ${error.message}`);
  }
};

const cambiarRolEmpleado = async (rol_id, empleado_id) => {
  if (!rol_id || !empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerRol(rol_id);

    await traerEmpleado(rol_id);

    t = await conn.transaction();

    await Empleados.update(
      { rol_id: rol_id }, //El primero es el nombre del campo y el segundo que dato recibo y quiero actualizar.
      {
        where: { empleado_id: empleado_id },
        transaction: t,
      }
    );

    await t.commit();

    await cerrarSesion(empleado_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al cambiar el rol del empleado: ${error.message}`);
  }
};

module.exports = {
  todosLosRolesFiltrados,
  todosLosRoles,
  traerRol,
  cargarRoles,
  crearRol,
  modificarRol,
  inactivarRol,
  cambiarRolEmpleado,
};
