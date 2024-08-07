const { conn, Parroquias } = require("../db");

const todasLasParroquias = async (municipio_id) => {
  if (!municipio_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const parroquias = await Parroquias.findAll({
      where: {
        municipio_id: municipio_id,
      },
    });

    if (!parroquias.length) {
      throw new Error(`No existen parroquias`);
    }

    return parroquias;
  } catch (error) {
    throw new Error(`Error al traer todas las parroquias: ${error.message}`);
  }
};

const todasLasParroquiasActivas = async (municipio_id) => {
  if (!municipio_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const parroquias = await Parroquias.findAll({
      where: { municipio_id: municipio_id, activo: true },
    });

    if (!parroquias.length) {
      throw new Error(`No existen parroquias`);
    }

    return parroquias;
  } catch (error) {
    throw new Error(`Error al traer todas las parroquias: ${error.message}`);
  }
};

const traerParroquia = async (parroquia_id) => {
  if (!parroquia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const parroquia = await Parroquias.findByPk(parroquia_id);

    if (!parroquia) {
      throw new Error(`No existe esa parroquia`);
    }

    return parroquia;
  } catch (error) {
    throw new Error(`Error al traer la parroquia: ${error.message}`);
  }
};

// const cargarParroquias = async () => {
//   let t;

//   try {
//     t = await conn.transaction();

//     for (const parroquia of parroquias) {
//       const [crearParroquia, created] = await Parroquias.findOrCreate({
//         where: { nombre: parroquia },
//         defaults: {
//           nombre: parroquia,
//         },
//         transaction: t,
//       });
//     }

//     await t.commit();
//   } catch (error) {
//     if (t && !t.finished) {
//       await t.rollback();
//     }

//     throw new Error(`Error al crear las parroquias: ${error.message}`);
//   }
// };

const crearParroquia = async (municipio_id, nombre) => {
  if (!municipio_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [parroquia, created] = await Parroquias.findOrCreate({
      where: { municipio_id: municipio_id, nombre: nombre },
      defaults: {
        municipio_id: municipio_id,
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return parroquia;
    }

    throw new Error(`Ya existe una parroquia con ese nombre`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la parroquia: ${error.message}`);
  }
};

const modificarParroquia = async (parroquia_id, municipio_id, nombre) => {
  if (!parroquia_id || !municipio_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerParroquia(parroquia_id);

    await Parroquias.update(
      {
        municipio_id: municipio_id,
        nombre: nombre,
      },
      {
        where: {
          parroquia_id: parroquia_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerParroquia(parroquia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la parroquia: ${error.message}`);
  }
};

const inactivarParroquia = async (parroquia_id) => {
  if (!parroquia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const parroquia = await traerParroquia(parroquia_id);

    await Parroquias.update(
      { activo: !parroquia.activo },
      {
        where: { parroquia_id: parroquia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerParroquia(parroquia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la parroquia: ${error.message}`);
  }
};

module.exports = {
  todasLasParroquias,
  todasLasParroquiasActivas,
  traerParroquia,
  crearParroquia,
  modificarParroquia,
  inactivarParroquia,
};
