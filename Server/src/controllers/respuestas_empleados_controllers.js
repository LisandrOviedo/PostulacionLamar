const { Empleado, Respuesta, Respuestas_Empleado } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { traerCurriculoEmpleado } = require("./curriculos_controllers");

const XlsxPopulate = require("xlsx-populate");
const path = require("path");
const fs = require("fs");

const { calcularEdad } = require("../utils/formatearFecha");

const todasLasRespuestasEmpleados = async () => {
  try {
    const respuestas_empleados = await Respuestas_Empleado.findAll();

    if (!respuestas_empleados) {
      throw new Error("No existen respuestas de empleados");
    }

    return respuestas_empleados;
  } catch (error) {
    throw new Error(
      "Error al traer todas las respuestas de empleados: " + error.message
    );
  }
};

const traerRespuestasEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const empleado = await traerEmpleado(empleado_id);
    const curriculo = await traerCurriculoEmpleado(empleado_id);

    const respuestas_empleado = await Empleado.findAll({
      attributes: [],
      include: [
        {
          model: Respuesta,
          attributes: ["numero_pregunta", "respuesta", "createdAt"],
          through: {
            attributes: [],
          },
        },
      ],
      where: { empleado_id: empleado_id, activo: true },
      order: [[Respuesta, "numero_pregunta", "ASC"]],
    });

    if (!respuestas_empleado) {
      throw new Error("No existen respuestas del empleado");
    }

    const excelPath = path.join(__dirname, "../../src/utils/");
    const destPath = path.join(
      __dirname,
      `../../public/documentosEmpleados/${empleado.cedula}`
    );

    fs.copyFileSync(
      `${excelPath}/TestKostick.xlsx`,
      `${destPath}/TestKostick.xlsx`
    );

    const workbook = await XlsxPopulate.fromFileAsync(
      `${destPath}/TestKostick.xlsx`
    );

    const edad = calcularEdad(empleado.fecha_nacimiento);

    workbook
      .sheet(0)
      .cell("B4")
      .value(respuestas_empleado[0].Respuesta[89].createdAt);

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

    // Respuestas
    let B = 12;

    for (let i = 0; i < respuestas_empleado[0].Respuesta.length; i++) {
      workbook
        .sheet(0)
        .cell(`B${B}`)
        .value(respuestas_empleado[0].Respuesta[i].respuesta);

      B++;
    }

    workbook.toFileAsync(`${destPath}/TestKostick.xlsx`);

    return respuestas_empleado[0].Respuesta;
  } catch (error) {
    throw new Error(
      "Error al traer las respuestas del empleado: " + error.message
    );
  }
};

const crearRespuestasEmpleado = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error("Datos faltantes");
  }

  let fallidos = "";

  try {
    for (const respuesta in prueba) {
      const [respuesta_empleado, created] =
        await Respuestas_Empleado.findOrCreate({
          where: {
            empleado_id: empleado_id,
            respuesta_id: prueba[respuesta],
          },
          defaults: {
            empleado_id: empleado_id,
            respuesta_id: prueba[respuesta],
          },
        });

      if (!created) {
        if (fallidos === "") {
          fallidos = respuesta;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${respuesta}`;
          return;
        }
      }
    }

    if (fallidos !== "") {
      throw new Error(
        "Estas respuestas no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    throw new Error("Error al crear el respuestas_empleado: " + error.message);
  }
};

const modificarRespuestasEmpleado = async (
  rol_id,
  nombre,
  descripcion,
  activo
) => {
  if (!rol_id || !nombre || !descripcion || !activo) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerRol(rol_id);

    await Respuestas_Empleado.update(
      {
        rol_id: rol_id,
        nombre: nombre,
        descripcion: descripcion,
        activo: activo,
      },
      {
        where: {
          rol_id: rol_id,
        },
      }
    );

    return await traerRol(rol_id);
  } catch (error) {
    throw new Error(
      "Error al modificar el respuestas_empleado: " + error.message
    );
  }
};

const inactivarRespuestasEmpleado = async (rol_id) => {
  if (!rol_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const respuestas_empleado = await traerRol(rol_id);

    await Respuestas_Empleado.update(
      { activo: !respuestas_empleado.activo },
      {
        where: { rol_id: rol_id },
      }
    );

    return await traerRol(rol_id);
  } catch (error) {
    throw new Error(
      "Error al inactivar el respuestas_empleado: " + error.message
    );
  }
};

module.exports = {
  todasLasRespuestasEmpleados,
  traerRespuestasEmpleado,
  crearRespuestasEmpleado,
  modificarRespuestasEmpleado,
  inactivarRespuestasEmpleado,
};
