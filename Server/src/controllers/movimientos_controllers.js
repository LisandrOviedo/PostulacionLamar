// const { Op } = require("sequelize");

const { conn, Movimientos, Empleados, Cargos_Empleados } = require("../db");

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
  empleado_id,
  clase_movimiento_id,
  duracion_movimiento,
  duracion_movimiento_dias,
  requiere_periodo_prueba,
  duracion_periodo_prueba,
  justificacion_movimiento,
  empresa_id,
  cargo_nivel_id,
  vigencia_movimiento_desde,
  vigencia_movimiento_hasta,
  tipo_nomina,
  otro_tipo_nomina,
  frecuencia_nomina,
  otra_frecuencia_nomina,
  sueldo,
  codigo_nomina,
  solicitante_id,
  supervisor_id,
  gerencia_id,
  tthh_id
) => {
  if (
    !empleado_id ||
    !clase_movimiento_id ||
    !duracion_movimiento ||
    !empresa_id ||
    !cargo_nivel_id ||
    !vigencia_movimiento_desde ||
    !tipo_nomina ||
    !frecuencia_nomina ||
    !sueldo ||
    !solicitante_id ||
    !supervisor_id ||
    !gerencia_id ||
    !tthh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerEmpleado(empleado_id);

    const existeMovimiento = await Movimientos.findOne({
      where: {
        empleado_id: empleado_id,
        vigencia_movimiento_desde: vigencia_movimiento_desde,
        activo: true,
      },
    });

    if (!existeMovimiento) {
      t = await conn.transaction();

      const crearMovimiento = await Movimientos.create(
        {
          empleado_id: empleado_id,
          clase_movimiento_id: clase_movimiento_id,
          duracion_movimiento: duracion_movimiento,
          duracion_movimiento_dias:
            duracion_movimiento === "Temporal"
              ? duracion_movimiento_dias
              : null,
          requiere_periodo_prueba: requiere_periodo_prueba,
          duracion_periodo_prueba: requiere_periodo_prueba
            ? duracion_periodo_prueba
            : null,
          justificacion_movimiento: justificacion_movimiento || null,
          cargo_nivel_id: cargo_nivel_id,
          vigencia_movimiento_desde: vigencia_movimiento_desde,
          vigencia_movimiento_hasta: vigencia_movimiento_hasta || null,
          tipo_nomina: tipo_nomina,
          otro_tipo_nomina: tipo_nomina === "Otro" ? otro_tipo_nomina : null,
          frecuencia_nomina: frecuencia_nomina,
          otra_frecuencia_nomina:
            frecuencia_nomina === "Otro" ? otra_frecuencia_nomina : null,
          sueldo: sueldo,
          codigo_nomina: codigo_nomina || null,
          solicitante_id: solicitante_id,
          supervisor_id: supervisor_id,
          gerencia_id: gerencia_id,
          tthh_id: tthh_id,
        },
        { transaction: t }
      );

      // await Cargos_Empleados.update(
      //   {
      //     activo: false,
      //   },
      //   {
      //     where: {
      //       empleado_id: empleado_id,
      //       activo: true,
      //     },
      //     transaction: t,
      //   }
      // );

      // await Cargos_Empleados.create(
      //   {
      //     empleado_id: empleado_id,
      //     cargo_nivel_id: cargo_nivel_id,
      //     salario: sueldo,
      //     fecha_ingreso: vigencia_movimiento_desde,
      //   },
      //   { transaction: t }
      // );

      // await Empleados.update(
      //   {
      //     empresa_id: empresa_id,
      //   },
      //   {
      //     where: {
      //       empleado_id: empleado_id,
      //     },
      //     transaction: t,
      //   }
      // );

      await t.commit();

      return await traerMovimiento(crearMovimiento.movimiento_id);
    } else {
      throw new Error(
        `Ese empleado posee un movimiento activo con esa fecha de inicio de vigencia`
      );
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el movimiento: ${error.message}`);
  }
};

const modificarMovimiento = async (
  movimiento_id,
  clase_movimiento_id,
  duracion_movimiento,
  duracion_movimiento_dias,
  requiere_periodo_prueba,
  duracion_periodo_prueba,
  justificacion_movimiento,
  empresa_id,
  cargo_nivel_id,
  vigencia_movimiento_desde,
  vigencia_movimiento_hasta,
  tipo_nomina,
  otro_tipo_nomina,
  frecuencia_nomina,
  otra_frecuencia_nomina,
  sueldo,
  codigo_nomina,
  solicitante_id,
  supervisor_id,
  gerencia_id,
  tthh_id
) => {
  if (
    !movimiento_id ||
    !clase_movimiento_id ||
    !duracion_movimiento ||
    !empresa_id ||
    !cargo_nivel_id ||
    !vigencia_movimiento_desde ||
    !tipo_nomina ||
    !frecuencia_nomina ||
    !sueldo ||
    !solicitante_id ||
    !supervisor_id ||
    !gerencia_id ||
    !tthh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerMovimiento(movimiento_id);

    t = await conn.transaction();

    await Movimientos.update(
      {
        clase_movimiento_id: clase_movimiento_id,
        duracion_movimiento: duracion_movimiento,
        duracion_movimiento_dias:
          duracion_movimiento === "Temporal" ? duracion_movimiento_dias : null,
        requiere_periodo_prueba: requiere_periodo_prueba,
        duracion_periodo_prueba: requiere_periodo_prueba
          ? duracion_periodo_prueba
          : null,
        justificacion_movimiento: justificacion_movimiento || null,
        cargo_nivel_id: cargo_nivel_id,
        vigencia_movimiento_desde: vigencia_movimiento_desde,
        vigencia_movimiento_hasta: vigencia_movimiento_hasta || null,
        tipo_nomina: tipo_nomina,
        otro_tipo_nomina: tipo_nomina === "Otro" ? otro_tipo_nomina : null,
        frecuencia_nomina: frecuencia_nomina,
        otra_frecuencia_nomina:
          frecuencia_nomina === "Otro" ? otra_frecuencia_nomina : null,
        sueldo: sueldo,
        codigo_nomina: codigo_nomina || null,
        solicitante_id: solicitante_id,
        supervisor_id: supervisor_id,
        gerencia_id: gerencia_id,
        tthh_id: tthh_id,
      },
      {
        where: {
          movimiento_id: movimiento_id,
        },
        transaction: t,
      }
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
        transaction: t,
      }
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
