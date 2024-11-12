const { conn, Seguro_Social } = require("../db");

const { seguroSocial } = require("../utils/seguroSocial");

const todosLosSegurosSocial = async () => {
  try {
    const seguros_social = await Seguro_Social.findAll({
      order: [["descripcion", "ASC"]],
    });

    if (!seguros_social.length) {
      throw new Error(`No existen seguros social`);
    }

    return seguros_social;
  } catch (error) {
    throw new Error(
      `Error al traer todos los seguros social: ${error.message}`
    );
  }
};

const todosLosSegurosSocialActivos = async () => {
  try {
    const seguros_social = await Seguro_Social.findAll({
      where: { activo: true },
      order: [["descripcion", "ASC"]],
    });

    if (!seguros_social.length) {
      throw new Error(`No existen seguros social`);
    }

    return seguros_social;
  } catch (error) {
    throw new Error(
      `Error al traer todos los seguros social: ${error.message}`
    );
  }
};

const traerSeguroSocial = async (seguro_social_id) => {
  if (!seguro_social_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const seguro_social = await Seguro_Social.findByPk(seguro_social_id);

    if (!seguro_social) {
      throw new Error(`No existe ese seguro social`);
    }

    return seguro_social;
  } catch (error) {
    throw new Error(`Error al traer el seguro social: ${error.message}`);
  }
};

const cargarSeguroSocial = async () => {
  let t;

  try {
    for (const seguro of seguroSocial) {
      const seguro_social = await Seguro_Social.findOne({
        where: {
          rif: seguro.rif,
        },
      });

      if (!seguro_social) {
        t = await conn.transaction();

        await Seguro_Social.create(
          {
            descripcion: seguro.descripcion,
            rif: seguro.rif,
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

    throw new Error(`Error al crear los seguros social: ${error.message}`);
  }
};

const crearSeguroSocial = async (descripcion, rif) => {
  if (!descripcion || !rif) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [seguro_social, created] = await Seguro_Social.findOrCreate({
      where: { rif: rif },
      defaults: {
        descripcion: descripcion,
        rif: rif,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return seguro_social;
    }

    throw new Error(`Ya existe un seguro social con ese rif`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el seguro social: ${error.message}`);
  }
};

const modificarSeguroSocial = async (seguro_social_id, descripcion, rif) => {
  if (!seguro_social_id || !descripcion || !rif) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerSeguroSocial(seguro_social_id);

    t = await conn.transaction();

    await Seguro_Social.update(
      {
        descripcion: descripcion,
        rif: rif,
      },
      {
        where: {
          seguro_social_id: seguro_social_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSeguroSocial(seguro_social_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el seguro social: ${error.message}`);
  }
};

const inactivarSeguroSocial = async (seguro_social_id) => {
  if (!seguro_social_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const seguro_social = await traerSeguroSocial(seguro_social_id);

    t = await conn.transaction();

    await Seguro_Social.update(
      { activo: !seguro_social.activo },
      {
        where: { seguro_social_id: seguro_social_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerSeguroSocial(seguro_social_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el seguro social: ${error.message}`);
  }
};

module.exports = {
  todosLosSegurosSocial,
  todosLosSegurosSocialActivos,
  traerSeguroSocial,
  cargarSeguroSocial,
  crearSeguroSocial,
  modificarSeguroSocial,
  inactivarSeguroSocial,
};
