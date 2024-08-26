const { conn, Tipos_Movimientos } = require("../db");

const todosLosTiposMovimientos = async () => {
  try {
    const tipos_movimientos = await Tipos_Movimientos.findAll();

    if (!tipos_movimientos.length) {
      throw new Error(`No existen tipos de movimientos`);
    }

    return tipos_movimientos;
  } catch (error) {
    throw new Error(
      `Error al traer todos los tipos de movimientos: ${error.message}`
    );
  }
};

const todosLosTiposMovimientosActivos = async () => {
  try {
    const tipos_movimientos = await Tipos_Movimientos.findAll({
      where: { activo: true },
    });

    if (!tipos_movimientos.length) {
      throw new Error(`No existen tipos de movimientos`);
    }

    return tipos_movimientos;
  } catch (error) {
    throw new Error(
      `Error al traer todos los tipos de movimientos: ${error.message}`
    );
  }
};

const traerTipoMovimiento = async (tipo_movimiento_id) => {
  if (!tipo_movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const tipo_movimiento = await Tipos_Movimientos.findByPk(
      tipo_movimiento_id
    );

    if (!tipo_movimiento) {
      throw new Error(`No existe ese tipo de movimiento`);
    }

    return tipo_movimiento;
  } catch (error) {
    throw new Error(`Error al traer el tipo de movimiento: ${error.message}`);
  }
};

const crearTipoMovimiento = async (descripcion) => {
  if (!descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [tipo_movimiento, created] = await Tipos_Movimientos.findOrCreate({
      where: { descripcion: descripcion },
      defaults: {
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return tipo_movimiento;
    }

    throw new Error(`Ya existe un tipo de movimiento con esa descripción`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el tipo de movimiento: ${error.message}`);
  }
};

const modificarTipoMovimiento = async (tipo_movimiento_id, descripcion) => {
  if (!tipo_movimiento_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerTipoMovimiento(tipo_movimiento_id);

    t = await conn.transaction();

    await Tipos_Movimientos.update(
      {
        descripcion: descripcion,
      },
      {
        where: {
          tipo_movimiento_id: tipo_movimiento_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTipoMovimiento(tipo_movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el tipo de movimiento: ${error.message}`
    );
  }
};

const inactivarTipoMovimiento = async (tipo_movimiento_id) => {
  if (!tipo_movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const tipo_movimiento = await traerTipoMovimiento(tipo_movimiento_id);

    t = await conn.transaction();

    await Tipos_Movimientos.update(
      { activo: !tipo_movimiento.activo },
      {
        where: { tipo_movimiento_id: tipo_movimiento_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerTipoMovimiento(tipo_movimiento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar el tipo de movimiento: ${error.message}`
    );
  }
};

module.exports = {
  todosLosTiposMovimientos,
  todosLosTiposMovimientosActivos,
  traerTipoMovimiento,
  crearTipoMovimiento,
  modificarTipoMovimiento,
  inactivarTipoMovimiento,
};
