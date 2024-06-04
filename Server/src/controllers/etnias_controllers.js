const { conn, Etnia } = require("../db");

const { etnias } = require("../utils/etnias");

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

module.exports = {
  cargarEtnias,
};
