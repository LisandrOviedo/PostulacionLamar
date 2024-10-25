const {
  conn,
  Vacantes,
  Areas_Interes,
  Vacantes_Empleados,
  Empleados,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todasLasVacantes = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataVacantes } =
      await Vacantes.findAll({
        where: filtros.area_interes_id
          ? { area_interes_id: filtros.area_interes_id }
          : {},
        include: {
          model: Areas_Interes,
          attributes: ["nombre"],
        },
        distinct: true,
        order: [
          filtros.orden_campo ? [filtros.orden_campo, filtros.orden_por] : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const vacantes = dataVacantes.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, vacantes };
  } catch (error) {
    throw new Error(`Error al traer todas las vacantes: ${error.message}`);
  }
};

const traerVacante = async (vacante_id) => {
  if (!vacante_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const vacante = await Vacantes.findByPk(vacante_id, {
      include: {
        model: Areas_Interes,
        attributes: ["nombre"],
      },
    });

    if (!vacante) {
      throw new Error(`No existe esa vacante`);
    }

    return vacante;
  } catch (error) {
    throw new Error(`Error al traer la vacante: ${error.message}`);
  }
};

const traerVacanteEmpleados = async (
  filtros,
  paginaActual,
  limitePorPagina
) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataVacantesEmpleados } =
      await Vacantes_Empleados.findAll({
        include: {
          model: Empleados,
          attributes: ["nombres"],
          where: filtros.numero_identificacion
            ? {
                numero_identificacion: {
                  [Op.like]: `%${filtros.numero_identificacion}%`,
                },
              }
            : filtros.apellidos
            ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
            : {},
          order: [
            filtros.orden_campo === "apellidos"
              ? ["apellidos", filtros.orden_por]
              : filtros.orden_campo === "activo"
              ? ["activo", filtros.orden_por]
              : filtros.orden_campo === "updatedAt"
              ? ["updatedAt", filtros.orden_por]
              : null,
          ].filter(Boolean),
        },
        where: {
          vacante_id: filtros.vacante_id,
        },
        distinct: true,
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const empleados = dataVacantesEmpleados.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, empleados };
  } catch (error) {
    throw new Error(`Error al traer la vacante: ${error.message}`);
  }
};

const crearVacante = async (area_interes_id, descripcion) => {
  if (!area_interes_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [vacante, created] = await Vacantes.findOrCreate({
      where: { area_interes_id: area_interes_id, descripcion: descripcion },
      defaults: {
        area_interes_id: area_interes_id,
        descripcion: descripcion,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return vacante;
    }

    throw new Error(
      `Ya existe una vacante con esa descripción y ese área de interés`
    );
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la vacante: ${error.message}`);
  }
};

const modificarVacante = async (vacante_id, area_interes_id, descripcion) => {
  if (!vacante_id || !area_interes_id || !descripcion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerVacante(vacante_id);

    t = await conn.transaction();

    await Vacantes.update(
      {
        area_interes_id: area_interes_id,
        descripcion: descripcion,
      },
      {
        where: {
          vacante_id: vacante_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerVacante(vacante_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la vacante: ${error.message}`);
  }
};

const inactivarVacante = async (vacante_id) => {
  if (!vacante_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const vacante = await traerVacante(vacante_id);

    t = await conn.transaction();

    await Vacantes.update(
      { activo: !vacante.activo },
      {
        where: { vacante_id: vacante_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerVacante(vacante_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la vacante: ${error.message}`);
  }
};

const postularVacanteEmpleado = async (vacante_id, empleado_id) => {
  if (!vacante_id || !empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerVacante(vacante_id);

    await traerEmpleado(empleado_id);

    t = await conn.transaction();

    await Vacantes_Empleados.create(
      {
        vacante_id: vacante_id,
        empleado_id: empleado_id,
      },
      { transaction: t }
    );

    await t.commit();

    return await traerVacante(vacante_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al postular a la vacante: ${error.message}`);
  }
};

module.exports = {
  todasLasVacantes,
  traerVacante,
  traerVacanteEmpleados,
  crearVacante,
  modificarVacante,
  inactivarVacante,
  postularVacanteEmpleado,
};