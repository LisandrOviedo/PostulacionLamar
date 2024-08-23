const { conn, Sugerencias_Pred } = require("../db");

const todasLosSugerenciasPred = async (tipo_sugerencia_id) => {
  if (!tipo_sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sugerencias_pred = await Sugerencias_Pred.findAll({
      where: {
        tipo_sugerencia_id: tipo_sugerencia_id,
      },
    });

    return sugerencias_pred;
  } catch (error) {
    throw new Error(
      `Error al traer todas las sugerencias predeterminadas: ${error.message}`
    );
  }
};

const todasLosSugerenciasPredActivas = async (tipo_sugerencia_id) => {
  if (!tipo_sugerencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sugerencias_pred = await Sugerencias_Pred.findAll({
      where: { tipo_sugerencia_id: tipo_sugerencia_id, activo: true },
    });

    return sugerencias_pred;
  } catch (error) {
    throw new Error(
      `Error al traer todas las sugerencias predeterminadas: ${error.message}`
    );
  }
};

const traerSugerenciaPred = async (sugerencia_pred_id) => {
  if (!sugerencia_pred_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sugerencia_pred = await Sugerencias_Pred.findByPk(sugerencia_pred_id);

    if (!sugerencia_pred) {
      throw new Error(`No existe esa sugerencia predeterminada`);
    }

    return sugerencia_pred;
  } catch (error) {
    throw new Error(
      `Error al traer la sugerencia predeterminada: ${error.message}`
    );
  }
};

const crearSugerenciaPred = async (tipo_sugerencia_id, descripcion) => {
  if (!tipo_sugerencia_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [sugerencia_pred, created] = await Sugerencias_Pred.findOrCreate({
      where: {
        tipo_sugerencia_id: tipo_sugerencia_id,
        descripcion: descripcion,
      },
      defaults: {
        tipo_sugerencia_id: tipo_sugerencia_id,
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return sugerencia_pred;
    }

    throw new Error(
      `Ya existe una sugerencia predeterminada con esa descripción`
    );
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear la sugerencia predeterminada: ${error.message}`
    );
  }
};

const modificarSugerenciaPred = async (
  sugerencia_pred_id,
  tipo_sugerencia_id,
  descripcion
) => {
  if (!sugerencia_pred_id || !tipo_sugerencia_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerSugerenciaPred(sugerencia_pred_id);

    await Sugerencias_Pred.update(
      {
        tipo_sugerencia_id: tipo_sugerencia_id,
        descripcion: descripcion,
      },
      {
        where: {
          sugerencia_pred_id: sugerencia_pred_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerSugerenciaPred(sugerencia_pred_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar la sugerencia predeterminada: ${error.message}`
    );
  }
};

const inactivarSugerenciaPred = async (sugerencia_pred_id) => {
  if (!sugerencia_pred_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const sugerencia_pred = await traerSugerenciaPred(sugerencia_pred_id);

    await Sugerencias_Pred.update(
      { activo: !sugerencia_pred.activo },
      {
        where: { sugerencia_pred_id: sugerencia_pred_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerSugerenciaPred(sugerencia_pred_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar la sugerencia predeterminada: ${error.message}`
    );
  }
};

module.exports = {
  todasLosSugerenciasPred,
  todasLosSugerenciasPredActivas,
  traerSugerenciaPred,
  crearSugerenciaPred,
  modificarSugerenciaPred,
  inactivarSugerenciaPred,
};
