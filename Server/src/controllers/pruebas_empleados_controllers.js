const { Op } = require("sequelize");

const { conn, Pruebas_Empleado, Empleado } = require("../db");

const { fechaHoraActual } = require("../utils/formatearFecha");

const todasLasPruebas = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataPruebasEmpleados } =
      await Pruebas_Empleado.findAndCountAll({
        attributes: ["prueba_id", "prueba", "nombre", "createdAt"],
        include: [
          {
            model: Empleado,
            attributes: [
              "empleado_id",
              "cedula",
              "nombres",
              "apellidos",
              "telefono",
              "correo",
            ],
            where: filtros.cedula
              ? { cedula: { [Op.like]: `%${filtros.cedula}%` } }
              : filtros.apellidos
              ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
              : {},
          },
        ],
        where: filtros.prueba ? { prueba: filtros.prueba } : {},
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleado, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "prueba"
            ? ["prueba", filtros.orden_por]
            : filtros.orden_campo === "createdAt"
            ? ["createdAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const pruebas_empleados = dataPruebasEmpleados.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, pruebas_empleados };
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer todas las pruebas:`,
      error.message
    );
  }
};

const traerPruebasEmpleados = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const pruebas = await Pruebas_Empleado.findAll({
      where: {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      order: [["createdAt", "DESC"]],
    });

    return pruebas;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer todas las pruebas de ese empleado:`,
      error.message
    );
  }
};

const traerPrueba = async (prueba_id) => {
  if (!prueba_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const prueba = await Pruebas_Empleado.findByPk(prueba_id);

    if (!prueba) {
      throw new Error(`${fechaHoraActual()} - No existe esa prueba`);
    }

    return prueba;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer la prueba:`,
      error.message
    );
  }
};

const crearPrueba = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const crearPrueba = await Pruebas_Empleado.create(
      {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      { transaction: t }
    );

    await t.commit();

    return crearPrueba;
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear la prueba:`,
      error.message
    );
  }
};

module.exports = {
  todasLasPruebas,
  traerPruebasEmpleados,
  traerPrueba,
  crearPrueba,
};
