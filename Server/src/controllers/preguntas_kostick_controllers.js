import { conn, models } from "../db.js";
const { Preguntas_Kostick } = models;

import { pruebaKostick } from "../utils/pruebaKostick.js";

export const todasLasPreguntasKostick = async () => {
  try {
    const preguntas_kostick = await Preguntas_Kostick.findAll({
      order: [
        ["numero_pregunta", "ASC"],
        ["respuesta", "ASC"],
      ],
    });

    if (!preguntas_kostick.length) {
      throw new Error(`No existen preguntas kostick`);
    }

    let preguntasOrdenadas = [];

    for (let i = 0; i < preguntas_kostick.length; i += 2) {
      preguntasOrdenadas.push([preguntas_kostick[i], preguntas_kostick[i + 1]]);
    }

    return preguntasOrdenadas;
  } catch (error) {
    throw new Error(
      `Error al traer todas las preguntas kostick: ${error.message}`
    );
  }
};

export const cargarPreguntasKostick = async () => {
  let t;

  try {
    for (const respuestaObjeto of pruebaKostick) {
      const respuesta = await Preguntas_Kostick.findOne({
        where: {
          numero_pregunta: respuestaObjeto.pregunta,
          respuesta: respuestaObjeto.respuesta,
        },
      });

      if (!respuesta) {
        t = await conn.transaction();

        await Preguntas_Kostick.create(
          {
            numero_pregunta: respuestaObjeto.pregunta,
            respuesta: respuestaObjeto.respuesta,
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

    throw new Error(`Error al crear las preguntas kostick: ${error.message}`);
  }
};
