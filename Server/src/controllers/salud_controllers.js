const { conn, Salud } = require("../db");

const todosLosSalud = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const salud = await Salud.findAll({ where: { empleado_id: empleado_id } });

    if (!salud.length) {
      throw new Error(`No existen salud`);
    }

    return salud;
  } catch (error) {
    throw new Error(`Error al traer todas las salud: ${error.message}`);
  }
};

const todosLosSaludActivos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const salud = await Salud.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!salud.length) {
      throw new Error(`No existen salud`);
    }

    return salud;
  } catch (error) {
    throw new Error(`Error al traer todas las salud: ${error.message}`);
  }
};

const traerSalud = async (salud_id) => {
  if (!salud_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const salud = await Salud.findByPk(salud_id);

    if (!salud) {
      throw new Error(`No existe esa salud`);
    }

    return salud;
  } catch (error) {
    throw new Error(`Error al traer la salud: ${error.message}`);
  }
};

const crearSalud = async (
  empleado_id,
  alergia_medicamentos,
  alergia_alimentos,
  alergia_otros,
  alergia_especifique,
  fuma,
  cicatriz_especifique
) => {
  if (
    !empleado_id ||
    !alergia_medicamentos ||
    !alergia_alimentos ||
    !alergia_otros ||
    !alergia_especifique ||
    !fuma ||
    !cicatriz_especifique
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [crearSalud, created] = await Salud.findOrCreate({
      where: {
        empleado_id: empleado_id,
      },
      defaults: {
        empleado_id: empleado_id,
        alergia_medicamentos: alergia_medicamentos,
        alergia_alimentos: alergia_alimentos,
        alergia_otros: alergia_otros,
        alergia_especifique: alergia_especifique,
        fuma: fuma,
        cicatriz_especifique: cicatriz_especifique,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la salud: ${error.message}`);
  }
};

const modificarSalud = async (
  salud_id,
  alergia_medicamentos,
  alergia_alimentos,
  alergia_otros,
  alergia_especifique,
  fuma,
  cicatriz_especifique
) => {
  if (
    !salud_id ||
    !alergia_medicamentos ||
    !alergia_alimentos ||
    !alergia_otros ||
    !alergia_especifique ||
    !fuma ||
    !cicatriz_especifique
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerSalud(salud_id);

    await Salud.update(
      {
        alergia_medicamentos: alergia_medicamentos,
        alergia_alimentos: alergia_alimentos,
        alergia_otros: alergia_otros,
        alergia_especifique: alergia_especifique,
        fuma: fuma,
        cicatriz_especifique: cicatriz_especifique,
      },
      {
        where: {
          salud_id: salud_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerSalud(salud_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la salud: ${error.message}`);
  }
};

const inactivarSalud = async (salud_id) => {
  if (!salud_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const salud = await traerSalud(salud_id);

    await Salud.update(
      { activo: !salud.activo },
      {
        where: { salud_id: salud_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerSalud(salud_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la salud: ${error.message}`);
  }
};

module.exports = {
  todosLosSalud,
  todosLosSaludActivos,
  traerSalud,
  crearSalud,
  modificarSalud,
  inactivarSalud,
};
