const {
  Curriculo,
  Empleado,
  Titulo_Obtenido,
  Areas_Interes,
  Experiencia,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todosLosCurriculos = async (
  filters,
  orders,
  paginaActual,
  limitePorPagina
) => {
  const offset = (paginaActual - 1) * limitePorPagina;

  try {
    const curriculos = await Curriculo.findAll({
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
      where: { name: "hola" },
      order: [orders],
      offset,
      limit: limitePorPagina,
    });

    if (!curriculos) {
      throw new Error("No existen curriculos");
    }

    return curriculos;
  } catch (error) {
    throw new Error("Error al traer todos los curriculos: " + error.message);
  }
};

const traerCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const curriculo = await Curriculo.findOne({
      where: {
        curriculo_id: curriculo_id,
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

    if (!curriculo) {
      throw new Error("No existe ese curriculo");
    }

    return curriculo;
  } catch (error) {
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const traerCurriculoEmpleado = async (empleado_id) => {
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
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const crearCurriculo = async (
  empleado_id,
  grado_instruccion,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  cantidad_hijos,
  habilidades_tecnicas
) => {
  if (!empleado_id || !grado_instruccion) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const [curriculo, created] = await Curriculo.findOrCreate({
      where: { empleado_id: empleado_id },
      defaults: {
        empleado_id: empleado_id,
        grado_instruccion: grado_instruccion,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        cantidad_hijos: cantidad_hijos,
        habilidades_tecnicas: habilidades_tecnicas,
      },
    });

    if (created) {
      return curriculo;
    }

    throw new Error("Ya existe un curriculo para ese empleado");
  } catch (error) {
    throw new Error("Error al crear el curriculo: " + error.message);
  }
};

const modificarCurriculo = async (
  curriculo_id,
  grado_instruccion,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  cantidad_hijos,
  habilidades_tecnicas
) => {
  if (!curriculo_id || !grado_instruccion) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    await Curriculo.update(
      {
        grado_instruccion: grado_instruccion,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        cantidad_hijos: cantidad_hijos,
        habilidades_tecnicas: habilidades_tecnicas,
        estado: "Pendiente por revisar",
      },
      {
        where: {
          curriculo_id: curriculo_id,
        },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    throw new Error("Error al modificar el curriculo: " + error.message);
  }
};

const inactivarCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const curriculo = await traerCurriculo(curriculo_id);

    await Curriculo.update(
      { activo: !curriculo.activo },
      {
        where: { curriculo_id: curriculo_id },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    throw new Error("Error al inactivar el curriculo: " + error.message);
  }
};

module.exports = {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoEmpleado,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
};
