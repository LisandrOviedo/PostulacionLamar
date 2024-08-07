const { conn, Contactos_Emergencia } = require("../db");

const todosLosContactosEmergencia = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const contactos_emergencia = await Contactos_Emergencia.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!contactos_emergencia.length) {
      throw new Error(`No existen contactos de emergencia`);
    }

    return contactos_emergencia;
  } catch (error) {
    throw new Error(
      `Error al traer todos los contactos de emergencia: ${error.message}`
    );
  }
};

const todosLosContactosEmergenciaActivos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const contactos_emergencia = await Contactos_Emergencia.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!contactos_emergencia.length) {
      throw new Error(`No existen contactos de emergencia`);
    }

    return contactos_emergencia;
  } catch (error) {
    throw new Error(
      `Error al traer todos los contactos de emergencia: ${error.message}`
    );
  }
};

const traerContactoEmergencia = async (contacto_emergencia_id) => {
  if (!contacto_emergencia_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const contacto_emergencia = await Contactos_Emergencia.findByPk(
      contacto_emergencia_id
    );

    if (!contacto_emergencia) {
      throw new Error(`No existe ese contacto de emergencia`);
    }

    return contacto_emergencia;
  } catch (error) {
    throw new Error(
      `Error al traer el contacto de emergencia: ${error.message}`
    );
  }
};

const crearContactoEmergencia = async (empleado_id, contactos_emergencia) => {
  if (!empleado_id || !contactos_emergencia) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    for (const contacto_emergencia of contactos_emergencia) {
      t = await conn.transaction();

      const [crearContactoEmergencia, created] =
        await Contactos_Emergencia.findOrCreate({
          where: {
            empleado_id: empleado_id,
            nombre_apellido: contacto_emergencia.nombre_apellido,
            parentesco: contacto_emergencia.parentesco,
            telefono: contacto_emergencia.telefono,
          },
          defaults: {
            empleado_id: empleado_id,
            nombre_apellido: contacto_emergencia.nombre_apellido,
            parentesco: contacto_emergencia.parentesco,
            telefono: contacto_emergencia.telefono,
            direccion: contacto_emergencia.direccion,
          },
          transaction: t,
        });

      await t.commit();
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear los contactos de emergencia: ${error.message}`
    );
  }
};

const modificarContactoEmergencia = async (
  contacto_emergencia_id,
  nombre_apellido,
  parentesco,
  telefono,
  direccion
) => {
  if (
    !contacto_emergencia_id ||
    !nombre_apellido ||
    !parentesco ||
    !telefono ||
    !direccion
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerContactoEmergencia(contacto_emergencia_id);

    await Contactos_Emergencia.update(
      {
        nombre_apellido: nombre_apellido,
        parentesco: parentesco,
        telefono: telefono,
        direccion: direccion,
      },
      {
        where: {
          contacto_emergencia_id: contacto_emergencia_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerContactoEmergencia(contacto_emergencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el contacto de emergencia: ${error.message}`
    );
  }
};

const inactivarContactoEmergencia = async (contacto_emergencia_id) => {
  if (!contacto_emergencia_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const contacto_emergencia = await traerContactoEmergencia(
      contacto_emergencia_id
    );

    await Contactos_Emergencia.update(
      { activo: !contacto_emergencia.activo },
      {
        where: { contacto_emergencia_id: contacto_emergencia_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerContactoEmergencia(contacto_emergencia_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar el contacto de emergencia: ${error.message}`
    );
  }
};

module.exports = {
  todosLosContactosEmergencia,
  todosLosContactosEmergenciaActivos,
  traerContactoEmergencia,
  crearContactoEmergencia,
  modificarContactoEmergencia,
  inactivarContactoEmergencia,
};
