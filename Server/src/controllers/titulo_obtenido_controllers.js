const { Curriculo, Titulo_Obtenido } = require("../db");

const todosLosTitulosObtenidos = async () => {
  try {
    const titulos_obtenidos = await Titulo_Obtenido.findAll();

    if (!titulos_obtenidos) {
      return "No existen títulos obtenidos";
    }

    return titulos_obtenidos;
  } catch (error) {
    return "Error al traer todos los títulos obtenidos: ", error.message;
  }
};

const traerTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    return "Datos faltantes";
  }

  try {
    const titulo_obtenido = await Titulo_Obtenido.findByPk(titulo_obtenido_id);

    if (!titulo_obtenido) {
      return "No existe ese título obtenido";
    }

    return titulo_obtenido;
  } catch (error) {
    return "Error al traer el título obtenido: ", error.message;
  }
};

const crearTitulosObtenidos = async (curriculo_id, titulos_obtenidos) => {
  if (!curriculo_id || !titulos_obtenidos) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id);

    if (!curriculo) {
      return "No existe ese curriculo";
    }

    let fallidos = "";

    titulos_obtenidos.forEach(async (titulo) => {
      const [titulo_obtenido, created] = await Titulo_Obtenido.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          nombre: titulo,
        },
        defaults: {
          curriculo_id: curriculo_id,
          nombre: titulo,
        },
      });

      if (!created) {
        if (fallidos === "") {
          fallidos = titulo;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${titulo}`;
          return;
        }
      }
    });

    if (fallidos !== "") {
      return (
        "Estos títulos obtenidos no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    return "Error al crear los títulos obtenidos: ", error.message;
  }
};

const modificarTitulosObtenidos = async (
  titulo_obtenido_id,
  nombre,
  activo
) => {
  if (!titulo_obtenido_id || !nombre || !activo) {
    return "Datos faltantes";
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
    return "Error al modificar el título obtenido: ", error.message;
  }
};

const inactivarTituloObtenido = async (titulo_obtenido_id) => {
  if (!titulo_obtenido_id) {
    return "Datos faltantes";
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
    return "Error al inactivar el título obtenido: ", error.message;
  }
};

module.exports = {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
};
