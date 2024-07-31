const { conn, Municipios, Paises, Estados } = require("../db");

const { municipios } = require("../utils/municipios");

const todosLosMunicipios = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const municipios = await Municipios.findAll({
      where: {
        estado_id: estado_id,
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

const todosLosMunicipiosActivos = async (estado_id) => {
  if (!estado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const municipios = await Municipios.findAll({
      where: { estado_id: estado_id, activo: true },
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

const cargarMunicipios = async () => {
  let t;

  try {
    for (const municipio of municipios) {
      const pais = await Paises.findOne({
        where: {
          nombre: municipio.pais,
        },
      });

      if (pais) {
        const estado = await Estados.findOne({
          where: {
            pais_id: pais.pais_id,
            nombre: municipio.estado,
          },
        });

        if (estado) {
          for (const municipioNombre of municipio.municipios) {
            t = await conn.transaction();

            const [crearMunicipio, created] = await Municipios.findOrCreate({
              where: { estado_id: estado.estado_id, nombre: municipioNombre },
              defaults: {
                estado_id: estado.estado_id,
                nombre: municipioNombre,
              },
              transaction: t,
            });

            await t.commit();
          }
        } else {
          throw new Error(`No existe el estado ${municipio.estado}`);
        }
      } else {
        throw new Error(`No existe el país ${municipio.pais}`);
      }
    }
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear las municipios: ${error.message}`);
  }
};

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

const modificarMunicipio = async (municipio_id, estado_id, nombre) => {
  if (!municipio_id || !estado_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerMunicipio(municipio_id);

    await Municipios.update(
      {
        estado_id: estado_id,
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
  cargarMunicipios,
  crearMunicipio,
  modificarMunicipio,
  inactivarMunicipio,
};
