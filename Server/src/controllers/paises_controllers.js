import { conn, models } from "../db.js";
const { Paises } = models;

import { paises } from "../utils/paises.js";

export const todosLosPaises = async () => {
  try {
    const paises = await Paises.findAll({
      order: [["nombre", "ASC"]],
    });

    return paises;
  } catch (error) {
    throw new Error(`Error al traer todos los paises: ${error.message}`);
  }
};

export const todosLosPaisesActivos = async () => {
  try {
    const paises = await Paises.findAll({
      where: { activo: true },
      order: [["nombre", "ASC"]],
    });

    return paises;
  } catch (error) {
    throw new Error(`Error al traer todos los paises: ${error.message}`);
  }
};

export const traerPais = async (pais_id) => {
  if (!pais_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const pais = await Paises.findByPk(pais_id);

    if (!pais) {
      throw new Error(`No existe ese país`);
    }

    return pais;
  } catch (error) {
    throw new Error(`Error al traer el país: ${error.message}`);
  }
};

export const cargarPaises = async () => {
  let t;

  try {
    for (const pais of paises) {
      const paisExiste = await Paises.findOne({
        where: {
          nombre: pais,
        },
      });

      if (!paisExiste) {
        t = await conn.transaction();

        await Paises.create(
          {
            nombre: pais,
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

    throw new Error(`Error al crear los países: ${error.message}`);
  }
};

export const crearPais = async (nombre) => {
  if (!nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [pais, created] = await Paises.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return pais;
    }

    throw new Error(`Ya existe un país con ese nombre`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el país: ${error.message}`);
  }
};

export const modificarPais = async (pais_id, nombre) => {
  if (!pais_id || !nombre) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerPais(pais_id);

    await Paises.update(
      {
        nombre: nombre,
      },
      {
        where: {
          pais_id: pais_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerPais(pais_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el país: ${error.message}`);
  }
};

export const inactivarPais = async (pais_id) => {
  if (!pais_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const pais = await traerPais(pais_id);

    await Paises.update(
      { activo: !pais.activo },
      {
        where: { pais_id: pais_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerPais(pais_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la país: ${error.message}`);
  }
};
