const { Areas_Interes, Area_Interes_Curriculo, Curriculo } = require("../db");

const todosLosAreaInteres = async () => {
  try {
    const areas_interes = await Areas_Interes.findAll();

    if (!areas_interes) {
      throw new Error("No existen áreas de interés");
    }

    return areas_interes;
  } catch (error) {
    throw new Error(
      "Error al traer todas las áreas de interés: ",
      error.message
    );
  }
};

const todosLosAreaInteresActivas = async () => {
  try {
    const areas_interes = await Areas_Interes.findAll({
      where: { activo: true },
    });

    if (!areas_interes) {
      throw new Error("No existen áreas de interés");
    }

    return areas_interes;
  } catch (error) {
    throw new Error(
      "Error al traer todas las áreas de interés: ",
      error.message
    );
  }
};

const traerAreaInteres = async (area_interes_id) => {
  if (!area_interes_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const area_interes = await Areas_Interes.findByPk(area_interes_id);

    if (!area_interes) {
      throw new Error("No existe esa área de interés");
    }

    return area_interes;
  } catch (error) {
    throw new Error("Error al traer el área de interés: ", error.message);
  }
};

const crearAreaInteres = async (nombre) => {
  if (!nombre) {
    throw new Error("Datos faltantes");
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

    throw new Error("Ya existe un área de interés con ese nombre");
  } catch (error) {
    throw new Error("Error al crear el área de interés: ", error.message);
  }
};

const modificarAreaInteres = async (area_interes_id, nombre, activo) => {
  if (!area_interes_id || !nombre || !activo) {
    throw new Error("Datos faltantes");
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
    throw new Error("Error al modificar el área de interés: ", error.message);
  }
};

const inactivarAreaInteres = async (area_interes_id) => {
  if (!area_interes_id) {
    throw new Error("Datos faltantes");
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
    throw new Error("Error al inactivar el área de interés: ", error.message);
  }
};

const agregarAreasInteresCurriculo = async (curriculo_id, areas_interes) => {
  if (!curriculo_id || !areas_interes) {
    throw new Error("Datos faltantes");
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id);

    if (!curriculo) {
      throw new Error("No existe ese curriculo");
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

    if (fallidos !== "") {
      throw new Error(
        "Estas áreas de interés no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    throw new Error(
      "Error al agregar el área de interés al curriculo: ",
      error.message
    );
  }
};

module.exports = {
  todosLosAreaInteres,
  todosLosAreaInteresActivas,
  traerAreaInteres,
  crearAreaInteres,
  modificarAreaInteres,
  inactivarAreaInteres,
  agregarAreasInteresCurriculo,
};
