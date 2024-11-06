const { Op } = require("sequelize");

const {
  conn,
  Vacantes,
  Areas_Interes,
  Vacantes_Empleados,
  Empleados,
  Documentos_Empleados,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todasLasVacantes = async (
  paginaActual,
  limitePorPagina,
  buscar_por,
  buscar,
  orden_campo,
  orden_por,
  area_interes_id,
  activo
) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  let condicionesVacantes = {};

  if (buscar_por && buscar) {
    condicionesVacantes[buscar_por] = { [Op.like]: `%${buscar}%` };
  }

  if (area_interes_id) {
    condicionesVacantes.area_interes_id = area_interes_id;
  }

  if (activo) {
    condicionesVacantes.activo = activo;
  }

  try {
    const { count: totalRegistros, rows: dataVacantes } =
      await Vacantes.findAndCountAll({
        where: condicionesVacantes,
        include: [
          { model: Areas_Interes, attributes: ["nombre"] },
          {
            model: Empleados,
            as: "CreadoPor",
            attributes: [
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
          },
          {
            model: Vacantes_Empleados,
          },
        ],
        distinct: true,
        order: [orden_campo ? [orden_campo, orden_por] : null].filter(Boolean),
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

const traerVacante = async (
  vacante_id,
  paginaActual,
  limitePorPagina,
  buscar_por,
  buscar,
  orden_campo,
  orden_por,
  activo
) => {
  if (!vacante_id || !paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  let condicionesEmpleados = {};

  if (buscar_por && buscar) {
    condicionesEmpleados[buscar_por] = { [Op.like]: `%${buscar}%` };
  }

  if (activo) {
    condicionesEmpleados.activo = activo;
  }

  try {
    const vacante = await Vacantes.findByPk(vacante_id, {
      include: [
        { model: Areas_Interes, attributes: ["nombre"] },
        {
          model: Empleados,
          as: "CreadoPor",
          attributes: [
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
        },
        { model: Vacantes_Empleados },
      ],
    });

    const { count: totalRegistros, rows: dataPostulanciones } =
      await Vacantes_Empleados.findAndCountAll({
        where: { vacante_id: vacante_id },
        include: [
          {
            model: Empleados,
            where: condicionesEmpleados,
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
              "telefono",
              "correo",
              "activo",
              "updatedAt",
            ],
            include: {
              model: Documentos_Empleados,
              attributes: ["tipo", "nombre"],
              where: { tipo: "perfil_pdf" },
              required: false,
            },
          },
        ],
        distinct: true,
        order: [orden_campo ? [orden_campo, orden_por] : null].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const postulaciones = dataPostulanciones.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, vacante, postulaciones };
  } catch (error) {
    throw new Error(`Error al traer la vacante: ${error.message}`);
  }
};

const traerPostulacionesEmpleado = async (
  empleado_id,
  paginaActual,
  limitePorPagina,
  buscar_por,
  buscar,
  area_interes_id,
  orden_campo,
  orden_por
) => {
  if (!empleado_id || !paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  let condicionesVacantes = {};

  if (buscar_por && buscar) {
    condicionesVacantes[buscar_por] = { [Op.like]: `%${buscar}%` };
  }

  if (area_interes_id) {
    condicionesVacantes.area_interes_id = {
      [Op.like]: `%${area_interes_id}%`,
    };
  }

  try {
    const { count: totalRegistros, rows: dataPostulacionesEmpleado } =
      await Vacantes_Empleados.findAndCountAll({
        where: { empleado_id: empleado_id },
        include: [
          {
            model: Vacantes,
            include: [
              { model: Empleados, as: "CreadoPor" },
              { model: Areas_Interes },
            ],
          },
          {
            model: Empleados,
          },
          { model: Empleados, as: "RevisadoPor" },
        ],
        distinct: true,
        order: [
          orden_campo === "area_interes_id"
            ? [Areas_Interes, orden_campo, orden_por]
            : orden_campo
            ? [orden_campo, orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;
    const postulaciones = dataPostulacionesEmpleado.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);
    return { cantidadPaginas, totalRegistros, postulaciones };
  } catch (error) {
    throw new Error(
      `Error al traer las postulaciones del empleado: ${error.message}`
    );
  }
};

const crearVacante = async (
  area_interes_id,
  nombre,
  descripcion,
  ubicacion
) => {
  if (!area_interes_id || !nombre || !descripcion || !ubicacion) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await Vacantes.create(
      {
        area_interes_id: area_interes_id,
        nombre: nombre,
        descripcion: descripcion,
        ubicacion: ubicacion,
      },
      { transaction: t }
    );

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la vacante: ${error.message}`);
  }
};

const modificarVacante = async (
  vacante_id,
  area_interes_id,
  nombre,
  descripcion,
  ubicacion
) => {
  if (
    !vacante_id ||
    !area_interes_id ||
    !nombre ||
    !descripcion ||
    !ubicacion
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerVacante(vacante_id);

    t = await conn.transaction();

    await Vacantes.update(
      {
        area_interes_id: area_interes_id,
        nombre: nombre,
        descripcion: descripcion,
        ubicacion: ubicacion,
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
    await traerEmpleado(empleado_id);

    t = await conn.transaction();

    const [vacanteEmpleado, created] = await Vacantes_Empleados.findOrCreate({
      where: { vacante_id: vacante_id, empleado_id: empleado_id },
      defaults: {
        vacante_id: vacante_id,
        empleado_id: empleado_id,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return vacanteEmpleado;
    }
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
  traerPostulacionesEmpleado,
  crearVacante,
  modificarVacante,
  inactivarVacante,
  postularVacanteEmpleado,
};
