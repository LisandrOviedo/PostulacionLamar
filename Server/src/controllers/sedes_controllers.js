const { conn, Sedes } = require("../db");

const todasLasSedes = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sedes = await Sedes.findAll({
      where: {
        empresa_id: empresa_id,
      },
      order: [["nombre", "ASC"]],
    });

    return sedes;
  } catch (error) {
    throw new Error(`Error al traer todas las sedes: ${error.message}`);
  }
};

const todasLasSedesActivas = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sedes = await Sedes.findAll({
      where: { empresa_id: empresa_id, activo: true },
      order: [["nombre", "ASC"]],
    });

    return sedes;
  } catch (error) {
    throw new Error(`Error al traer todas las sedes: ${error.message}`);
  }
};

const traerSede = async (sede_id) => {
  if (!sede_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sede = await Sedes.findByPk(sede_id);

    if (!sede) {
      throw new Error(`No existe esa sede`);
    }

    return sede;
  } catch (error) {
    throw new Error(`Error al traer la sede: ${error.message}`);
  }
};

const crearSede = async (
  empresa_id,
  nombre,
  tipo,
  direccion,
  latitud,
  longitud
) => {
  if (!empresa_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [sede, created] = await Sedes.findOrCreate({
      where: { empresa_id: empresa_id, nombre: nombre },
      defaults: {
        empresa_id: empresa_id,
        nombre: nombre,
        tipo: tipo || null,
        direccion: direccion || null,
        latitud: latitud || null,
        longitud: longitud || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return sede;
    }

    throw new Error(`Ya existe una sede con ese nombre en esa empresa`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la sede: ${error.message}`);
  }
};

const modificarSede = async (
  sede_id,
  empresa_id,
  nombre,
  tipo,
  direccion,
  latitud,
  longitud
) => {
  if (!sede_id || !empresa_id || !nombre || !tipo || !direccion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerSede(sede_id);

    await Sedes.update(
      {
        empresa_id: empresa_id,
        nombre: nombre,
        tipo: tipo,
        direccion: direccion,
        latitud: latitud || null,
        longitud: longitud || null,
      },
      {
        where: {
          sede_id: sede_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSede(sede_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la sede: ${error.message}`);
  }
};

const inactivarSede = async (sede_id) => {
  if (!sede_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const sede = await traerSede(sede_id);

    await Sedes.update(
      { activo: !sede.activo },
      {
        where: { sede_id: sede_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSede(sede_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la sede: ${error.message}`);
  }
};

module.exports = {
  todasLasSedes,
  todasLasSedesActivas,
  traerSede,
  crearSede,
  modificarSede,
  inactivarSede,
};
