const { conn, Fichas_Ingresos, Empleados } = require("../db");

const todasLasFichasIngresos = async () => {
  try {
    const fichas_ingresos = await Fichas_Ingresos.findAll();

    if (!fichas_ingresos.length) {
      throw new Error(`No existen fichas_ingresos`);
    }

    return fichas_ingresos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las fichas_ingresos: ${error.message}`
    );
  }
};

const todasLasFichasIngresosActivas = async () => {
  try {
    const fichas_ingresos = await Fichas_Ingresos.findAll({
      where: { activo: true },
    });

    if (!fichas_ingresos.length) {
      throw new Error(`No existen fichas de ingresos`);
    }

    return fichas_ingresos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las fichas de ingresos: ${error.message}`
    );
  }
};

const traerFichaIngreso = async (ficha_ingreso_id) => {
  if (!ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ficha_ingreso = await Fichas_Ingresos.findByPk(ficha_ingreso_id);

    if (!ficha_ingreso) {
      throw new Error(`No existe esa ficha de ingreso`);
    }

    return ficha_ingreso;
  } catch (error) {
    throw new Error(`Error al traer la ficha de ingreso: ${error.message}`);
  }
};

const traerFichaIngresoEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ficha_ingreso = await Fichas_Ingresos.findOne({
      where: { empleado_id: empleado_id, activo: true },
      include: [{ model: Empleados }],
    });

    if (!ficha_ingreso) {
      throw new Error(`No existe esa ficha de ingreso`);
    }

    return ficha_ingreso;
  } catch (error) {
    throw new Error(`Error al traer la ficha de ingreso: ${error.message}`);
  }
};

const crearFichaIngreso = async (
  revision_ficha_ingreso_id,
  empleado_id,
  cargo_id,
  salario,
  fecha_ingreso,
  observaciones
) => {
  if (
    !revision_ficha_ingreso_id ||
    !empleado_id ||
    !cargo_id ||
    !salario ||
    !fecha_ingreso ||
    !observaciones
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [crearDireccion, created] = await Fichas_Ingresos.findOrCreate({
      where: {
        revision_ficha_ingreso_id: revision_ficha_ingreso_id,
        empleado_id: empleado_id,
        cargo_id: cargo_id,
        salario: salario,
      },
      defaults: {
        revision_ficha_ingreso_id: revision_ficha_ingreso_id,
        empleado_id: empleado_id,
        cargo_id: cargo_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la ficha de ingreso: ${error.message}`);
  }
};

const modificarFichaIngreso = async (
  ficha_ingreso_id,
  revision_ficha_ingreso_id,
  cargo_id,
  salario,
  fecha_ingreso,
  observaciones
) => {
  if (
    !ficha_ingreso_id ||
    !revision_ficha_ingreso_id ||
    !cargo_id ||
    !salario ||
    !fecha_ingreso ||
    !observaciones
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerFichaIngreso(ficha_ingreso_id);

    await Fichas_Ingresos.update(
      {
        revision_ficha_ingreso_id: revision_ficha_ingreso_id,
        cargo_id: cargo_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones,
      },
      {
        where: {
          ficha_ingreso_id: ficha_ingreso_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerFichaIngreso(ficha_ingreso_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la ficha de ingreso: ${error.message}`);
  }
};

const inactivarFichaIngreso = async (ficha_ingreso_id) => {
  if (!ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const ficha_ingreso = await traerFichaIngreso(ficha_ingreso_id);

    await Fichas_Ingresos.update(
      { activo: !ficha_ingreso.activo },
      {
        where: { ficha_ingreso_id: ficha_ingreso_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerFichaIngreso(ficha_ingreso_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la ficha de ingreso: ${error.message}`);
  }
};

module.exports = {
  todasLasFichasIngresos,
  todasLasFichasIngresosActivas,
  traerFichaIngreso,
  traerFichaIngresoEmpleado,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
};
