const { conn, Cargos_Empleados } = require("../db");

const todosLosCargosEmpleados = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos_empleados = await Cargos_Empleados.findAll({
      where: {
        empleado_id: empleado_id,
      },
    });

    if (!cargos_empleados.length) {
      throw new Error(`No existen cargos para ese empleado`);
    }

    return cargos_empleados;
  } catch (error) {
    throw new Error(
      `Error al traer todos los cargos de ese empleado: ${error.message}`
    );
  }
};

const todosLosCargosEmpleadosActivos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargos_empleados = await Cargos_Empleados.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!cargos_empleados.length) {
      throw new Error(`No existen cargos para ese empleado`);
    }

    return cargos_empleados;
  } catch (error) {
    throw new Error(
      `Error al traer todos los cargos de ese empleado: ${error.message}`
    );
  }
};

const traerCargoEmpleado = async (cargo_empleado_id) => {
  if (!cargo_empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const cargo_empleado = await Cargos_Empleados.findByPk(cargo_empleado_id);

    if (!cargo_empleado) {
      throw new Error(`No existe ese cargo de ese empleado`);
    }

    return cargo_empleado;
  } catch (error) {
    throw new Error(
      `Error al traer el cargo de ese empleado: ${error.message}`
    );
  }
};

const crearCargoEmpleado = async (
  cargo_nivel_id,
  empleado_id,
  salario,
  fecha_ingreso
) => {
  if (!cargo_nivel_id || !empleado_id || !salario || !fecha_ingreso) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [cargo_empleado, created] = await Cargos_Empleados.findOrCreate({
      where: {
        cargo_nivel_id: cargo_nivel_id,
        empleado_id: empleado_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
      },
      defaults: {
        cargo_nivel_id: cargo_nivel_id,
        empleado_id: empleado_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return cargo_empleado;
    }

    throw new Error(
      `Ya existe un cargo para ese empleado con esas características`
    );
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear el cargo para ese empleado: ${error.message}`
    );
  }
};

const modificarCargoEmpleado = async (
  cargo_empleado_id,
  cargo_nivel_id,
  salario,
  fecha_ingreso,
  fecha_egreso
) => {
  if (
    !cargo_empleado_id ||
    !cargo_nivel_id ||
    !salario ||
    !fecha_ingreso ||
    !fecha_egreso
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerCargoEmpleado(cargo_empleado_id);

    await Cargos_Empleados.update(
      {
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        fecha_egreso: fecha_egreso,
      },
      {
        where: {
          cargo_empleado_id: cargo_empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargoEmpleado(cargo_empleado_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el cargo de ese empleado: ${error.message}`
    );
  }
};

const inactivarCargoEmpleado = async (cargo_nivel_id) => {
  if (!cargo_nivel_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const cargo_empleado = await traerCargoEmpleado(cargo_nivel_id);

    await Cargos_Empleados.update(
      { activo: !cargo_empleado.activo },
      {
        where: { cargo_nivel_id: cargo_nivel_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCargoEmpleado(cargo_nivel_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar el cargo de ese empleado: ${error.message}`
    );
  }
};

module.exports = {
  todosLosCargosEmpleados,
  todosLosCargosEmpleadosActivos,
  traerCargoEmpleado,
  crearCargoEmpleado,
  modificarCargoEmpleado,
  inactivarCargoEmpleado,
};
