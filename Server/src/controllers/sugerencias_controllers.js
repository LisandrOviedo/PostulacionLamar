const { conn, Sugerencias } = require("../db");

const todasLasSugerencias = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataSugerencias } =
      await Sugerencias.findAndCountAll({
        include: { all: true },
        where: filtros.estado ? { estado: filtros.estado } : {},
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

const traerSugerencia = async (sugerencia_id, empleado_id) => {
  if (!sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const sugerencia = await Sugerencias.findByPk(sugerencia_id);

    if (!sugerencia) {
      throw new Error(`No existe esa sugerencia`);
    }

    if (empleado_id && sugerencia.revisado_por_id === null) {
      t = await conn.transaction();

      await Sugerencias.update(
        {
          revisado_por_id: empleado_id,
          fecha_revision: new Date(),
        },
        { transaction: t }
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
      },
      { transaction: t }
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
  traerSugerencia,
  crearSugerencia,
  inactivarSugerencia,
};
