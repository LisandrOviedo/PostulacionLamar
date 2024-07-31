const { conn, Estados, Paises } = require("../db");

const { estados } = require("../utils/estados");

const todosLosEstados = async (pais_id) => {
  if (!pais_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const estados = await Estados.findAll({
      where: {
        pais_id: pais_id,
      },
    });

    if (!estados.length) {
      throw new Error(`No existen estados`);
    }

    return estados;
  } catch (error) {
    throw new Error(`Error al traer todos los estados: ${error.message}`);
  }
};

const todosLosEstadosActivos = async (pais_id) => {
  if (!pais_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const estados = await Estados.findAll({
      where: { pais_id: pais_id, activo: true },
    });

    if (!estados.length) {
      throw new Error(`No existen estados`);
    }

    return estados;
  } catch (error) {
    throw new Error(`Error al traer todos los estados: ${error.message}`);
  }
};

const traerEstado = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const estado = await Estados.findByPk(estado_id);

    if (!estado) {
      throw new Error(`No existe ese estado`);
    }

    return estado;
  } catch (error) {
    throw new Error(`Error al traer el estado: ${error.message}`);
  }
};

const cargarEstados = async () => {
  let t;

  try {
    for (const estado of estados) {
      const pais = await Paises.findOne({
        where: {
          nombre: estado.pais,
        },
      });

      if (pais) {
        for (const nombreEstado of estado.estados) {
          t = await conn.transaction();

          const [crearEstado, created] = await Estados.findOrCreate({
            where: { pais_id: pais.pais_id, nombre: nombreEstado },
            defaults: {
              pais_id: pais.pais_id,
              nombre: nombreEstado,
            },
            transaction: t,
          });

          await t.commit();
        }
      } else {
        throw new Error(`No existe el país ${estado.pais}`);
      }
    }
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear las estados: ${error.message}`);
  }
};

const crearEstado = async (pais_id, nombre) => {
  if (!pais_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [estado, created] = await Estados.findOrCreate({
      where: { pais_id: pais_id, nombre: nombre },
      defaults: {
        pais_id: pais_id,
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return estado;
    }

    throw new Error(`Ya existe un estado con ese nombre`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el estado: ${error.message}`);
  }
};

const modificarEstado = async (estado_id, pais_id, nombre) => {
  if (!estado_id || !pais_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEstado(estado_id);

    await Estados.update(
      {
        pais_id: pais_id,
        nombre: nombre,
      },
      {
        where: {
          estado_id: estado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEstado(estado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el estado: ${error.message}`);
  }
};

const inactivarEstado = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const estado = await traerEstado(estado_id);

    await Estados.update(
      { activo: !estado.activo },
      {
        where: { estado_id: estado_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEstado(estado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la estado: ${error.message}`);
  }
};

module.exports = {
  todosLosEstados,
  todosLosEstadosActivos,
  traerEstado,
  cargarEstados,
  crearEstado,
  modificarEstado,
  inactivarEstado,
};
