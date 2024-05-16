const { Respuestas_Empleado } = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

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

  await traerEmpleado(empleado_id);

  try {
    const respuestas_empleado = await Respuestas_Empleado.findAll({
      where: { empleado_id: empleado_id, activo: true },
    });

    if (!respuestas_empleado) {
      throw new Error("No existen respuestas del empleado");
    }

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
