const { conn, Cargos_Niveles } = require("../db");

const todosLosCargosNiveles = async (cargo_id) => {
  if (!cargo_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos_niveles = await Cargos_Niveles.findAll({
      where: {
        cargo_id: cargo_id,
      },
    });

    return cargos_niveles;
  } catch (error) {
    throw new Error(
      `Error al traer todos los niveles para ese cargo: ${error.message}`
    );
  }
};

const todosLosCargosNivelesActivos = async (cargo_id) => {
  if (!cargo_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos_niveles = await Cargos_Niveles.findAll({
      where: { cargo_id: cargo_id, activo: true },
    });

    return cargos_niveles;
  } catch (error) {
    throw new Error(
      `Error al traer todos los niveles para ese cargo: ${error.message}`
    );
  }
};

const traerCargoNivel = async (cargo_nivel_id) => {
  if (!cargo_nivel_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargo_nivel = await Cargos_Niveles.findByPk(cargo_nivel_id);

    if (!cargo_nivel) {
      throw new Error(`No existe ese nivel de ese cargo`);
    }

    return cargo_nivel;
  } catch (error) {
    throw new Error(`Error al traer el nivel de ese cargo: ${error.message}`);
  }
};

const crearCargoNivel = async (cargo_id, nivel, salario_min, salario_max) => {
  if (!cargo_id || !nivel || !salario_min || !salario_max) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [cargo_nivel, created] = await Cargos_Niveles.findOrCreate({
      where: {
        cargo_id: cargo_id,
        nivel: nivel,
      },
      defaults: {
        cargo_id: cargo_id,
        nivel: nivel,
        salario_min: salario_min,
        salario_max: salario_max,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return cargo_nivel;
    }

    throw new Error(`Ya existe ese nivel para ese cargo`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el nivel para ese cargo: ${error.message}`);
  }
};

const modificarCargoNivel = async (
  cargo_nivel_id,
  cargo_id,
  nivel,
  salario_min,
  salario_max
) => {
  if (!cargo_nivel_id || !cargo_id || !nivel || !salario_min || !salario_max) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCargoNivel(cargo_nivel_id);

    await Cargos_Niveles.update(
      {
        cargo_id: cargo_id,
        nivel: nivel,
        salario_min: salario_min,
        salario_max: salario_max,
      },
      {
        where: {
          cargo_nivel_id: cargo_nivel_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargoNivel(cargo_nivel_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el nivel de ese cargo: ${error.message}`
    );
  }
};

const inactivarCargoNivel = async (cargo_nivel_id) => {
  if (!cargo_nivel_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const cargo_nivel = await traerCargoNivel(cargo_nivel_id);

    await Cargos_Niveles.update(
      { activo: !cargo_nivel.activo },
      {
        where: { cargo_nivel_id: cargo_nivel_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargoNivel(cargo_nivel_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar ese nivel de ese cargo: ${error.message}`
    );
  }
};

module.exports = {
  todosLosCargosNiveles,
  todosLosCargosNivelesActivos,
  traerCargoNivel,
  crearCargoNivel,
  modificarCargoNivel,
  inactivarCargoNivel,
};
