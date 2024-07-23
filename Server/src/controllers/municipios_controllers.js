const { conn, Municipios } = require("../db");

const todosLosMunicipios = async (ciudad_id) => {
  if (!ciudad_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const municipios = await Municipios.findAll({
      where: {
        ciudad_id: ciudad_id,
      },
    });

    if (!municipios.length) {
      throw new Error(`No existen municipios`);
    }

    return municipios;
  } catch (error) {
    throw new Error(`Error al traer todos los municipios: ${error.message}`);
  }
};

const todosLosMunicipiosActivos = async (ciudad_id) => {
  if (!ciudad_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const municipios = await Municipios.findAll({
      where: { ciudad_id: ciudad_id, activo: true },
    });

    if (!municipios.length) {
      throw new Error(`No existen municipios`);
    }

    return municipios;
  } catch (error) {
    throw new Error(`Error al traer todos los municipios: ${error.message}`);
  }
};

const traerMunicipio = async (municipio_id) => {
  if (!municipio_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const municipio = await Municipios.findByPk(municipio_id);

    if (!municipio) {
      throw new Error(`No existe ese municipio`);
    }

    return municipio;
  } catch (error) {
    throw new Error(`Error al traer el municipio: ${error.message}`);
  }
};

// const cargarMunicipios = async () => {
//   let t;

//   try {
//     t = await conn.transaction();

//     for (const municipio of municipios) {
//       const [crearMunicipio, created] = await Municipios.findOrCreate({
//         where: { nombre: municipio },
//         defaults: {
//           nombre: municipio,
//         },
//         transaction: t,
//       });
//     }

//     await t.commit();
//   } catch (error) {
//     if (!t.finished) {
//       await t.rollback();
//     }

//     throw new Error(`Error al crear las municipios: ${error.message}`);
//   }
// };

const crearMunicipio = async (municipio_id, nombre) => {
  if (!municipio_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [municipio, created] = await Municipios.findOrCreate({
      where: { municipio_id: municipio_id, nombre: nombre },
      defaults: {
        municipio_id: municipio_id,
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return municipio;
    }

    throw new Error(`Ya existe un municipio con ese nombre`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el municipio: ${error.message}`);
  }
};

const modificarMunicipio = async (municipio_id, ciudad_id, nombre) => {
  if (!municipio_id || !ciudad_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerMunicipio(municipio_id);

    await Municipios.update(
      {
        ciudad_id: ciudad_id,
        nombre: nombre,
      },
      {
        where: {
          municipio_id: municipio_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerMunicipio(municipio_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el municipio: ${error.message}`);
  }
};

const inactivarMunicipio = async (municipio_id) => {
  if (!municipio_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const municipio = await traerMunicipio(municipio_id);

    await Municipios.update(
      { activo: !municipio.activo },
      {
        where: { municipio_id: municipio_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerMunicipio(municipio_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la municipio: ${error.message}`);
  }
};

module.exports = {
  todosLosMunicipios,
  todosLosMunicipiosActivos,
  traerMunicipio,
  crearMunicipio,
  modificarMunicipio,
  inactivarMunicipio,
};
