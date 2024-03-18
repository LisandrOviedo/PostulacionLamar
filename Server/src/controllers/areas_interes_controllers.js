const { Areas_Interes } = require("../db");

const todosLosAreaInteres = async () => {
  try {
    const areas_interes = await Areas_Interes.findAll();

    if (areas_interes.length === 0) {
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

    if (area_interes === null) {
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

const modificarAreaInteres = async (area_interes_id, nombre, inactivo) => {
  if (!area_interes_id || !nombre || !inactivo) {
    return "Datos faltantes";
  }

  try {
    await traerAreaInteres(area_interes_id);

    await Areas_Interes.update(
      {
        nombre: nombre,
        inactivo: inactivo,
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
      { inactivo: !area_interes.inactivo },
      {
        where: { area_interes_id: area_interes_id },
      }
    );

    return await traerAreaInteres(area_interes_id);
  } catch (error) {
    return "Error al inactivar el área de interés: ", error.message;
  }
};

module.exports = {
  todosLosAreaInteres,
  traerAreaInteres,
  crearAreaInteres,
  modificarAreaInteres,
  inactivarAreaInteres,
};
