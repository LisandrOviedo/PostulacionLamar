const { conn, Clases_Movimientos } = require("../db");

const { clasesMovimientos } = require("../utils/clasesMovimientos");

const todasLasClasesMovimientos = async () => {
  try {
    const clases_movimientos = await Clases_Movimientos.findAll({
      order: [["descripcion", "ASC"]],
    });

    if (!clases_movimientos.length) {
      throw new Error(`No existen clases de movimientos`);
    }

    return clases_movimientos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las clases de movimientos: ${error.message}`
    );
  }
};

const todasLasClasesMovimientosActivas = async () => {
  try {
    const clases_movimientos = await Clases_Movimientos.findAll({
      where: { activo: true },
      order: [["descripcion", "ASC"]],
    });

    if (!clases_movimientos.length) {
      throw new Error(`No existen clases de movimientos`);
    }

    return clases_movimientos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las clases de movimientos: ${error.message}`
    );
  }
};

const traerClaseMovimiento = async (clase_movimiento_id) => {
  if (!clase_movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const clase_movimiento = await Clases_Movimientos.findByPk(
      clase_movimiento_id
    );

    if (!clase_movimiento) {
      throw new Error(`No existe esa clase de movimiento`);
    }

    return clase_movimiento;
  } catch (error) {
    throw new Error(`Error al traer la clase de movimiento: ${error.message}`);
  }
};

const cargarClasesMovimientos = async () => {
  let t;

  try {
    for (const claseMovimiento of clasesMovimientos) {
      const clase_movimiento = await Clases_Movimientos.findOne({
        where: {
          descripcion: claseMovimiento,
        },
      });

      if (!clase_movimiento) {
        t = await conn.transaction();

        await Clases_Movimientos.create(
          {
            descripcion: claseMovimiento,
          },
          { transaction: t }
        );

        await t.commit();
      }
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear las clases de movimientos: ${error.message}`
    );
  }
};

const crearClaseMovimiento = async (descripcion) => {
  if (!descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [clase_movimiento, created] = await Clases_Movimientos.findOrCreate({
      where: { descripcion: descripcion },
      defaults: {
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return clase_movimiento;
    }

    throw new Error(`Ya existe una clase de movimiento con esa descripción`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la clase de movimiento: ${error.message}`);
  }
};

const modificarClaseMovimiento = async (clase_movimiento_id, descripcion) => {
  if (!clase_movimiento_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerClaseMovimiento(clase_movimiento_id);

    t = await conn.transaction();

    await Clases_Movimientos.update(
      {
        descripcion: descripcion,
      },
      {
        where: {
          clase_movimiento_id: clase_movimiento_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerClaseMovimiento(clase_movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar la clase de movimiento: ${error.message}`
    );
  }
};

const inactivarClaseMovimiento = async (clase_movimiento_id) => {
  if (!clase_movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const clase_movimiento = await traerClaseMovimiento(clase_movimiento_id);

    t = await conn.transaction();

    await Clases_Movimientos.update(
      { activo: !clase_movimiento.activo },
      {
        where: { clase_movimiento_id: clase_movimiento_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerClaseMovimiento(clase_movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar la clase de movimiento: ${error.message}`
    );
  }
};

module.exports = {
  todasLasClasesMovimientos,
  todasLasClasesMovimientosActivas,
  traerClaseMovimiento,
  cargarClasesMovimientos,
  crearClaseMovimiento,
  modificarClaseMovimiento,
  inactivarClaseMovimiento,
};
