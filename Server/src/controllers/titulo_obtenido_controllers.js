const { Titulo_Obtenido } = require("../db");

const { traerCurriculo } = require("./curriculos_controllers");

const todosLosTitulosObtenidos = async () => {
  try {
    const titulos_obtenidos = await Titulo_Obtenido.findAll();

    if (!titulos_obtenidos) {
      throw new Error("No existen títulos obtenidos");
    }

    return titulos_obtenidos;
  } catch (error) {
    throw new Error(
      "Error al traer todos los títulos obtenidos: " + error.message
    );
  }
};

const traerTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const titulo_obtenido = await Titulo_Obtenido.findByPk(titulo_obtenido_id);

    if (!titulo_obtenido) {
      throw new Error("No existe ese título obtenido");
    }

    return titulo_obtenido;
  } catch (error) {
    throw new Error("Error al traer el título obtenido: " + error.message);
  }
};

const crearTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  if (!curriculo_id || !titulos_obtenidos) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    let fallidos = "";

    titulos_obtenidos.forEach(async (titulo) => {
      const [titulo_obtenido, created] = await Titulo_Obtenido.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          nombre: titulo.nombre,
        },
        defaults: {
          curriculo_id: curriculo_id,
          nombre: titulo.nombre,
        },
      });

      if (!created) {
        if (fallidos === "") {
          fallidos = titulo.nombre;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${titulo.nombre}`;
          return;
        }
      }
    });

    if (fallidos !== "") {
      throw new Error(
        "Estos títulos obtenidos no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    throw new Error("Error al crear los títulos obtenidos: " + error.message);
  }
};

const modificarTitulosObtenidos = async (
  titulo_obtenido_id,
  nombre,
  activo
) => {
  if (!titulo_obtenido_id || !nombre || !activo) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerTituloObtenido(titulo_obtenido_id);

    await Titulo_Obtenido.update(
      {
        nombre: nombre,
        activo: activo,
      },
      {
        where: {
          titulo_obtenido_id: titulo_obtenido_id,
        },
      }
    );

    return await traerTituloObtenido(titulo_obtenido_id);
  } catch (error) {
    throw new Error("Error al modificar el título obtenido: " + error.message);
  }
};

const inactivarTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const titulo_obtenido = await traerTituloObtenido(titulo_obtenido_id);

    await Titulo_Obtenido.update(
      { activo: !titulo_obtenido.activo },
      {
        where: { titulo_obtenido_id: titulo_obtenido_id },
      }
    );

    return await traerTituloObtenido(titulo_obtenido_id);
  } catch (error) {
    throw new Error("Error al inactivar el título obtenido: " + error.message);
  }
};

const eliminarTitulosCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    await Titulo_Obtenido.destroy({
      where: {
        curriculo_id: curriculo_id,
      },
    });
  } catch (error) {
    throw new Error(
      "Error al eliminar los títulos obtenidos: " + error.message
    );
  }
};

module.exports = {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
  eliminarTitulosCurriculo,
};
