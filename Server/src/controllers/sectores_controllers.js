const { conn, Sectores } = require("../db");

const { sectores } = require("../utils/sectores");

const todosLosSectores = async () => {
  try {
    const sectores = await Sectores.findAll({
      order: [["nombre", "ASC"]],
    });

    if (!sectores.length) {
      throw new Error(`No existen sectores`);
    }

    return sectores;
  } catch (error) {
    throw new Error(`Error al traer todos los sectores: ${error.message}`);
  }
};

const todosLosSectoresActivos = async () => {
  try {
    const sectores = await Sectores.findAll({
      where: { activo: true },
      order: [["nombre", "ASC"]],
    });

    if (!sectores.length) {
      throw new Error(`No existen sectores`);
    }

    return sectores;
  } catch (error) {
    throw new Error(`Error al traer todos los sectores: ${error.message}`);
  }
};

const traerSector = async (sector_id) => {
  if (!sector_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const sector = await Sectores.findByPk(sector_id);

    if (!sector) {
      throw new Error(`No existe ese sector`);
    }

    return sector;
  } catch (error) {
    throw new Error(`Error al traer el sector: ${error.message}`);
  }
};

const cargarSectores = async () => {
  let t;

  try {
    for (const sector of sectores) {
      const sectorExiste = await Sectores.findOne({
        where: {
          nombre: sector,
        },
      });

      if (!sectorExiste) {
        t = await conn.transaction();

        await Sectores.create(
          {
            nombre: sector,
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

    throw new Error(`Error al crear los sectores: ${error.message}`);
  }
};

const crearSector = async (nombre, descripcion) => {
  if (!nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [sector, created] = await Sectores.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
        descripcion: descripcion || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return sector;
    }

    throw new Error(`Ya existe un sector con ese nombre`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el sector: ${error.message}`);
  }
};

const modificarSector = async (sector_id, nombre, descripcion) => {
  if (!sector_id || !nombre || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerSector(sector_id);

    t = await conn.transaction();

    await Sectores.update(
      {
        nombre: nombre,
        descripcion: descripcion || null,
      },
      {
        where: {
          sector_id: sector_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSector(sector_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el sector: ${error.message}`);
  }
};

const inactivarSector = async (sector_id) => {
  if (!sector_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const sector = await traerSector(sector_id);

    t = await conn.transaction();

    await Sectores.update(
      { activo: !sector.activo },
      {
        where: { sector_id: sector_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSector(sector_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el sector: ${error.message}`);
  }
};

module.exports = {
  todosLosSectores,
  todosLosSectoresActivos,
  traerSector,
  cargarSectores,
  crearSector,
  modificarSector,
  inactivarSector,
};
