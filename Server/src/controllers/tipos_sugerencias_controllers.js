const { conn, Tipos_Sugerencias } = require("../db");

const todosLosTiposSugerencias = async () => {
  try {
    const tipos_sugerencias = await Tipos_Sugerencias.findAll();

    return tipos_sugerencias;
  } catch (error) {
    throw new Error(
      `Error al traer todos los tipos de sugerencias: ${error.message}`
    );
  }
};

const todosLosTiposSugerenciasActivas = async () => {
  try {
    const tipos_sugerencias = await Tipos_Sugerencias.findAll({
      where: { activo: true },
    });

    return tipos_sugerencias;
  } catch (error) {
    throw new Error(
      `Error al traer todos los tipos de sugerencias: ${error.message}`
    );
  }
};

const traerTipoSugerencia = async (tipo_sugerencia_id) => {
  if (!tipo_sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const tipo_sugerencia = await Tipos_Sugerencias.findByPk(
      tipo_sugerencia_id
    );

    if (!tipo_sugerencia) {
      throw new Error(`No existe ese tipo de sugerencia`);
    }

    return tipo_sugerencia;
  } catch (error) {
    throw new Error(`Error al traer el tipo de sugerencia: ${error.message}`);
  }
};

const crearTipoSugerencia = async (descripcion) => {
  if (!descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [tipo_sugerencia, created] = await Tipos_Sugerencias.findOrCreate({
      where: { descripcion: descripcion },
      defaults: {
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return tipo_sugerencia;
    }

    throw new Error(`Ya existe un tipo de sugerencia con esa descripción`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el tipo de sugerencia: ${error.message}`);
  }
};

const modificarTipoSugerencia = async (tipo_sugerencia_id, descripcion) => {
  if (!tipo_sugerencia_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerTipoSugerencia(tipo_sugerencia_id);

    await Tipos_Sugerencias.update(
      {
        descripcion: descripcion,
      },
      {
        where: {
          tipo_sugerencia_id: tipo_sugerencia_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTipoSugerencia(tipo_sugerencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el tipo de sugerencia: ${error.message}`
    );
  }
};

const inactivarTipoSugerencia = async (tipo_sugerencia_id) => {
  if (!tipo_sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const tipo_sugerencia = await traerTipoSugerencia(tipo_sugerencia_id);

    await Tipos_Sugerencias.update(
      { activo: !tipo_sugerencia.activo },
      {
        where: { tipo_sugerencia_id: tipo_sugerencia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTipoSugerencia(tipo_sugerencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar el tipo de sugerencia: ${error.message}`
    );
  }
};

module.exports = {
  todosLosTiposSugerencias,
  todosLosTiposSugerenciasActivas,
  traerTipoSugerencia,
  crearTipoSugerencia,
  modificarTipoSugerencia,
  inactivarTipoSugerencia,
};
