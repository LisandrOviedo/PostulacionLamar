const { conn, Titulo_Obtenido } = require("../db");

const { fechaHoraActual } = require("../utils/formatearFecha");

const { traerCurriculo } = require("./curriculos_controllers");

const todosLosTitulosObtenidos = async () => {
  try {
    const titulos_obtenidos = await Titulo_Obtenido.findAll();

    if (!titulos_obtenidos.length) {
      throw new Error(`${fechaHoraActual()} - No existen títulos obtenidos`);
    }

    return titulos_obtenidos;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer todos los títulos obtenidos:`,
      error.message
    );
  }
};

const traerTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const titulo_obtenido = await Titulo_Obtenido.findByPk(titulo_obtenido_id);

    if (!titulo_obtenido) {
      throw new Error(`${fechaHoraActual()} - No existe ese título obtenido`);
    }

    return titulo_obtenido;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer el título obtenido:`,
      error.message
    );
  }
};

const crearTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  if (!curriculo_id || !titulos_obtenidos) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCurriculo(curriculo_id);

    for (const titulo of titulos_obtenidos) {
      const [titulo_obtenido, created] = await Titulo_Obtenido.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          nombre: titulo.nombre,
        },
        defaults: {
          curriculo_id: curriculo_id,
          nombre: titulo.nombre,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear los títulos obtenidos:`,
      error.message
    );
  }
};

const modificarTitulosObtenidos = async (
  titulo_obtenido_id,
  nombre,
  activo
) => {
  if (!titulo_obtenido_id || !nombre || !activo) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerTituloObtenido(titulo_obtenido_id);

    await Titulo_Obtenido.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          titulo_obtenido_id: titulo_obtenido_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTituloObtenido(titulo_obtenido_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el título obtenido:`,
      error.message
    );
  }
};

const inactivarTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const titulo_obtenido = await traerTituloObtenido(titulo_obtenido_id);

    await Titulo_Obtenido.update(
      { activo: !titulo_obtenido.activo },
      {
        where: { titulo_obtenido_id: titulo_obtenido_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTituloObtenido(titulo_obtenido_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al inactivar el título obtenido:`,
      error.message
    );
  }
};

const eliminarTitulosCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCurriculo(curriculo_id);

    await Titulo_Obtenido.destroy({
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

    throw new Error(
      `${fechaHoraActual()} - Error al eliminar los títulos obtenidos:`,
      error.message
    );
  }
};

module.exports = {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
  eliminarTitulosCurriculo,
};
