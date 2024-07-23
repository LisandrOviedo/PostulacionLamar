const { conn, Ciudades } = require("../db");

const todasLasCiudades = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ciudades = await Ciudades.findAll({
      where: {
        estado_id: estado_id,
      },
    });

    if (!ciudades.length) {
      throw new Error(`No existen ciudades`);
    }

    return ciudades;
  } catch (error) {
    throw new Error(`Error al traer todas las ciudades: ${error.message}`);
  }
};

const todasLasCiudadesActivas = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ciudades = await Ciudades.findAll({
      where: { estado_id: estado_id, activo: true },
    });

    if (!ciudades.length) {
      throw new Error(`No existen ciudades`);
    }

    return ciudades;
  } catch (error) {
    throw new Error(`Error al traer todas las ciudades: ${error.message}`);
  }
};

const traerCiudad = async (ciudad_id) => {
  if (!ciudad_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ciudad = await Ciudades.findByPk(ciudad_id);

    if (!ciudad) {
      throw new Error(`No existe esa ciudad`);
    }

    return ciudad;
  } catch (error) {
    throw new Error(`Error al traer la ciudad: ${error.message}`);
  }
};

// const cargarCiudades = async () => {
//   let t;

//   try {
//     t = await conn.transaction();

//     for (const ciudad of ciudades) {
//       const [crearCiudad, created] = await Ciudades.findOrCreate({
//         where: { nombre: ciudad },
//         defaults: {
//           nombre: ciudad,
//         },
//         transaction: t,
//       });
//     }

//     await t.commit();
//   } catch (error) {
//     if (!t.finished) {
//       await t.rollback();
//     }

//     throw new Error(`Error al crear las ciudades: ${error.message}`);
//   }
// };

const crearCiudad = async (estado_id, nombre) => {
  if (!estado_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [ciudad, created] = await Ciudades.findOrCreate({
      where: { estado_id: estado_id, nombre: nombre },
      defaults: {
        estado_id: estado_id,
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return ciudad;
    }

    throw new Error(`Ya existe una ciudad con ese nombre`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la ciudad: ${error.message}`);
  }
};

const modificarCiudad = async (ciudad_id, estado_id, nombre) => {
  if (!ciudad_id || !estado_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCiudad(ciudad_id);

    await Ciudades.update(
      {
        estado_id: estado_id,
        nombre: nombre,
      },
      {
        where: {
          ciudad_id: ciudad_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCiudad(ciudad_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la ciudad: ${error.message}`);
  }
};

const inactivarCiudad = async (ciudad_id) => {
  if (!ciudad_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const ciudad = await traerCiudad(ciudad_id);

    await Ciudades.update(
      { activo: !ciudad.activo },
      {
        where: { ciudad_id: ciudad_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCiudad(ciudad_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la ciudad: ${error.message}`);
  }
};

module.exports = {
  todasLasCiudades,
  todasLasCiudadesActivas,
  traerCiudad,
  crearCiudad,
  modificarCiudad,
  inactivarCiudad,
};
