const fs = require("fs");

const { Empleado, Documentos_Empleado } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const traerAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const anexos = await Documentos_Empleado.findAll({
      attributes: {
        exclude: ["documento_empleado_id", "empleado_id", "activo"],
      },
      where: { empleado_id: empleado_id },
    });

    if (!anexos) {
      throw new Error("No existen anexos de ese empleado");
    }

    return anexos;
  } catch (error) {
    throw new Error("Error al traer todos los anexos: " + error.message);
  }
};

const crearAnexos = async (empleado_id, anexos) => {
  if (!empleado_id || !anexos) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    for (const key in anexos) {
      const arreglo = anexos[key];

      for (const elemento of arreglo) {
        const documentosActuales = await Documentos_Empleado.findAll({
          where: {
            empleado_id: empleado_id,
            tipo: elemento.fieldname,
          },
        });

        documentosActuales.forEach((documentoActual) => {
          const rutaArchivo = documentoActual.ruta;

          fs.unlink(rutaArchivo, (error) => {
            if (error) {
              console.error("Error al borrar el archivo:", error);
            }
          });
        });

        await Documentos_Empleado.destroy({
          where: {
            empleado_id: empleado_id,
            tipo: elemento.fieldname,
          },
        });

        await Documentos_Empleado.create({
          empleado_id: empleado_id,
          tipo: elemento.fieldname,
          nombre: elemento.filename,
          ruta: elemento.path,
        });
      }
    }
  } catch (error) {
    throw new Error("Error al crear los anexos: " + error.message);
  }
};

const modificarAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const curriculo = await Curriculo.findOne({
      where: {
        empleado_id: empleado_id,
        activo: true,
      },
      attributes: {
        exclude: ["empleado_id"],
      },
      include: [
        {
          model: Empleado,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Areas_Interes,
          attributes: {
            exclude: ["activo", "createdAt", "updatedAt"],
          },
          through: {
            attributes: ["area_interes_curriculo_id"],
          },
        },
        {
          model: Titulo_Obtenido,
          attributes: {
            exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Experiencia,
          attributes: {
            exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (curriculo) {
      return curriculo;
    }
  } catch (error) {
    throw new Error("Error al modificar los anexos: " + error.message);
  }
};

module.exports = {
  traerAnexos,
  crearAnexos,
  modificarAnexos,
};
