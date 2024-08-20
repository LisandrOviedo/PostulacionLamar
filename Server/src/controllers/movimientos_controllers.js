// const { Op } = require("sequelize");

const { conn, Movimientos, Empleados } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todosLosMovimientos = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataMovimientos } =
      await Movimientos.findAndCountAll({
        include: {
          all: true,
        },
        // [
        //   {
        //     model: Empleados,
        //     attributes: {
        //       exclude: ["createdAt", "updatedAt"],
        //     },
        //     include: [
        //       {
        //         model: Documentos_Empleados,
        //         attributes: ["tipo", "nombre"],
        //         where: { tipo: "perfil_pdf" },
        //       },
        //       {
        //         model: Titulos_Obtenidos,
        //         attributes: {
        //           exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
        //         },
        //       },
        //       {
        //         model: Experiencias,
        //         attributes: {
        //           exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
        //         },
        //       },
        //     ],
        //     where: filtros.cedula
        //       ? { cedula: { [Op.like]: `%${filtros.cedula}%` } }
        //       : filtros.apellidos
        //       ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
        //       : {},
        //   },
        //   {
        //     model: Areas_Interes,
        //     attributes: {
        //       exclude: ["activo", "createdAt", "updatedAt"],
        //     },
        //     through: {
        //       attributes: ["area_interes_curriculo_id"],
        //     },
        //     where: filtros.area_interes_id
        //       ? { area_interes_id: filtros.area_interes_id }
        //       : {},
        //   },
        //   {
        //     model: Idiomas,
        //     attributes: {
        //       exclude: ["activo", "createdAt", "updatedAt"],
        //     },
        //     through: {
        //       attributes: ["nivel"],
        //     },
        //     where: filtros.idioma_id ? { idioma_id: filtros.idioma_id } : {},
        //   },
        // ],
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleados, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "updatedAt"
            ? ["updatedAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const movimientos = dataMovimientos.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, movimientos };
  } catch (error) {
    throw new Error(`Error al traer todos los movimientos: ${error.message}`);
  }
};

const traerMovimiento = async (movimiento_id) => {
  if (!movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    return await Movimientos.findByPk(movimiento_id);
  } catch (error) {
    throw new Error(`Error al traer el movimiento: ${error.message}`);
  }
};

const crearMovimiento = async (
  tipo_movimiento_id,
  fecha_inicio,
  fecha_fin,
  empleado_id,
  cargo_nivel_id,
  tipo_nomina,
  frecuencia,
  descripcion,
  empleado_supervisor_id,
  empleado_solicitante_id,
  empleado_rrhh_id,
  empleado_aprueba_id,
  observaciones
) => {
  if (
    !tipo_movimiento_id ||
    !fecha_inicio ||
    !empleado_id ||
    !cargo_nivel_id ||
    !empleado_supervisor_id ||
    !empleado_solicitante_id ||
    !empleado_rrhh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  try {
    await traerEmpleado(empleado_id);

    t = await conn.transaction();

    const [crearMovimiento, created] = await Movimientos.findOrCreate({
      where: {
        fecha_inicio: fecha_inicio,
        empleado_id: empleado_id,
      },
      defaults: {
        tipo_movimiento_id: tipo_movimiento_id,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin || null,
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        tipo_nomina: tipo_nomina || null,
        frecuencia: frecuencia || null,
        descripcion: descripcion || null,
        empleado_supervisor_id: empleado_supervisor_id,
        empleado_solicitante_id: empleado_solicitante_id,
        empleado_rrhh_id: empleado_rrhh_id,
        empleado_aprueba_id: empleado_aprueba_id || null,
        observaciones: observaciones || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return await traerMovimiento(crearMovimiento.movimiento_id);
    }
  } catch (error) {
    throw new Error(`Error al traer el movimiento: ${error.message}`);
  }
};

const modificarMovimiento = async (
  movimiento_id,
  tipo_movimiento_id,
  fecha_inicio,
  fecha_fin,
  empleado_id,
  cargo_nivel_id,
  tipo_nomina,
  frecuencia,
  descripcion,
  empleado_supervisor_id,
  empleado_solicitante_id,
  empleado_rrhh_id,
  empleado_aprueba_id,
  observaciones
) => {
  if (
    !tipo_movimiento_id ||
    !fecha_inicio ||
    !empleado_id ||
    !cargo_nivel_id ||
    !empleado_supervisor_id ||
    !empleado_solicitante_id ||
    !empleado_rrhh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerMovimiento(movimiento_id);

    t = await conn.transaction();

    await Movimientos.update(
      {
        tipo_movimiento_id: tipo_movimiento_id,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin || null,
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        tipo_nomina: tipo_nomina || null,
        frecuencia: frecuencia || null,
        descripcion: descripcion || null,
        empleado_supervisor_id: empleado_supervisor_id,
        empleado_solicitante_id: empleado_solicitante_id,
        empleado_rrhh_id: empleado_rrhh_id,
        empleado_aprueba_id: empleado_aprueba_id || null,
        observaciones: observaciones || null,
      },
      {
        where: {
          movimiento_id: movimiento_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerMovimiento(movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el movimiento: ${error.message}`);
  }
};

const inactivarMovimiento = async (movimiento_id) => {
  if (!movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const movimiento = await traerMovimiento(movimiento_id);

    await Movimientos.update(
      { activo: !movimiento.activo },
      {
        where: { movimiento_id: movimiento_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerMovimiento(movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el movimiento: ${error.message}`);
  }
};

module.exports = {
  todosLosMovimientos,
  traerMovimiento,
  crearMovimiento,
  modificarMovimiento,
  inactivarMovimiento,
};
