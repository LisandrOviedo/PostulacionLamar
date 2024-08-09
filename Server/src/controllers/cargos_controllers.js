const { conn, Cargos } = require("../db");

const todosLosCargos = async (departamento_id) => {
  if (!departamento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos = await Cargos.findAll({
      where: {
        departamento_id: departamento_id,
      },
    });

    return cargos;
  } catch (error) {
    throw new Error(`Error al traer todos los cargos: ${error.message}`);
  }
};

const todosLosCargosActivos = async (departamento_id) => {
  if (!departamento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos = await Cargos.findAll({
      where: { departamento_id: departamento_id, activo: true },
    });

    return cargos;
  } catch (error) {
    throw new Error(`Error al traer todos los cargos: ${error.message}`);
  }
};

const traerCargo = async (cargo_id) => {
  if (!cargo_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargo = await Cargos.findByPk(cargo_id);

    if (!cargo) {
      throw new Error(`No existe ese cargo`);
    }

    return cargo;
  } catch (error) {
    throw new Error(`Error al traer el cargo: ${error.message}`);
  }
};

const crearCargo = async (
  departamento_id,
  codigo_cargo,
  descripcion,
  descripcion_cargo_antiguo
) => {
  if (!departamento_id || !codigo_cargo || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [cargo, created] = await Cargos.findOrCreate({
      where: {
        departamento_id: departamento_id,
        codigo_cargo: codigo_cargo,
      },
      defaults: {
        departamento_id: departamento_id,
        codigo_cargo: codigo_cargo,
        descripcion: descripcion,
        descripcion_cargo_antiguo: descripcion_cargo_antiguo || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return cargo;
    }

    throw new Error(`Ya existe un cargo con ese código para ese departamento`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el cargo: ${error.message}`);
  }
};

const modificarCargo = async (
  cargo_id,
  departamento_id,
  codigo_cargo,
  descripcion,
  descripcion_cargo_antiguo
) => {
  if (!cargo_id || !departamento_id || !codigo_cargo || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCargo(cargo_id);

    await Cargos.update(
      {
        departamento_id: departamento_id,
        codigo_cargo: codigo_cargo,
        descripcion: descripcion,
        descripcion_cargo_antiguo: descripcion_cargo_antiguo || null,
      },
      {
        where: {
          cargo_id: cargo_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargo(cargo_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el cargo: ${error.message}`);
  }
};

const inactivarCargo = async (cargo_id) => {
  if (!cargo_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const cargo = await traerCargo(cargo_id);

    await Cargos.update(
      { activo: !cargo.activo },
      {
        where: { departamento_id: departamento_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargo(cargo_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la cargo: ${error.message}`);
  }
};

module.exports = {
  todosLosCargos,
  todosLosCargosActivos,
  traerCargo,
  crearCargo,
  modificarCargo,
  inactivarCargo,
};
