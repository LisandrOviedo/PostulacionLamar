const { conn, Idioma, Idiomas_Curriculo } = require("../db");

const { traerCurriculo } = require("./curriculos_controllers");

const { idiomas } = require("../utils/idiomas");

const todosLosIdiomas = async () => {
  try {
    const idiomas = await Idioma.findAll({
      order: [["nombre", "ASC"]],
    });

    if (!idiomas.length) {
      throw new Error(`No existen idiomas`);
    }

    return idiomas;
  } catch (error) {
    throw new Error(`Error al traer todos los idiomas: ${error.message}`);
  }
};

const todosLosIdiomasActivos = async () => {
  try {
    const idiomas = await Idioma.findAll({
      where: { activo: true },
      order: [["nombre", "ASC"]],
    });

    if (!idiomas.length) {
      throw new Error(`No existen idiomas`);
    }

    return idiomas;
  } catch (error) {
    throw new Error(`Error al traer todos los idiomas: ${error.message}`);
  }
};

const traerIdioma = async (idioma_id) => {
  if (!idioma_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const idioma = await Idioma.findByPk(idioma_id);

    if (!idioma) {
      throw new Error(`No existe esa idioma`);
    }

    return idioma;
  } catch (error) {
    throw new Error(`Error al traer el idioma: ${error.message}`);
  }
};

const cargarIdiomas = async () => {
  let t;

  try {
    t = await conn.transaction();

    for (const idioma of idiomas) {
      const [crearIdioma, created] = await Idioma.findOrCreate({
        where: { nombre: idioma },
        defaults: {
          nombre: idioma,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los idiomas: ${error.message}`);
  }
};

const crearIdioma = async (nombre) => {
  if (!nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [idioma, created] = await Idioma.findOrCreate({
      where: {
        nombre: nombre,
      },
      defaults: {
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return area_interes;
    }

    throw new Error(`Ya existe un idioma con ese nombre`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el idioma: ${error.message}`);
  }
};

const modificarIdioma = async (idioma_id, nombre, activo) => {
  if (!idioma_id || !nombre || !activo) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerIdioma(idioma_id);

    await Idioma.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          idioma_id: idioma_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerIdioma(idioma_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el idioma: ${error.message}`);
  }
};

const inactivarIdioma = async (idioma_id) => {
  if (!idioma_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const idioma = await traerIdioma(idioma_id);

    await Idioma.update(
      { activo: !idioma.activo },
      {
        where: { idioma_id: idioma_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerIdioma(idioma_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el idioma: ${error.message}`);
  }
};

const agregarIdiomasCurriculo = async (curriculo_id, idiomas) => {
  if (!curriculo_id || !idiomas) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCurriculo(curriculo_id);

    for (const idioma of idiomas) {
      const [crearIdioma, created] = await Idiomas_Curriculo.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          idioma_id: idioma.idioma_id,
        },
        defaults: {
          curriculo_id: curriculo_id,
          idioma_id: idioma.idioma_id,
          nivel: idioma.nivel || idioma.Idiomas_Curriculo.nivel,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al agregar el idioma al curriculo: ${error.message}`);
  }
};

const eliminarIdiomasCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCurriculo(curriculo_id);

    await Idiomas_Curriculo.destroy({
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

    throw new Error(`Error al eliminar los idiomas: ${error.message}`);
  }
};

module.exports = {
  todosLosIdiomas,
  traerIdioma,
  todosLosIdiomasActivos,
  cargarIdiomas,
  crearIdioma,
  modificarIdioma,
  inactivarIdioma,
  agregarIdiomasCurriculo,
  eliminarIdiomasCurriculo,
};
