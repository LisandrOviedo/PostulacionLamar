const fs = require("fs");

const { conn, Documentos_Empleados } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const { fechaHoraActual } = require("../utils/formatearFecha");

const traerAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    await traerEmpleado(empleado_id);

    const anexos = await Documentos_Empleados.findAll({
      attributes: {
        exclude: ["documento_empleado_id", "empleado_id", "activo"],
      },
      where: { empleado_id: empleado_id },
    });

    return anexos;
  } catch (error) {
    throw new Error(`Error al traer todos los anexos: ${error.message}`);
  }
};

const crearAnexos = async (empleado_id, anexos) => {
  if (!empleado_id || !anexos) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    for (const key in anexos) {
      const arreglo = anexos[key];

      for (const elemento of arreglo) {
        const documentosActuales = await Documentos_Empleados.findAll({
          where: {
            empleado_id: empleado_id,
            tipo: elemento.fieldname,
          },
        });

        documentosActuales.forEach((documentoActual) => {
          const rutaArchivo = documentoActual.ruta;

          fs.unlink(rutaArchivo, (error) => {
            if (error) {
              console.error(
                `${fechaHoraActual()} - Error al borrar el archivo:`,
                error
              );
            }
          });
        });

        await Documentos_Empleados.destroy({
          where: {
            empleado_id: empleado_id,
            tipo: elemento.fieldname,
          },
          transaction: t,
        });

        await Documentos_Empleados.create(
          {
            empleado_id: empleado_id,
            tipo: elemento.fieldname,
            nombre: elemento.filename,
            ruta: elemento.path,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los anexos: ${error.message}`);
  }
};

const crearCurriculoPDF = async (empleado_id, filename, pdf_path) => {
  if (!filename || !pdf_path) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const pdf_actual = await Documentos_Empleados.findOne({
      where: {
        empleado_id: empleado_id,
        tipo: "perfil_pdf",
      },
    });

    if (pdf_actual) {
      await Documentos_Empleados.update(
        {
          nombre: filename,
          ruta: pdf_path,
        },
        {
          where: {
            empleado_id: empleado_id,
            tipo: "perfil_pdf",
          },
          transaction: t,
        }
      );
    } else {
      await Documentos_Empleados.findOrCreate({
        where: {
          empleado_id: empleado_id,
          tipo: "perfil_pdf",
        },
        defaults: {
          empleado_id: empleado_id,
          tipo: "perfil_pdf",
          nombre: filename,
          ruta: pdf_path,
        },
        transaction: t,
      });
    }

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el anexo: ${error.message}`);
  }
};

module.exports = {
  traerAnexos,
  crearAnexos,
  crearCurriculoPDF,
};
