const { Op } = require("sequelize");

const { Empleado, Respuesta, Respuestas_Empleado } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { traerCurriculoEmpleado } = require("./curriculos_controllers");

const XlsxPopulate = require("xlsx-populate");
const path = require("path");
const fs = require("fs");

const { calcularEdad } = require("../utils/formatearFecha");

const todasLasRespuestasEmpleados = async (
  filtros,
  paginaActual,
  limitePorPagina
) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error("Datos faltantes");
  }

  try {
    const { count: totalRegistros, rows: dataPruebas } =
      await Empleado.findAndCountAll({
        attributes: [
          "empleado_id",
          "nombres",
          "apellidos",
          "cedula",
          "telefono",
          "correo",
          "activo",
        ],
        include: [
          {
            model: Respuesta,
            attributes: [],
            required: true,
          },
        ],
        where: {
          [Op.and]: [
            filtros.cedula
              ? { cedula: { [Op.like]: `%${filtros.cedula}%` } }
              : filtros.apellidos
              ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
              : {},
            filtros.activo === "1" || filtros.activo === "0"
              ? { activo: filtros.activo }
              : {},
          ],
        },
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? ["apellidos", filtros.orden_por]
            : filtros.orden_campo === "activo"
            ? ["activo", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    if (!dataPruebas.length) {
      throw new Error("No existen respuestas de empleados");
    }

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const pruebas = dataPruebas.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, pruebas };
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
    await traerEmpleado(empleado_id);

    const respuestas_empleado = await Empleado.findAll({
      attributes: [],
      include: [
        {
          model: Respuesta,
          attributes: ["numero_pregunta", "respuesta", "createdAt"],
          through: {
            attributes: [],
          },
          required: true,
        },
      ],
      where: { empleado_id: empleado_id, activo: true },
      order: [[Respuesta, "numero_pregunta", "ASC"]],
    });

    return respuestas_empleado;
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

  try {
    const empleado = await traerEmpleado(empleado_id);

    const curriculo = await traerCurriculoEmpleado(empleado_id);

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
    }

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

    workbook.toFileAsync(`${destPath}/TestKostick.xlsx`, {
      password: `${empleado.cedula}`,
    });
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
