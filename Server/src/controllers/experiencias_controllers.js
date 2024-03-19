const { Experiencia, Curriculo, Cargo_Titulo } = require("../db");

const todasLasExperiencias = async () => {
  try {
    const experiencias = await Experiencia.findAll();

    if (experiencias.length === 0) {
      return "No existen experiencias";
    }

    return experiencias;
  } catch (error) {
    return "Error al traer todas las experiencias: ", error.message;
  }
};

const traerExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    return "Datos faltantes";
  }

  try {
    const experiencia = await Experiencia.findByPk(experiencia_id);

    if (experiencia === null) {
      return "No existe esa experiencia";
    }

    return experiencia;
  } catch (error) {
    return "Error al traer la experiencia: ", error.message;
  }
};

const crearExperiencia = async (
  curriculo_id,
  tipo,
  cargo_titulo_id,
  cargo_titulo_otro,
  duracion,
  empresa_centro_educativo
) => {
  if (
    !curriculo_id ||
    !tipo ||
    !cargo_titulo_id ||
    !cargo_titulo_otro ||
    !duracion ||
    !empresa_centro_educativo
  ) {
    return "Datos faltantes";
  }

  try {
    const curriculo = await Curriculo.findByPk(curriculo_id);
    const cargo_titulo = await Cargo_Titulo.findByPk(cargo_titulo_id);

    if (!curriculo) {
      return "No existe ese curriculo";
    }

    if (!cargo_titulo) {
      return "No existe ese cargo / título";
    }

    const [experiencia, created] = await Experiencia.findOrCreate({
      where: {
        curriculo_id: curriculo_id,
        tipo: tipo,
        cargo_titulo_id: cargo_titulo_id,
        cargo_titulo_otro: cargo_titulo_otro,
        empresa_centro_educativo: empresa_centro_educativo,
      },
      defaults: {
        curriculo_id: curriculo_id,
        tipo: tipo,
        cargo_titulo_id: cargo_titulo_id,
        cargo_titulo_otro: cargo_titulo_otro,
        duracion: duracion,
        empresa_centro_educativo: empresa_centro_educativo,
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

const modificarExperiencia = async (
  experiencia_id,
  tipo,
  cargo_titulo_id,
  cargo_titulo_otro,
  duracion,
  empresa_centro_educativo,
  inactivo
) => {
  if (
    !experiencia_id ||
    !tipo ||
    !cargo_titulo_id ||
    !cargo_titulo_otro ||
    !duracion ||
    !empresa_centro_educativo ||
    !inactivo
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
        inactivo: inactivo,
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

const inactivarExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    return "Datos faltantes";
  }

  try {
    const experiencia = await traerExperiencia(experiencia_id);

    await Experiencia.update(
      { inactivo: !experiencia.inactivo },
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
  todasLasExperiencias,
  traerExperiencia,
  crearExperiencia,
  modificarExperiencia,
  inactivarExperiencia,
};
