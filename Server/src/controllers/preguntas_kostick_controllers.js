const { conn, Preguntas_Kostick } = require("../db");

const { pruebaKostick } = require("../utils/pruebaKostick");

const { fechaHoraActual } = require("../utils/formatearFecha");

const todasLasPreguntasKostick = async () => {
  try {
    const preguntas_kostick = await Preguntas_Kostick.findAll({
      order: [
        ["numero_pregunta", "ASC"],
        ["respuesta", "ASC"],
      ],
    });

    if (!preguntas_kostick.length) {
      throw new Error(`${fechaHoraActual()} - No existen preguntas kostick`);
    }

    let preguntasOrdenadas = [];

    for (let i = 0; i < preguntas_kostick.length; i += 2) {
      preguntasOrdenadas.push([preguntas_kostick[i], preguntas_kostick[i + 1]]);
    }

    return preguntasOrdenadas;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer todas las preguntas kostick:`,
      error.message
    );
  }
};

const cargarPreguntasKostick = async () => {
  let t;

  try {
    t = await conn.transaction();

    for (const respuestaObjeto of pruebaKostick) {
      const [resp, created] = await Preguntas_Kostick.findOrCreate({
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
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear las preguntas kostick:`,
      error.message
    );
  }
};

module.exports = {
  todasLasPreguntasKostick,
  cargarPreguntasKostick,
};
