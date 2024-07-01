const {
  conn,
  Preguntas_Kostick,
  Respuestas_Kostick,
  Pruebas_Empleado,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { traerCurriculoEmpleado } = require("./curriculos_controllers");

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

    const curriculo = await traerCurriculoEmpleado(empleado_id);

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

    const respuestas_kostick = await Pruebas_Empleado.findOne({
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
      `../../public/documentosEmpleados/${empleado.cedula}`
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
    workbook.sheet(0).cell("B6").value(empleado.cedula);

    // Sexo
    workbook.sheet(0).cell("B7").value(empleado.genero);

    // Edad
    workbook.sheet(0).cell("B8").value(edad);

    // Grado Instruccion
    if (curriculo) {
      workbook.sheet(0).cell("B9").value(curriculo.grado_instruccion);
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

    await Pruebas_Empleado.update(
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
      `Error al crear las respuestas de la prueba kostick:`,
      error.message
    );
  }
};

module.exports = {
  crearRespuestasKostick,
};
