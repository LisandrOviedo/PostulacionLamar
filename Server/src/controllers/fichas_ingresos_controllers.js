const { conn, Fichas_Ingresos, Empleados } = require("../db");

const todasLasFichasIngresos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const fichas_ingresos = await Fichas_Ingresos.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!fichas_ingresos.length) {
      throw new Error(`No existen fichas de ingresos de ese empleado`);
    }

    return fichas_ingresos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las fichas de ingresos de ese empleado: ${error.message}`
    );
  }
};

const traerFichaIngresoEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ficha_ingreso = await Fichas_Ingresos.findOne({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!ficha_ingreso) {
      throw new Error(`No existe ficha de ingreso para ese empleado`);
    }

    return ficha_ingreso;
  } catch (error) {
    throw new Error(
      `Error al traer la ficha de ingreso de ese empleado: ${error.message}`
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

const crearFichaIngreso = async (
  empleado_id,
  { cargo_nivel_id, salario, fecha_ingreso, observaciones }
) => {
  if (!empleado_id || !cargo_nivel_id || !salario || !fecha_ingreso) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [crearDireccion, created] = await Fichas_Ingresos.findOrCreate({
      where: {
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
      },
      defaults: {
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones || null,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la ficha de ingreso: ${error.message}`);
  }
};

const modificarFichaIngreso = async (
  ficha_ingreso_id,
  cargo_nivel_id,
  salario,
  fecha_ingreso,
  observaciones
) => {
  if (!ficha_ingreso_id || !cargo_nivel_id || !salario || !fecha_ingreso) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerFichaIngreso(ficha_ingreso_id);

    await Fichas_Ingresos.update(
      {
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones || null,
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
    if (t && !t.finished) {
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
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la ficha de ingreso: ${error.message}`);
  }
};

module.exports = {
  todasLasFichasIngresos,
  traerFichaIngreso,
  traerFichaIngresoEmpleado,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
};
