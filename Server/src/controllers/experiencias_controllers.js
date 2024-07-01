const { conn, Experiencia } = require("../db");

const { traerCurriculo } = require("./curriculos_controllers");

const todasLasExperiencias = async () => {
  try {
    const experiencias = await Experiencia.findAll();

    if (!experiencias.length) {
      throw new Error(`No existen experiencias`);
    }

    return experiencias;
  } catch (error) {
    throw new Error(`Error al traer todas las experiencias:`, error.message);
  }
};

const traerExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const experiencia = await Experiencia.findByPk(experiencia_id);

    if (!experiencia) {
      throw new Error(`No existe esa experiencia`);
    }

    return experiencia;
  } catch (error) {
    throw new Error(`Error al traer la experiencia:`, error.message);
  }
};

const crearExperiencia = async (curriculo_id, experiencias) => {
  if (!curriculo_id || !experiencias) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerCurriculo(curriculo_id);

    t = await conn.transaction();

    for (const exp of experiencias) {
      const [experiencia, created] = await Experiencia.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          tipo: exp.tipo,
          cargo_titulo: exp.cargo_titulo,
          empresa_centro_educativo: exp.empresa_centro_educativo,
        },
        defaults: {
          curriculo_id: curriculo_id,
          tipo: exp.tipo,
          cargo_titulo: exp.cargo_titulo,
          duracion: exp.duracion,
          empresa_centro_educativo: exp.empresa_centro_educativo,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear las experiencias:`, error.message);
  }
};

const modificarExperiencia = async (
  experiencia_id,
  tipo,
  cargo_titulo_id,
  cargo_titulo_otro,
  duracion,
  empresa_centro_educativo,
  activo
) => {
  if (
    !experiencia_id ||
    !tipo ||
    !cargo_titulo_id ||
    !cargo_titulo_otro ||
    !duracion ||
    !empresa_centro_educativo ||
    !activo
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerExperiencia(experiencia_id);

    await Experiencia.update(
      {
        tipo: tipo,
        cargo_titulo_id: cargo_titulo_id,
        cargo_titulo_otro: cargo_titulo_otro,
        duracion: duracion,
        empresa_centro_educativo: empresa_centro_educativo,
        activo: activo,
      },
      {
        where: {
          experiencia_id: experiencia_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerExperiencia(experiencia_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la experiencia:`, error.message);
  }
};

const inactivarExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const experiencia = await traerExperiencia(experiencia_id);

    await Experiencia.update(
      { activo: !experiencia.activo },
      {
        where: { experiencia_id: experiencia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerExperiencia(experiencia_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la experiencia:`, error.message);
  }
};

const eliminarExperienciasCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCurriculo(curriculo_id);

    await Experiencia.destroy({
      where: {
        curriculo_id: curriculo_id,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al eliminar las experiencias:`, error.message);
  }
};

module.exports = {
  todasLasExperiencias,
  traerExperiencia,
  crearExperiencia,
  modificarExperiencia,
  inactivarExperiencia,
  eliminarExperienciasCurriculo,
};
