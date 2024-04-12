const { Empleado, Documentos_Empleado } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const traerAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const anexos = await Documentos_Empleado.findAll({
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

    let fallidos = "";

    for (const key in anexos) {
      const arreglo = anexos[key];

      for (const elemento of arreglo) {
        const [documento, created] = await Documentos_Empleado.findOrCreate({
          where: {
            empleado_id: empleado_id,
            tipo_documento: elemento.fieldname,
            ruta_documento: elemento.path,
          },
          defaults: {
            empleado_id: empleado_id,
            tipo_documento: elemento.fieldname,
            ruta_documento: elemento.path,
          },
        });

        if (!created) {
          if (fallidos === "") {
            fallidos = elemento.originalname;
            return;
          }

          if (fallidos !== "") {
            fallidos = fallidos + ` ${elemento.originalname}`;
            return;
          }
        }
      }
    }

    if (fallidos !== "") {
      throw new Error(
        "Estos anexos no se pudieron guardar porque ya existen: ",
        fallidos
      );
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
