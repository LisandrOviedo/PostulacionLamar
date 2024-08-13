const { conn, Experiencias } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todasLasExperiencias = async () => {
  try {
    const experiencias = await Experiencias.findAll();

    if (!experiencias.length) {
      throw new Error(`No existen experiencias`);
    }

    return experiencias;
  } catch (error) {
    throw new Error(`Error al traer todas las experiencias: ${error.message}`);
  }
};

const traerExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const experiencia = await Experiencias.findByPk(experiencia_id);

    if (!experiencia) {
      throw new Error(`No existe esa experiencia`);
    }

    return experiencia;
  } catch (error) {
    throw new Error(`Error al traer la experiencia: ${error.message}`);
  }
};

const crearExperiencia = async (empleado_id, experiencias) => {
  if (!empleado_id || !experiencias) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerEmpleado(empleado_id);

    await eliminarExperienciasEmpleado(empleado_id);

    for (const exp of experiencias) {
      t = await conn.transaction();

      const [experiencia, created] = await Experiencias.findOrCreate({
        where: {
          empleado_id: empleado_id,
          tipo: exp.tipo,
          empresa_centro_educativo: exp.empresa_centro_educativo,
          cargo_titulo: exp.cargo_titulo,
          fecha_desde: exp.fecha_desde,
          fecha_hasta: exp.fecha_hasta,
        },
        defaults: {
          empleado_id: empleado_id,
          tipo: exp.tipo,
          empresa_centro_educativo: exp.empresa_centro_educativo,
          cargo_titulo: exp.cargo_titulo,
          fecha_desde: exp.fecha_desde,
          fecha_hasta: exp.fecha_hasta,
        },
        transaction: t,
      });

      await t.commit();
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear las experiencias: ${error.message}`);
  }
};

const modificarExperiencia = async (
  experiencia_id,
  tipo,
  empresa_centro_educativo,
  cargo_titulo,
  fecha_desde,
  fecha_hasta,
  activo
) => {
  if (
    !experiencia_id ||
    !tipo ||
    !empresa_centro_educativo ||
    !cargo_titulo ||
    !fecha_desde ||
    !fecha_hasta ||
    !activo
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerExperiencia(experiencia_id);

    t = await conn.transaction();

    await Experiencias.update(
      {
        tipo: tipo,
        empresa_centro_educativo: empresa_centro_educativo,
        cargo_titulo: cargo_titulo,
        fecha_desde: fecha_desde,
        fecha_hasta: fecha_hasta,
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
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la experiencia: ${error.message}`);
  }
};

const inactivarExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const experiencia = await traerExperiencia(experiencia_id);

    t = await conn.transaction();

    await Experiencias.update(
      { activo: !experiencia.activo },
      {
        where: { experiencia_id: experiencia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerExperiencia(experiencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la experiencia: ${error.message}`);
  }
};

const eliminarExperienciasEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerEmpleado(empleado_id);

    t = await conn.transaction();

    await Experiencias.destroy({
      where: {
        empleado_id: empleado_id,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al eliminar las experiencias: ${error.message}`);
  }
};

module.exports = {
  todasLasExperiencias,
  traerExperiencia,
  crearExperiencia,
  modificarExperiencia,
  inactivarExperiencia,
};
