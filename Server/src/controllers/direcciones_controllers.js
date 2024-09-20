const { conn, Direcciones } = require("../db");

const todasLasDirecciones = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const direcciones = await Direcciones.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!direcciones.length) {
      throw new Error(`No existen direcciones`);
    }

    return direcciones;
  } catch (error) {
    throw new Error(`Error al traer todas las direcciones: ${error.message}`);
  }
};

const todasLasDireccionesActivas = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const direcciones = await Direcciones.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!direcciones.length) {
      throw new Error(`No existen direcciones`);
    }

    return direcciones;
  } catch (error) {
    throw new Error(`Error al traer todas las direcciones: ${error.message}`);
  }
};

const traerDireccion = async (direccion_id) => {
  if (!direccion_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const direccion = await Direcciones.findByPk(direccion_id);

    if (!direccion) {
      throw new Error(`No existe esa dirección`);
    }

    return direccion;
  } catch (error) {
    throw new Error(`Error al traer la dirección: ${error.message}`);
  }
};

const crearDireccion = async (
  empleado_id,
  {
    calle_avenida,
    parroquia_id,
    municipio_id,
    tipo_vivienda,
    numero_casa,
    piso,
    apartamento,
    urbanizacion_sector,
  }
) => {
  if (
    !empleado_id ||
    !calle_avenida ||
    !parroquia_id ||
    !municipio_id ||
    !tipo_vivienda ||
    !urbanizacion_sector
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [crearDireccion, created] = await Direcciones.findOrCreate({
      where: {
        empleado_id: empleado_id,
        calle_avenida: calle_avenida,
        parroquia_id: parroquia_id,
        municipio_id: municipio_id,
        tipo_vivienda: tipo_vivienda,
        urbanizacion_sector: urbanizacion_sector,
      },
      defaults: {
        empleado_id: empleado_id,
        calle_avenida: calle_avenida,
        parroquia_id: parroquia_id,
        municipio_id: municipio_id,
        tipo_vivienda: tipo_vivienda,
        numero_casa: numero_casa || null,
        piso: piso || null,
        apartamento: apartamento || null,
        urbanizacion_sector: urbanizacion_sector,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la dirección: ${error.message}`);
  }
};

const modificarDireccion = async (
  direccion_id,
  calle_avenida,
  parroquia_id,
  municipio_id,
  tipo_vivienda,
  numero_casa,
  piso,
  apartamento,
  urbanizacion_sector
) => {
  if (
    !direccion_id ||
    !calle_avenida ||
    !parroquia_id ||
    !municipio_id ||
    !tipo_vivienda ||
    !numero_casa ||
    !piso ||
    !apartamento ||
    !urbanizacion_sector
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerDireccion(direccion_id);

    await Direcciones.update(
      {
        calle_avenida: calle_avenida,
        parroquia_id: parroquia_id,
        municipio_id: municipio_id,
        tipo_vivienda: tipo_vivienda,
        numero_casa: numero_casa,
        piso: piso,
        apartamento: apartamento,
        urbanizacion_sector: urbanizacion_sector,
      },
      {
        where: {
          direccion_id: direccion_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerDireccion(direccion_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la dirección: ${error.message}`);
  }
};

const inactivarDireccion = async (direccion_id) => {
  if (!direccion_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const direccion = await traerDireccion(direccion_id);

    await Direcciones.update(
      { activo: !direccion.activo },
      {
        where: { direccion_id: direccion_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerDireccion(direccion_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la dirección: ${error.message}`);
  }
};

module.exports = {
  todasLasDirecciones,
  todasLasDireccionesActivas,
  traerDireccion,
  crearDireccion,
  modificarDireccion,
  inactivarDireccion,
};
