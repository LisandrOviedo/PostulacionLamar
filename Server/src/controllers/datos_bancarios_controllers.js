const { conn, Datos_Bancarios } = require("../db");

const todosLosDatosBancarios = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const datos_bancarios = await Datos_Bancarios.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!datos_bancarios.length) {
      throw new Error(`No existen datos bancarios`);
    }

    return datos_bancarios;
  } catch (error) {
    throw new Error(
      `Error al traer todos los datos bancarios: ${error.message}`
    );
  }
};

const todosLosDatosBancariosActivos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const datos_bancarios = await Datos_Bancarios.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!datos_bancarios.length) {
      throw new Error(`No existen datos bancarios`);
    }

    return datos_bancarios;
  } catch (error) {
    throw new Error(
      `Error al traer todos los datos bancarios: ${error.message}`
    );
  }
};

const traerDatoBancario = async (dato_bancario_id) => {
  if (!dato_bancario_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const dato_bancario = await Datos_Bancarios.findByPk(dato_bancario_id);

    if (!dato_bancario) {
      throw new Error(`No existe ese dato bancario`);
    }

    return dato_bancario;
  } catch (error) {
    throw new Error(`Error al traer el dato bancario: ${error.message}`);
  }
};

const crearDatoBancario = async (empleado_id, datos_bancarios) => {
  if (!empleado_id || !datos_bancarios) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    for (const dato_bancario of datos_bancarios) {
      t = await conn.transaction();

      const [crearDatoBancario, created] = await Datos_Bancarios.findOrCreate({
        where: {
          empleado_id: empleado_id,
          titular_cuenta: dato_bancario.titular_cuenta,
          entidad_bancaria: dato_bancario.entidad_bancaria,
          numero_cuenta: dato_bancario.numero_cuenta,
        },
        defaults: {
          empleado_id: empleado_id,
          titular_cuenta: dato_bancario.titular_cuenta,
          entidad_bancaria: dato_bancario.entidad_bancaria,
          numero_cuenta: dato_bancario.numero_cuenta,
          tipo_cuenta: dato_bancario.tipo_cuenta,
          nombre_apellido_tercero:
            dato_bancario.nombre_apellido_tercero || null,
          tipo_identificacion_tercero:
            dato_bancario.tipo_identificacion_tercero || null,
          numero_identificacion_tercero:
            dato_bancario.numero_identificacion_tercero || null,
          parentesco_tercero: dato_bancario.parentesco_tercero || null,
        },
        transaction: t,
      });

      await t.commit();
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los datos bancarios: ${error.message}`);
  }
};

const modificarDatoBancario = async (
  dato_bancario_id,
  titular_cuenta,
  entidad_bancaria,
  numero_cuenta,
  tipo_cuenta,
  nombre_apellido_tercero,
  tipo_identificacion_tercero,
  numero_identificacion_tercero,
  parentesco_tercero
) => {
  if (
    !dato_bancario_id ||
    !titular_cuenta ||
    !entidad_bancaria ||
    !numero_cuenta ||
    !tipo_cuenta ||
    !nombre_apellido_tercero ||
    !tipo_identificacion_tercero ||
    !numero_identificacion_tercero ||
    !parentesco_tercero
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerDatoBancario(dato_bancario_id);

    await Datos_Bancarios.update(
      {
        titular_cuenta: titular_cuenta,
        entidad_bancaria: entidad_bancaria,
        numero_cuenta: numero_cuenta,
        tipo_cuenta: tipo_cuenta,
        nombre_apellido_tercero: nombre_apellido_tercero,
        tipo_identificacion_tercero: tipo_identificacion_tercero,
        numero_identificacion_tercero: numero_identificacion_tercero,
        parentesco_tercero: parentesco_tercero,
      },
      {
        where: {
          dato_bancario_id: dato_bancario_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerDatoBancario(dato_bancario_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el dato bancario: ${error.message}`);
  }
};

const inactivarDatoBancario = async (dato_bancario_id) => {
  if (!dato_bancario_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const dato_bancario = await traerDatoBancario(dato_bancario_id);

    await Datos_Bancarios.update(
      { activo: !dato_bancario.activo },
      {
        where: { dato_bancario_id: dato_bancario_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerDatoBancario(dato_bancario_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el dato bancario: ${error.message}`);
  }
};

module.exports = {
  todosLosDatosBancarios,
  todosLosDatosBancariosActivos,
  traerDatoBancario,
  crearDatoBancario,
  modificarDatoBancario,
  inactivarDatoBancario,
};
