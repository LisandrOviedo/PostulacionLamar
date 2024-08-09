const { conn, Titulos_Obtenidos } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todosLosTitulosObtenidos = async (empleado_id) => {
  try {
    const titulos_obtenidos = await Titulos_Obtenidos.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!titulos_obtenidos.length) {
      throw new Error(`No existen títulos obtenidos`);
    }

    return titulos_obtenidos;
  } catch (error) {
    throw new Error(
      `Error al traer todos los títulos obtenidos: ${error.message}`
    );
  }
};

const traerTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const titulo_obtenido = await Titulos_Obtenidos.findByPk(
      titulo_obtenido_id
    );

    if (!titulo_obtenido) {
      throw new Error(`No existe ese título obtenido`);
    }

    return titulo_obtenido;
  } catch (error) {
    throw new Error(`Error al traer el título obtenido: ${error.message}`);
  }
};

const crearTitulosObtenidos = async (empleado_id, titulos_obtenidos) => {
  if (!empleado_id || !titulos_obtenidos) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    for (const titulo of titulos_obtenidos) {
      const [titulo_obtenido, created] = await Titulos_Obtenidos.findOrCreate({
        where: {
          empleado_id: empleado_id,
          nombre_instituto: titulo.nombre_instituto,
          titulo_obtenido: titulo.titulo_obtenido,
        },
        defaults: {
          empleado_id: empleado_id,
          grado_instruccion: titulo.grado_instruccion,
          fecha_desde: titulo.fecha_desde,
          fecha_hasta: titulo.fecha_hasta,
          nombre_instituto: titulo.nombre_instituto,
          titulo_obtenido: titulo.titulo_obtenido,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los títulos obtenidos: ${error.message}`);
  }
};

const modificarTitulosObtenidos = async (
  titulo_obtenido_id,
  grado_instruccion,
  fecha_desde,
  fecha_hasta,
  nombre_instituto,
  titulo_obtenido,
  activo
) => {
  if (
    !titulo_obtenido_id ||
    !grado_instruccion ||
    !fecha_desde ||
    !fecha_hasta ||
    !nombre_instituto ||
    !titulo_obtenido ||
    !activo
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerTituloObtenido(titulo_obtenido_id);

    await Titulos_Obtenidos.update(
      {
        grado_instruccion: grado_instruccion,
        fecha_desde: fecha_desde,
        fecha_hasta: fecha_hasta,
        nombre_instituto: nombre_instituto,
        titulo_obtenido: titulo_obtenido,
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
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el título obtenido: ${error.message}`);
  }
};

const inactivarTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const titulo_obtenido = await traerTituloObtenido(titulo_obtenido_id);

    await Titulos_Obtenidos.update(
      { activo: !titulo_obtenido.activo },
      {
        where: { titulo_obtenido_id: titulo_obtenido_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTituloObtenido(titulo_obtenido_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el título obtenido: ${error.message}`);
  }
};

const eliminarTitulosEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    await Titulos_Obtenidos.destroy({
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

    throw new Error(
      `Error al eliminar los títulos obtenidos: ${error.message}`
    );
  }
};

module.exports = {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
  eliminarTitulosEmpleado,
};
