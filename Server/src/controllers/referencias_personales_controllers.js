const { conn, Referencias_Personales } = require("../db");

const todasLasReferenciasPersonales = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const referencias_personales = await Referencias_Personales.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!referencias_personales.length) {
      throw new Error(`No existen referencias personales`);
    }

    return referencias_personales;
  } catch (error) {
    throw new Error(
      `Error al traer todas las referencias personales: ${error.message}`
    );
  }
};

const todasLasReferenciasPersonalesActivas = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const referencias_personales = await Referencias_Personales.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!referencias_personales.length) {
      throw new Error(`No existen referencias personales`);
    }

    return referencias_personales;
  } catch (error) {
    throw new Error(
      `Error al traer todas las referencias personales: ${error.message}`
    );
  }
};

const traerReferenciaPersonal = async (referencia_personal_id) => {
  if (!referencia_personal_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const referencia_personal = await Referencias_Personales.findByPk(
      referencia_personal_id
    );

    if (!referencia_personal) {
      throw new Error(`No existe esa referencia personal`);
    }

    return referencia_personal;
  } catch (error) {
    throw new Error(`Error al traer la referencia personal: ${error.message}`);
  }
};

const crearReferenciaPersonal = async (empleado_id, referencias_personales) => {
  if (!empleado_id || !referencias_personales) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    for (const referencia_personal of referencias_personales) {
      t = await conn.transaction();

      const [crearReferenciaPersonal, created] =
        await Referencias_Personales.findOrCreate({
          where: {
            empleado_id: empleado_id,
            nombre_apellido: referencia_personal.nombre_apellido,
            telefono: referencia_personal.telefono,
          },
          defaults: {
            empleado_id: empleado_id,
            nombre_apellido: referencia_personal.nombre_apellido,
            direccion: referencia_personal.direccion,
            telefono: referencia_personal.telefono,
            ocupacion: referencia_personal.ocupacion,
          },
          transaction: t,
        });

      await t.commit();
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la referencia personal: ${error.message}`);
  }
};

const modificarReferenciaPersonal = async (
  referencia_personal_id,
  nombre_apellido,
  direccion,
  telefono,
  ocupacion
) => {
  if (
    !referencia_personal_id ||
    !nombre_apellido ||
    !direccion ||
    !telefono ||
    !ocupacion
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerReferenciaPersonal(referencia_personal_id);

    await Referencias_Personales.update(
      {
        nombre_apellido: nombre_apellido,
        direccion: direccion,
        telefono: telefono,
        ocupacion: ocupacion,
      },
      {
        where: {
          referencia_personal_id: referencia_personal_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerReferenciaPersonal(referencia_personal_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar la referencia personal: ${error.message}`
    );
  }
};

const inactivarReferenciaPersonal = async (referencia_personal_id) => {
  if (!referencia_personal_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const referencia_personal = await traerReferenciaPersonal(
      referencia_personal_id
    );

    await Referencias_Personales.update(
      { activo: !referencia_personal.activo },
      {
        where: { referencia_personal_id: referencia_personal_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerReferenciaPersonal(referencia_personal_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar la referencia personal: ${error.message}`
    );
  }
};

module.exports = {
  todasLasReferenciasPersonales,
  todasLasReferenciasPersonalesActivas,
  traerReferenciaPersonal,
  crearReferenciaPersonal,
  modificarReferenciaPersonal,
  inactivarReferenciaPersonal,
};
