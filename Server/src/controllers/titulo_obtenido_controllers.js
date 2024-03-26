const { Curriculo, Titulo_Obtenido } = require("../db");

const todosLosTitulosObtenidos = async (curriculo_id) => {
  try {
    const titulos_obtenidos = await Titulo_Obtenido.findAll({
      where: { curriculo_id: curriculo_id },
    });

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


    const [titulo_obtenido, created] = await Titulo_Obtenido.findOrCreate({
      where: {
        curriculo_id: curriculo_id,
        nombre: titulos_obtenidos,
      },
      defaults: {
        curriculo_id: curriculo_id,
        nombre: titulos_obtenidos,
      },
    });

    if (created) {
      return experiencia;
    }

    return "Ya existe una experiencia con esas características";
  } catch (error) {
    return "Error al crear la experiencia: ", error.message;
  }
};

const modificarTitulosObtenidos = async (
  experiencia_id,
  tipo,
  cargo_titulo_id,
  cargo_titulo_otro,
  duracion,
  empresa_centro_educativo,
  activo
) => {
  if (
    !experiencia_id ||
    !tipo ||
    !cargo_titulo_id ||
    !cargo_titulo_otro ||
    !duracion ||
    !empresa_centro_educativo ||
    !activo
  ) {
    return "Datos faltantes";
  }

  try {
    await traerExperiencia(experiencia_id);

    await Experiencia.update(
      {
        tipo: tipo,
        cargo_titulo_id: cargo_titulo_id,
        cargo_titulo_otro: cargo_titulo_otro,
        duracion: duracion,
        empresa_centro_educativo: empresa_centro_educativo,
        activo: activo,
      },
      {
        where: {
          experiencia_id: experiencia_id,
        },
      }
    );

    return await traerExperiencia(experiencia_id);
  } catch (error) {
    return "Error al modificar la experiencia: ", error.message;
  }
};

const inactivarTituloObtenido = async (experiencia_id) => {
  if (!experiencia_id) {
    return "Datos faltantes";
  }

  try {
    const experiencia = await traerExperiencia(experiencia_id);

    await Experiencia.update(
      { activo: !experiencia.activo },
      {
        where: { experiencia_id: experiencia_id },
      }
    );

    return await traerExperiencia(experiencia_id);
  } catch (error) {
    return "Error al inactivar la experiencia: ", error.message;
  }
};

module.exports = {
  todosLosTitulosObtenidos,
  traerTituloObtenido,
  crearTitulosObtenidos,
  modificarTitulosObtenidos,
  inactivarTituloObtenido,
};
