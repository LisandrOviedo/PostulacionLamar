const { Idioma, Idiomas_Curriculo } = require("../db");

const { traerCurriculo } = require("./curriculos_controllers");

const todosLosIdiomas = async () => {
  try {
    const idiomas = await Idioma.findAll();

    if (!idiomas) {
      throw new Error("No existen idiomas");
    }

    return idiomas;
  } catch (error) {
    throw new Error("Error al traer todos los idiomas: " + error.message);
  }
};

const todosLosIdiomasActivos = async () => {
  try {
    const idiomas = await Idioma.findAll({
      where: { activo: true },
    });

    if (!idiomas) {
      throw new Error("No existen idiomas");
    }

    return idiomas;
  } catch (error) {
    throw new Error("Error al traer todos los idiomas: " + error.message);
  }
};

const traerIdioma = async (idioma_id) => {
  if (!idioma_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const idioma = await Idioma.findByPk(idioma_id);

    if (!idioma) {
      throw new Error("No existe esa idioma");
    }

    return idioma;
  } catch (error) {
    throw new Error("Error al traer el idioma: " + error.message);
  }
};

const crearIdioma = async (nombre) => {
  if (!nombre) {
    throw new Error("Datos faltantes");
  }

  try {
    const [idioma, created] = await Idioma.findOrCreate({
      where: {
        nombre: nombre,
      },
      defaults: {
        nombre: nombre,
      },
    });

    if (created) {
      return area_interes;
    }

    throw new Error("Ya existe un idioma con ese nombre");
  } catch (error) {
    throw new Error("Error al crear el idioma: " + error.message);
  }
};

const modificarIdioma = async (idioma_id, nombre, activo) => {
  if (!idioma_id || !nombre || !activo) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerIdioma(idioma_id);

    await Idioma.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          idioma_id: idioma_id,
        },
      }
    );

    return await traerIdioma(idioma_id);
  } catch (error) {
    throw new Error("Error al modificar el idioma: " + error.message);
  }
};

const inactivarIdioma = async (idioma_id) => {
  if (!idioma_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const idioma = await traerIdioma(idioma_id);

    await Idioma.update(
      { activo: !idioma.activo },
      {
        where: { idioma_id: idioma_id },
      }
    );

    return await traerIdioma(idioma_id);
  } catch (error) {
    throw new Error("Error al inactivar el idioma: " + error.message);
  }
};

const agregarIdiomasCurriculo = async (curriculo_id, idiomas) => {
  if (!curriculo_id || !idiomas) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    let fallidos = "";

    idiomas.forEach(async (idioma) => {
      const [crearIdioma, created] = await Idiomas_Curriculo.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          idioma_id: idioma.idioma_id,
        },
        defaults: {
          curriculo_id: curriculo_id,
          idioma_id: idioma.idioma_id,
        },
      });

      if (!created) {
        if (fallidos === "") {
          fallidos = idioma.nombre;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${idioma.nombre}`;
          return;
        }
      }
    });

    if (fallidos !== "") {
      throw new Error(
        "Estos idiomas no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    throw new Error(
      "Error al agregar el idioma al curriculo: " + error.message
    );
  }
};

const eliminarIdiomasCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    await Idiomas_Curriculo.destroy({
      where: {
        curriculo_id: curriculo_id,
      },
    });
  } catch (error) {
    throw new Error("Error al eliminar los idiomas: " + error.message);
  }
};

module.exports = {
  todosLosIdiomas,
  traerIdioma,
  todosLosIdiomasActivos,
  crearIdioma,
  modificarIdioma,
  inactivarIdioma,
  agregarIdiomasCurriculo,
  eliminarIdiomasCurriculo,
};
