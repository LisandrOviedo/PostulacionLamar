const {
  Curriculo,
  Empleado,
  Areas_Interes,
  Experiencia,
  Cargo_Titulo,
} = require("../db");

const todosLosCurriculos = async () => {
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
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Experiencia,
          attributes: {
            exclude: [
              "curriculo_id",
              "cargo_titulo_id",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: Cargo_Titulo,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    if (curriculos.length === 0) {
      return "No existen curriculos";
    }

    return curriculos;
  } catch (error) {
    return "Error al traer todos los curriculos: ", error.message;
  }
};

const traerCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id, {
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
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Experiencia,
          attributes: {
            exclude: [
              "curriculo_id",
              "cargo_titulo_id",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: Cargo_Titulo,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    if (curriculo === null) {
      return "No existe ese curriculo";
    }

    return curriculo;
  } catch (error) {
    return "Error al traer el curriculo: ", error.message;
  }
};

const crearCurriculo = async (
  empleado_id,
  grado_instruccion,
  titulo_obtenido,
  centro_educativo,
  area_interes_id,
  area_interes_otro,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  ruta_pdf,
  estado
) => {
  if (
    !empleado_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !area_interes_id ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !ruta_pdf
  ) {
    return "Datos faltantes";
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id);
    const area_interes = await Areas_Interes.findByPk(area_interes_id);

    if (!empleado) {
      return "No existe ese empleado";
    }

    if (!area_interes) {
      return "No existe ese área de interés";
    }

    const [curriculo, created] = await Curriculo.findOrCreate({
      where: { empleado_id: empleado_id },
      defaults: {
        empleado_id: empleado_id,
        grado_instruccion: grado_instruccion,
        titulo_obtenido: titulo_obtenido,
        centro_educativo: centro_educativo,
        area_interes_id: area_interes_id,
        area_interes_otro: area_interes_otro,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        ruta_pdf: ruta_pdf,
      },
    });

    if (created) {
      return curriculo;
    }

    return "Ya existe un curriculo para ese empleado";
  } catch (error) {
    return "Error al crear el curriculo: ", error.message;
  }
};

const modificarCurriculo = async (
  curriculo_id,
  grado_instruccion,
  titulo_obtenido,
  centro_educativo,
  area_interes_id,
  area_interes_otro,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  ruta_pdf,
  estado,
  activo
) => {
  if (
    !curriculo_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !area_interes_id ||
    !area_interes_otro ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !ruta_pdf ||
    !estado ||
    !activo
  ) {
    return "Datos faltantes";
  }

  try {
    await traerCurriculo(curriculo_id);

    await Curriculo.update(
      {
        grado_instruccion: grado_instruccion,
        titulo_obtenido: titulo_obtenido,
        centro_educativo: centro_educativo,
        area_interes_id: area_interes_id,
        area_interes_otro: area_interes_otro,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        ruta_pdf: ruta_pdf,
        estado: estado,
        activo: activo,
      },
      {
        where: {
          curriculo_id: curriculo_id,
        },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    return "Error al modificar el curriculo: ", error.message;
  }
};

const inactivarCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    return "Datos faltantes";
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
    return "Error al inactivar el curriculo: ", error.message;
  }
};

module.exports = {
  todosLosCurriculos,
  traerCurriculo,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
};
