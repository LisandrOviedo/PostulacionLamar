const { Experiencia } = require("../db");

const { traerCurriculo } = require("./curriculos_controllers");

const todasLasExperiencias = async () => {
  try {
    const experiencias = await Experiencia.findAll();

    if (!experiencias) {
      throw new Error("No existen experiencias");
    }

    return experiencias;
  } catch (error) {
    throw new Error("Error al traer todas las experiencias: " + error.message);
  }
};

const traerExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const experiencia = await Experiencia.findByPk(experiencia_id);

    if (!experiencia) {
      throw new Error("No existe esa experiencia");
    }

    return experiencia;
  } catch (error) {
    throw new Error("Error al traer la experiencia: " + error.message);
  }
};

const crearExperiencia = async (curriculo_id, experiencias) => {
  if (!curriculo_id || !experiencias) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    let fallidos = "";

    experiencias.forEach(async (exp) => {
      const [experiencia, created] = await Experiencia.findOrCreate({
        where: {
          curriculo_id: curriculo_id,
          tipo: exp.tipo,
          cargo_titulo: exp.cargo_titulo,
          empresa_centro_educativo: exp.empresa_centro_educativo,
        },
        defaults: {
          curriculo_id: curriculo_id,
          tipo: exp.tipo,
          cargo_titulo: exp.cargo_titulo,
          duracion: exp.duracion,
          empresa_centro_educativo: exp.empresa_centro_educativo,
        },
      });

      if (!created) {
        if (fallidos === "") {
          fallidos = exp.cargo_titulo;
          return;
        }

        if (fallidos !== "") {
          fallidos = fallidos + ` ${exp.cargo_titulo}`;
          return;
        }
      }
    });

    if (fallidos !== "") {
      throw new Error(
        "Estos cargos laborales / títulos de curso no se pudieron guardar porque ya existen: ",
        fallidos
      );
    }
  } catch (error) {
    throw new Error("Error al crear las experiencias: " + error.message);
  }
};

const modificarExperiencia = async (
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
    throw new Error("Datos faltantes");
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
    throw new Error("Error al modificar la experiencia: " + error.message);
  }
};

const inactivarExperiencia = async (experiencia_id) => {
  if (!experiencia_id) {
    throw new Error("Datos faltantes");
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
    throw new Error("Error al inactivar la experiencia: " + error.message);
  }
};

const eliminarExperienciasCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    await Experiencia.destroy({
      where: {
        curriculo_id: curriculo_id,
      },
    });
  } catch (error) {
    throw new Error("Error al eliminar las experiencias: " + error.message);
  }
};

module.exports = {
  todasLasExperiencias,
  traerExperiencia,
  crearExperiencia,
  modificarExperiencia,
  inactivarExperiencia,
  eliminarExperienciasCurriculo,
};
