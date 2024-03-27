const { Areas_Interes, Area_Interes_Curriculo, Curriculo } = require("../db");

const todosLosAreaInteres = async () => {
  try {
    const areas_interes = await Areas_Interes.findAll();

    if (!areas_interes) {
      return "No existen áreas de interés";
    }

    return areas_interes;
  } catch (error) {
    return "Error al traer todas las áreas de interés: ", error.message;
  }
};

const traerAreaInteres = async (area_interes_id) => {
  if (!area_interes_id) {
    return "Datos faltantes";
  }

  try {
    const area_interes = await Areas_Interes.findByPk(area_interes_id);

    if (!area_interes) {
      return "No existe esa área de interés";
    }

    return area_interes;
  } catch (error) {
    return "Error al traer el área de interés: ", error.message;
  }
};

const crearAreaInteres = async (nombre) => {
  if (!nombre) {
    return "Datos faltantes";
  }

  try {
    const [area_interes, created] = await Areas_Interes.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
      },
    });

    if (created) {
      return area_interes;
    }

    return "Ya existe un área de interés con ese nombre";
  } catch (error) {
    return "Error al crear el área de interés: ", error.message;
  }
};

const modificarAreaInteres = async (area_interes_id, nombre, activo) => {
  if (!area_interes_id || !nombre || !activo) {
    return "Datos faltantes";
  }

  try {
    await traerAreaInteres(area_interes_id);

    await Areas_Interes.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          area_interes_id: area_interes_id,
        },
      }
    );

    return await traerAreaInteres(area_interes_id);
  } catch (error) {
    return "Error al modificar el área de interés: ", error.message;
  }
};

const inactivarAreaInteres = async (area_interes_id) => {
  if (!area_interes_id) {
    return "Datos faltantes";
  }

  try {
    const area_interes = await traerAreaInteres(area_interes_id);

    await Areas_Interes.update(
      { activo: !area_interes.activo },
      {
        where: { area_interes_id: area_interes_id },
      }
    );

    return await traerAreaInteres(area_interes_id);
  } catch (error) {
    return "Error al inactivar el área de interés: ", error.message;
  }
};

const agregarAreasInteresCurriculo = async (curriculo_id, areas_interes) => {
  if (!curriculo_id || !areas_interes) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id);

    if (!curriculo) {
      return "No existe ese curriculo";
    }

    let fallidos = "";

    areas_interes.forEach(async (area) => {
      const [area_interes, created] = await Area_Interes_Curriculo.findOrCreate(
        {
          where: {
            curriculo_id: curriculo_id,
            area_interes_id: area.area_interes_id,
          },
          defaults: {
            curriculo_id: curriculo_id,
            area_interes_id: area.area_interes_id,
          },
        }
      );

      if (!created) {
        if (fallidos === "") {
          fallidos = area.nombre;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${area.nombre}`;
          return;
        }
      }
    });
  } catch (error) {
    return "Error al agregar el área de interés al curriculo: ", error.message;
  }
};

module.exports = {
  todosLosAreaInteres,
  traerAreaInteres,
  crearAreaInteres,
  modificarAreaInteres,
  inactivarAreaInteres,
  agregarAreasInteresCurriculo,
};
