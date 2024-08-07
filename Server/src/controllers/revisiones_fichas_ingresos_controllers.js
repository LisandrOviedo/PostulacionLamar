const { conn, Revisiones_Fichas_Ingresos } = require("../db");

const todasLasRevisionesFichasIngresos = async () => {
  try {
    const revision_ficha_ingreso = await Revisiones_Fichas_Ingresos.findAll();

    if (!revision_ficha_ingreso.length) {
      throw new Error(`No existen revisiones de fichas de ingresos`);
    }

    return revision_ficha_ingreso;
  } catch (error) {
    throw new Error(
      `Error al traer todas las revisiones de fichas de ingresos: ${error.message}`
    );
  }
};

const todasLasRevisionesFichasIngresosActivas = async () => {
  try {
    const revision_ficha_ingreso = await Revisiones_Fichas_Ingresos.findAll({
      where: { activo: true },
    });

    if (!revision_ficha_ingreso.length) {
      throw new Error(`No existen revisiones de fichas de ingresos`);
    }

    return revision_ficha_ingreso;
  } catch (error) {
    throw new Error(
      `Error al traer todas las revisiones de fichas de ingresos: ${error.message}`
    );
  }
};

const traerRevisionFichaIngreso = async (revision_ficha_ingreso_id) => {
  if (!revision_ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const revision_ficha_ingreso = await Revisiones_Fichas_Ingresos.findByPk(
      revision_ficha_ingreso_id
    );

    if (!revision_ficha_ingreso) {
      throw new Error(`No existe esa revisión de ficha de ingreso`);
    }

    return revision_ficha_ingreso;
  } catch (error) {
    throw new Error(
      `Error al traer la revisión de ficha de ingreso: ${error.message}`
    );
  }
};

const crearRevisionFichaIngreso = async (codigo, fecha, numero) => {
  if (!codigo || !fecha || !numero) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [revision_ficha_ingreso, created] =
      await Revisiones_Fichas_Ingresos.findOrCreate({
        where: { codigo: codigo, fecha: fecha, numero: numero },
        defaults: {
          codigo: codigo,
          fecha: fecha,
          numero: numero,
        },
        transaction: t,
      });

    await t.commit();

    if (created) {
      return revision_ficha_ingreso;
    }

    throw new Error(
      `Ya existe una revisión de ficha de ingreso con ese nombre`
    );
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear la revisión de ficha de ingreso: ${error.message}`
    );
  }
};

const modificarRevisionFichaIngreso = async (
  revision_ficha_ingreso_id,
  codigo,
  fecha,
  numero
) => {
  if (!revision_ficha_ingreso_id || !codigo || !fecha || !numero) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerRevisionFichaIngreso(revision_ficha_ingreso_id);

    await Revisiones_Fichas_Ingresos.update(
      {
        codigo: codigo,
        fecha: fecha,
        numero: numero,
      },
      {
        where: {
          revision_ficha_ingreso_id: revision_ficha_ingreso_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRevisionFichaIngreso(revision_ficha_ingreso_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar la revisión de ficha de ingreso: ${error.message}`
    );
  }
};

const inactivarRevisionFichaIngreso = async (revision_ficha_ingreso_id) => {
  if (!revision_ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const revision_ficha_ingreso = await traerRevisionFichaIngreso(
      revision_ficha_ingreso_id
    );

    await Revisiones_Fichas_Ingresos.update(
      { activo: !revision_ficha_ingreso.activo },
      {
        where: { revision_ficha_ingreso_id: revision_ficha_ingreso_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRevisionFichaIngreso(revision_ficha_ingreso_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar la revisión de ficha de ingreso: ${error.message}`
    );
  }
};

module.exports = {
  todasLasRevisionesFichasIngresos,
  todasLasRevisionesFichasIngresosActivas,
  traerRevisionFichaIngreso,
  crearRevisionFichaIngreso,
  modificarRevisionFichaIngreso,
  inactivarRevisionFichaIngreso,
};
