const { conn, Respuesta } = require("../db");

const { pruebaKostick } = require("../utils/pruebaKostick");

const todasLasRespuestas = async () => {
  try {
    const respuestas = await Respuesta.findAll({
      order: [
        ["numero_pregunta", "ASC"],
        ["respuesta", "ASC"],
      ],
    });

    if (!respuestas.length) {
      throw new Error("No existen respuestas");
    }

    let respuestasOrdenadas = [];

    for (let i = 0; i < respuestas.length; i += 2) {
      respuestasOrdenadas.push([respuestas[i], respuestas[i + 1]]);
    }

    return respuestasOrdenadas;
  } catch (error) {
    throw new Error("Error al traer todas las respuestas: " + error.message);
  }
};

const traerRespuesta = async (respuesta_id) => {
  if (!respuesta_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const respuesta = await Respuesta.findByPk(respuesta_id);

    if (!respuesta) {
      throw new Error("No existe esa respuesta");
    }

    return respuesta;
  } catch (error) {
    throw new Error("Error al traer la respuesta: " + error.message);
  }
};

const crearRespuestas = async () => {
  let t;

  try {
    t = await conn.transaction();

    for (const respuestaObjeto of pruebaKostick) {
      const [resp, created] = await Respuesta.findOrCreate({
        where: {
          numero_pregunta: respuestaObjeto.pregunta,
          respuesta: respuestaObjeto.respuesta,
        },
        defaults: {
          numero_pregunta: respuestaObjeto.pregunta,
          respuesta: respuestaObjeto.respuesta,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    await t.rollback();

    throw new Error("Error al crear las respuestas: " + error.message);
  }
};

const modificarRespuesta = async (
  respuesta_id,
  numero_pregunta,
  respuesta,
  activo
) => {
  if (!respuesta_id || !numero_pregunta || !respuesta || !activo) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    await traerRespuesta(respuesta_id);

    await Respuesta.update(
      {
        numero_pregunta: numero_pregunta,
        respuesta: respuesta,
        activo: activo,
      },
      {
        where: {
          respuesta_id: respuesta_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRespuesta(respuesta_id);
  } catch (error) {
    await t.rollback();

    throw new Error("Error al modificar la respuesta: " + error.message);
  }
};

const inactivarRespuesta = async (respuesta_id) => {
  if (!respuesta_id) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    const respuesta = await traerRespuesta(respuesta_id);

    await Respuesta.update(
      { activo: !respuesta.activo },
      {
        where: { respuesta_id: respuesta_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerRespuesta(respuesta_id);
  } catch (error) {
    await t.rollback();

    throw new Error("Error al inactivar la respuesta: " + error.message);
  }
};

module.exports = {
  todasLasRespuestas,
  traerRespuesta,
  crearRespuestas,
  modificarRespuesta,
  inactivarRespuesta,
};
