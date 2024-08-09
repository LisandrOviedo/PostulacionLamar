const {
  conn,
  Preguntas_Kostick,
  Respuestas_Kostick,
  Pruebas_Empleados,
  Titulos_Obtenidos,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { todosLosTitulosObtenidos } = require("./titulos_obtenidos_controllers");

const XlsxPopulate = require("xlsx-populate");
const path = require("path");

const { calcularEdad, DDMMYYYY } = require("../utils/formatearFecha");

const { crearCarpetaSiNoExiste } = require("../utils/pruebaKostick");

const crearRespuestasKostick = async (empleado_id, prueba_id, prueba) => {
  if (!empleado_id || !prueba_id || !prueba) {
    throw new Error(`Datos faltantes`);
  }

  let t, t2;

  try {
    t = await conn.transaction();
    t2 = await conn.transaction();

    const empleado = await traerEmpleado(empleado_id);

    const titulos_obtenidos = await todosLosTitulosObtenidos(empleado_id);

    for (const respuesta in prueba) {
      const [respuesta_kostick, created] =
        await Respuestas_Kostick.findOrCreate({
          where: {
            prueba_id: prueba_id,
            pregunta_kostick_id: prueba[respuesta],
          },
          defaults: {
            prueba_id: prueba_id,
            pregunta_kostick_id: prueba[respuesta],
          },
          transaction: t,
        });
    }

    await t.commit();

    const respuestas_kostick = await Pruebas_Empleados.findOne({
      attributes: ["createdAt"],
      include: [
        {
          model: Preguntas_Kostick,
          attributes: ["numero_pregunta", "respuesta"],
          through: {
            attributes: [],
          },
        },
      ],
      where: { prueba_id: prueba_id },
      order: [[Preguntas_Kostick, "numero_pregunta", "ASC"]],
    });

    const excelPath = path.join(__dirname, "../../src/utils/Kostick.xlsx");

    const destPath = path.join(
      __dirname,
      `../../public/documentosEmpleados/${empleado.tipo_identificacion}${empleado.numero_identificacion}`
    );

    crearCarpetaSiNoExiste(destPath);

    const workbook = await XlsxPopulate.fromFileAsync(excelPath);

    const edad = calcularEdad(empleado.fecha_nacimiento);

    workbook.sheet(0).cell("B4").value(respuestas_kostick.createdAt);

    // Nombre completo
    workbook
      .sheet(0)
      .cell("B5")
      .value(`${empleado.nombres} ${empleado.apellidos}`);

    // Cedula
    workbook
      .sheet(0)
      .cell("B6")
      .value(
        `${empleado.tipo_identificacion}${empleado.numero_identificacion}`
      );

    // Sexo
    workbook.sheet(0).cell("B7").value(empleado.sexo);

    // Edad
    workbook.sheet(0).cell("B8").value(edad);

    // Grado Instruccion
    if (titulos_obtenidos) {
      const statusEnum =
        Titulos_Obtenidos.rawAttributes.grado_instruccion.values;

      let grado_nivel = 0;

      for (const titulo of titulos_obtenidos) {
        const selectedStatusIndex = statusEnum.indexOf(
          titulo.grado_instruccion
        );

        if (selectedStatusIndex > grado_nivel) {
          workbook.sheet(0).cell("B9").value(titulo.grado_instruccion);

          grado_nivel = selectedStatusIndex;
        }
      }
    } else {
      workbook.sheet(0).cell("B9").value("");
    }

    // Preguntas_Kostick
    let B = 12;

    for (let i = 0; i < respuestas_kostick.Preguntas_Kosticks.length; i++) {
      workbook
        .sheet(0)
        .cell(`B${B}`)
        .value(respuestas_kostick.Preguntas_Kosticks[i].respuesta);

      B++;
    }

    workbook.toFileAsync(
      `${destPath}/${DDMMYYYY(respuestas_kostick.createdAt)} - Kostick.xlsx`
    );

    await Pruebas_Empleados.update(
      {
        nombre: `${DDMMYYYY(respuestas_kostick.createdAt)} - Kostick.xlsx`,
        ruta: `${destPath}/${DDMMYYYY(
          respuestas_kostick.createdAt
        )} - Kostick.xlsx`,
      },
      {
        where: {
          prueba_id: prueba_id,
        },
        transaction: t2,
      }
    );

    await t2.commit();
  } catch (error) {
    if (!t.finished || !t2.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al crear las respuestas de la prueba kostick: ${error.message}`
    );
  }
};

module.exports = {
  crearRespuestasKostick,
};
