const { Op } = require("sequelize");

const {
  conn,
  Sugerencias,
  Tipos_Sugerencias,
  Empleados,
  Sedes,
  Empresas,
} = require("../db");

const todasLasSugerencias = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataSugerencias } =
      await Sugerencias.findAndCountAll({
        attributes: {
          exclude: ["sede_id", "tipo_sugerencia_id"],
        },
        where:
          filtros.estado && filtros.estado === "Pendiente por revisar"
            ? { revisado_por_id: null }
            : filtros.estado && filtros.estado === "Revisado"
            ? {
                revisado_por_id: {
                  [Op.not]: null,
                },
              }
            : {},
        include: [
          {
            model: Tipos_Sugerencias,
            where:
              filtros.tipo_sugerencia_id &&
              filtros.tipo_sugerencia_id !== "Seleccione"
                ? { tipo_sugerencia_id: filtros.tipo_sugerencia_id }
                : {},
          },
          {
            model: Empleados,
            attributes: [
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
          },
          {
            model: Sedes,
            attributes: ["sede_id", "nombre"],
            where:
              filtros.sede_id && filtros.sede_id !== "Seleccione"
                ? { sede_id: filtros.sede_id }
                : {},
            include: {
              model: Empresas,
              attributes: ["empresa_id", "nombre"],
              where:
                filtros.empresa_id && filtros.empresa_id !== "Seleccione"
                  ? { empresa_id: filtros.empresa_id }
                  : {},
            },
          },
        ],
        order: [
          filtros.orden_campo === "nombre_empresa"
            ? [Sedes, Empresas, "nombre", filtros.orden_por]
            : null,
        ].filter(Boolean),
        distinct: true,
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const sugerencias = dataSugerencias.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, sugerencias };
  } catch (error) {
    throw new Error(`Error al traer todas las sugerencias: ${error.message}`);
  }
};

const todasLasSugerenciasActivas = async () => {
  try {
    const sugerencias = await Sugerencias.findAll({
      where: { activo: true },
    });

    if (!sugerencias.length) {
      throw new Error(`No existen sugerencias`);
    }

    return sugerencias;
  } catch (error) {
    throw new Error(`Error al traer todas las sugerencias: ${error.message}`);
  }
};

const todasLasSugerenciasActivasNoRevisadas = async () => {
  try {
    const { count: totalRegistros, rows: dataSugerencias } =
      await Sugerencias.findAndCountAll({
        where: { revisado_por_id: null, activo: true },
      });

    return totalRegistros;
  } catch (error) {
    throw new Error(`Error al traer todas las sugerencias: ${error.message}`);
  }
};

const traerSugerencia = async (sugerencia_id, empleado_id) => {
  if (!sugerencia_id || !empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const sugerencia = await Sugerencias.findByPk(sugerencia_id, {
      include: [
        {
          model: Tipos_Sugerencias,
        },
        {
          model: Empleados,
          attributes: [
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
        },
        {
          model: Sedes,
          attributes: ["sede_id", "nombre"],
          include: {
            model: Empresas,
            attributes: ["empresa_id", "nombre"],
          },
        },
      ],
    });

    if (!sugerencia) {
      throw new Error(`No existe esa sugerencia`);
    }

    if (!sugerencia.revisado_por_id) {
      t = await conn.transaction();

      await Sugerencias.update(
        {
          revisado_por_id: empleado_id,
          fecha_revision: new Date(),
        },
        {
          where: {
            sugerencia_id: sugerencia_id,
          },
          transaction: t,
        }
      );

      await t.commit();
    }

    return sugerencia;
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al traer la sugerencia: ${error.message}`);
  }
};

const crearSugerencia = async (sede_id, tipo_sugerencia_id, descripcion) => {
  if (!sede_id || !tipo_sugerencia_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const sugerencia = await Sugerencias.create(
      {
        sede_id: sede_id,
        tipo_sugerencia_id: tipo_sugerencia_id,
        descripcion: descripcion,
      },
      { transaction: t }
    );

    await t.commit();

    return sugerencia;
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la sugerencia: ${error.message}`);
  }
};

const inactivarSugerencia = async (sugerencia_id) => {
  if (!sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const sugerencia = await traerSugerencia(sugerencia_id);

    await Sugerencias.update(
      { activo: !sugerencia.activo },
      {
        where: { sugerencia_id: sugerencia_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSugerencia(sugerencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la sugerencia: ${error.message}`);
  }
};

module.exports = {
  todasLasSugerencias,
  todasLasSugerenciasActivas,
  todasLasSugerenciasActivasNoRevisadas,
  traerSugerencia,
  crearSugerencia,
  inactivarSugerencia,
};
