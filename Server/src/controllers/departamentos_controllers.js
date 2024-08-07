const { conn, Departamentos } = require("../db");

const todosLosDepartamentos = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const departamentos = await Departamentos.findAll({
      where: {
        empresa_id: empresa_id,
      },
    });

    return departamentos;
  } catch (error) {
    throw new Error(`Error al traer todos los departamentos: ${error.message}`);
  }
};

const todosLosDepartamentosActivos = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const departamentos = await Departamentos.findAll({
      where: { empresa_id: empresa_id, activo: true },
    });

    return departamentos;
  } catch (error) {
    throw new Error(`Error al traer todos los departamentos: ${error.message}`);
  }
};

const traerDepartamento = async (departamento_id) => {
  if (!departamento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const departamento = await Departamentos.findByPk(departamento_id);

    if (!departamento) {
      throw new Error(`No existe ese departamento`);
    }

    return departamento;
  } catch (error) {
    throw new Error(`Error al traer el departamento: ${error.message}`);
  }
};

const crearDepartamento = async (empresa_id, nombre, descripcion) => {
  if (!empresa_id || !nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [departamento, created] = await Departamentos.findOrCreate({
      where: {
        empresa_id: empresa_id,
        nombre: nombre,
      },
      defaults: {
        empresa_id: empresa_id,
        nombre: nombre,
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return departamento;
    }

    throw new Error(
      `Ya existe un departamento con ese nombre para esa empresa`
    );
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el departamento: ${error.message}`);
  }
};

const modificarDepartamento = async (
  departamento_id,
  empresa_id,
  nombre,
  descripcion
) => {
  if (!departamento_id || !empresa_id || !nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerDepartamento(departamento_id);

    await Departamentos.update(
      {
        empresa_id: empresa_id,
        nombre: nombre,
        descripcion: descripcion,
      },
      {
        where: {
          departamento_id: departamento_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerDepartamento(departamento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el departamento: ${error.message}`);
  }
};

const inactivarDepartamento = async (departamento_id) => {
  if (!departamento_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const departamento = await traerDepartamento(departamento_id);

    await Departamentos.update(
      { activo: !departamento.activo },
      {
        where: { departamento_id: departamento_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerDepartamento(departamento_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la departamento: ${error.message}`);
  }
};

module.exports = {
  todosLosDepartamentos,
  todosLosDepartamentosActivos,
  traerDepartamento,
  crearDepartamento,
  modificarDepartamento,
  inactivarDepartamento,
};
