const { Op } = require("sequelize");

const { conn, Pruebas_Empleados, Empleados } = require("../db");

const todasLasPruebas = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  const filtros_prueba = {};

  if (filtros.prueba) {
    filtros_prueba.prueba = filtros.prueba;
  }

  if (filtros.fecha_desde && filtros.fecha_hasta) {
    filtros_prueba.createdAt = {
      [Op.between]: [filtros.fecha_desde, filtros.fecha_hasta],
    };
  } else if (filtros.fecha_desde) {
    filtros_prueba.createdAt = {
      [Op.gte]: filtros.fecha_desde,
    };
  } else if (filtros.fecha_hasta) {
    filtros_prueba.createdAt = {
      [Op.lte]: filtros.fecha_hasta,
    };
  }

  try {
    const { count: totalRegistros, rows: dataPruebasEmpleados } =
      await Pruebas_Empleados.findAndCountAll({
        attributes: ["prueba_id", "prueba", "nombre", "createdAt"],
        include: [
          {
            model: Empleados,
            attributes: [
              "empleado_id",
              "tipo_identificacion",
              "numero_identificacion",
              "nombres",
              "apellidos",
              "telefono",
              "correo",
            ],
            where: {
              empresa_id: filtros.empresa_id,
              [Op.and]: [
                filtros.numero_identificacion
                  ? {
                      numero_identificacion: {
                        [Op.like]: `%${filtros.numero_identificacion}%`,
                      },
                    }
                  : filtros.apellidos
                  ? {
                      apellidos: { [Op.like]: `%${filtros.apellidos}%` },
                    }
                  : {},
              ],
            },
          },
        ],
        where: filtros_prueba,
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleados, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "prueba"
            ? ["prueba", filtros.orden_por]
            : filtros.orden_campo === "createdAt"
            ? ["createdAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const pruebasEmpleados = dataPruebasEmpleados.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, pruebasEmpleados };
  } catch (error) {
    throw new Error(`Error al traer todas las pruebas: ${error.message}`);
  }
};

const traerPruebasEmpleados = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const pruebas = await Pruebas_Empleados.findAll({
      where: {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      order: [["createdAt", "DESC"]],
    });

    return pruebas;
  } catch (error) {
    throw new Error(
      `Error al traer todas las pruebas de ese empleado: ${error.message}`
    );
  }
};

const traerPrueba = async (prueba_id) => {
  if (!prueba_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const prueba = await Pruebas_Empleados.findByPk(prueba_id);

    if (!prueba) {
      throw new Error(`No existe esa prueba`);
    }

    return prueba;
  } catch (error) {
    throw new Error(`Error al traer la prueba: ${error.message}`);
  }
};

const crearPrueba = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const crearPrueba = await Pruebas_Empleados.create(
      {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      { transaction: t }
    );

    await t.commit();

    return crearPrueba;
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la prueba: ${error.message}`);
  }
};

module.exports = {
  todasLasPruebas,
  traerPruebasEmpleados,
  traerPrueba,
  crearPrueba,
};
