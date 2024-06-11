const { conn, Etnia } = require("../db");

const { etnias } = require("../utils/etnias");

const todasLasEtnias = async () => {
  try {
    const etnias = await Etnia.findAll();

    if (!etnias.length) {
      throw new Error("No existen etnias");
    }

    return etnias;
  } catch (error) {
    throw new Error("Error al traer todas las etnias: " + error.message);
  }
};

const todasLasEtniasActivas = async () => {
  try {
    const etnias = await Etnia.findAll({
      where: { activo: true },
    });

    if (!etnias.length) {
      throw new Error("No existen etnias");
    }

    return etnias;
  } catch (error) {
    throw new Error("Error al traer todas las etnias: " + error.message);
  }
};

const traerEtnia = async (etnia_id) => {
  if (!etnia_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const etnia = await Etnia.findByPk(etnia_id);

    if (!etnia) {
      throw new Error("No existe esa etnia");
    }

    return etnia;
  } catch (error) {
    throw new Error("Error al traer la etnia: " + error.message);
  }
};

const cargarEtnias = async () => {
  let t;

  try {
    t = await conn.transaction();

    for (const etnia of etnias) {
      const [crearEtnia, created] = await Etnia.findOrCreate({
        where: { nombre: etnia },
        defaults: {
          nombre: etnia,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error("Error al crear las etnias: " + error.message);
  }
};

const crearEtnia = async (nombre) => {
  if (!nombre) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    const [etnia, created] = await Etnia.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return etnia;
    }

    throw new Error("Ya existe una etnia con ese nombre");
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error("Error al crear la etnia: " + error.message);
  }
};

const modificarEtnia = async (etnia_id, nombre, activo) => {
  if (!etnia_id || !nombre || !activo) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEtnia(etnia_id);

    await Etnia.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          etnia_id: etnia_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEtnia(etnia_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error("Error al modificar la etnia: " + error.message);
  }
};

const inactivarEtnia = async (etnia_id) => {
  if (!etnia_id) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    const etnia = await traerEtnia(etnia_id);

    await Etnia.update(
      { activo: !etnia.activo },
      {
        where: { etnia_id: etnia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEtnia(etnia_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error("Error al inactivar la etnia: " + error.message);
  }
};

module.exports = {
  todasLasEtnias,
  todasLasEtniasActivas,
  traerEtnia,
  cargarEtnias,
  crearEtnia,
  modificarEtnia,
  inactivarEtnia,
};
