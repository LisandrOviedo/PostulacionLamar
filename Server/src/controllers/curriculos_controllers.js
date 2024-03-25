const { Curriculo, Empleado, Cargo_Titulo, Areas_Interes } = require("../db");

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
          model: Cargo_Titulo,
          attributes: {
            exclude: [
              "curriculo_id",
              "cargo_titulo_id",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: Areas_Interes,
          attributes: {
            exclude: ["activo", "createdAt", "updatedAt"],
          },
          through: {
            attributes: ["area_interes_curriculo_id", "area_interes_otro"],
          },
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
          model: Cargo_Titulo,
          attributes: {
            exclude: [
              "curriculo_id",
              "cargo_titulo_id",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: Areas_Interes,
          attributes: {
            exclude: ["activo", "createdAt", "updatedAt"],
          },
          through: {
            attributes: ["area_interes_curriculo_id", "area_interes_otro"],
          },
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
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  originalname,
  path
) => {
  if (
    !empleado_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !originalname ||
    !path
  ) {
    return "Datos faltantes";
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id);

    if (!empleado) {
      return "No existe ese empleado";
    }

    const [curriculo, created] = await Curriculo.findOrCreate({
      where: { empleado_id: empleado_id },
      defaults: {
        empleado_id: empleado_id,
        grado_instruccion: grado_instruccion,
        titulo_obtenido: titulo_obtenido,
        centro_educativo: centro_educativo,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        nombre_pdf: originalname,
        ruta_pdf: path,
      },
    });

    if (created) {
      return curriculo;
    }

    const fs = require("fs");
    const rutaArchivo = path;

    try {
      fs.unlinkSync(rutaArchivo);
    } catch (error) {
      console.error("Error al eliminar el archivo PDF:", error);
    }

    return "Ya existe un curriculo para ese empleado";
  } catch (error) {
    return "Error al crear el curriculo: ", error.message;
  }
};

const agregarAreasInteres = async (curriculo_id, areas_interes) => {
  for (const objeto of areas_interes) {
    try {
      const [area, created] = await Area_Interes_Curriculo.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          area_interes_id: objeto.area_interes_id,
          area_interes_otro: objeto.nombre_otro,
        },
        defaults: {
          curriculo_id: curriculo_id,
          area_interes_id: objeto.area_interes_id,
          area_interes_otro: objeto.nombre_otro,
        },
      });
    } catch (error) {
      return (
        "Error al agregar el área de interés al curriculo: ", error.message
      );
    }
  }
};

const modificarCurriculo = async (
  curriculo_id,
  grado_instruccion,
  titulo_obtenido,
  centro_educativo,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  originalname,
  path,
  estado,
  activo
) => {
  if (
    !curriculo_id ||
    !grado_instruccion ||
    !titulo_obtenido ||
    !centro_educativo ||
    !disponibilidad_viajar ||
    !disponibilidad_cambio_residencia ||
    !originalname ||
    !path ||
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
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        nombre_pdf: originalname,
        ruta_pdf: path,
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
  agregarAreasInteres,
  modificarCurriculo,
  inactivarCurriculo,
};
