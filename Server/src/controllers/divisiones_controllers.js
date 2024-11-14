const { conn, Divisiones } = require("../db");

const { divisiones } = require("../utils/divisiones");

const todasLasDivisiones = async () => {
  try {
    const divisiones = await Divisiones.findAll({
      order: [["nombre", "ASC"]],
    });

    if (!divisiones.length) {
      throw new Error(`No existen divisiones`);
    }

    return divisiones;
  } catch (error) {
    throw new Error(`Error al traer todas las divisiones: ${error.message}`);
  }
};

const todasLasDivisionesActivas = async () => {
  try {
    const divisiones = await Divisiones.findAll({
      where: { activo: true },
      order: [["nombre", "ASC"]],
    });

    if (!divisiones.length) {
      throw new Error(`No existen divisiones`);
    }

    return divisiones;
  } catch (error) {
    throw new Error(`Error al traer todas las divisiones: ${error.message}`);
  }
};

const traerDivision = async (division_id) => {
  if (!division_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const division = await Divisiones.findByPk(division_id);

    if (!division) {
      throw new Error(`No existe esa división`);
    }

    return division;
  } catch (error) {
    throw new Error(`Error al traer la división: ${error.message}`);
  }
};

const cargarDivisiones = async () => {
  let t;

  try {
    for (const division of divisiones) {
      const divisionExiste = await Divisiones.findOne({
        where: {
          nombre: division,
        },
      });

      if (!divisionExiste) {
        t = await conn.transaction();

        await Divisiones.create(
          {
            nombre: division,
            descripcion: null,
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

    throw new Error(`Error al crear las divisiones: ${error.message}`);
  }
};

const crearDivision = async (nombre, descripcion) => {
  if (!nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [division, created] = await Divisiones.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
        descripcion: descripcion || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return division;
    }

    throw new Error(`Ya existe una divisón con ese nombre`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la división: ${error.message}`);
  }
};

const modificarSeguroSocial = async (division_id, nombre, descripcion) => {
  if (!division_id || !nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerDivision(division_id);

    t = await conn.transaction();

    await Divisiones.update(
      {
        nombre: nombre,
        descripcion: descripcion || null,
      },
      {
        where: {
          division_id: division_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerDivision(division_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la división: ${error.message}`);
  }
};

const inactivarDivision = async (division_id) => {
  if (!division_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const division = await traerDivision(division_id);

    t = await conn.transaction();

    await Divisiones.update(
      { activo: !division.activo },
      {
        where: { division_id: division_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerDivision(division_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la división: ${error.message}`);
  }
};

module.exports = {
  todasLasDivisiones,
  todasLasDivisionesActivas,
  traerDivision,
  cargarDivisiones,
  crearDivision,
  modificarSeguroSocial,
  inactivarDivision,
};
