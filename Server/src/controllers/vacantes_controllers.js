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
          {
            model: Empleados,
            as: "RevisadoPor",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
          },
        ],
        distinct: true,
        order: [
          orden_campo === "apellidos"
            ? [Empleados, orden_campo, orden_por]
            : orden_campo
            ? [orden_campo, orden_por]
            : null,
        ].filter(Boolean),
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

const traerVacanteEmpleado = async (vacante_id) => {
  if (!vacante_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const vacante = await Vacantes.findOne({
      where: { vacante_id: vacante_id, activo: true },
      include: [{ model: Areas_Interes, attributes: ["nombre"] }],
    });

    return vacante;
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
  estado_solicitud,
  orden_campo,
  orden_por
) => {
  if (!empleado_id || !paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  let condicionesVacantes = {};

  let condicionesVacantesEmpleado = {
    empleado_id: empleado_id,
  };

  if (buscar_por && buscar) {
    condicionesVacantes[buscar_por] = { [Op.like]: `%${buscar}%` };
  }

  if (area_interes_id) {
    condicionesVacantes.area_interes_id = area_interes_id;
  }

  if (estado_solicitud) {
    condicionesVacantesEmpleado.estado_solicitud = estado_solicitud;
  }

  try {
    const { count: totalRegistros, rows: dataPostulacionesEmpleado } =
      await Vacantes_Empleados.findAndCountAll({
        where: condicionesVacantesEmpleado,
        include: [
          {
            model: Vacantes,
            where: condicionesVacantes,
            include: [
              {
                model: Empleados,
                as: "CreadoPor",
                attributes: [
                  "empleado_id",
                  "nombres",
                  "apellidos",
                  "tipo_identificacion",
                  "numero_identificacion",
                  "telefono",
                  "correo",
                  "activo",
                ],
              },
              { model: Areas_Interes },
            ],
          },
          {
            model: Empleados,
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
              "telefono",
              "correo",
              "activo",
            ],
          },
          {
            model: Empleados,
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
              "telefono",
              "correo",
              "activo",
            ],
            as: "RevisadoPor",
          },
        ],
        distinct: true,
        order: [
          orden_campo === "createdAt" && orden_por
            ? [orden_campo, orden_por]
            : orden_campo
            ? [Vacantes, orden_campo, orden_por]
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

const traerPostulacionEmpleado = async (vacante_empleado_id) => {
  if (!vacante_empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const vacante_empleado = await Vacantes_Empleados.findByPk(
      vacante_empleado_id,
      {
        include: [
          {
            model: Vacantes,
            include: [
              {
                model: Empleados,
                as: "CreadoPor",
                attributes: [
                  "empleado_id",
                  "nombres",
                  "apellidos",
                  "tipo_identificacion",
                  "numero_identificacion",
                  "telefono",
                  "correo",
                  "activo",
                ],
              },
              { model: Areas_Interes },
            ],
          },
          {
            model: Empleados,
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
              "telefono",
              "correo",
              "activo",
            ],
          },
          {
            model: Empleados,
            as: "RevisadoPor",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
              "telefono",
              "correo",
              "activo",
            ],
          },
        ],
      }
    );

    if (!vacante_empleado) {
      throw new Error(`No existe esa postulación`);
    }

    return vacante_empleado;
  } catch (error) {
    throw new Error(
      `Error al traer la postulación del empleado: ${error.message}`
    );
  }
};

const crearVacante = async (
  nombre,
  ubicacion,
  departamento,
  nivel_educativo,
  anos_experiencia,
  descripcion,
  area_interes_id,
  creado_por_id
) => {
  if (
    !nombre ||
    !ubicacion ||
    !nivel_educativo ||
    !anos_experiencia ||
    !descripcion ||
    !area_interes_id ||
    !creado_por_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await Vacantes.create(
      {
        nombre: nombre,
        ubicacion: ubicacion,
        departamento: departamento || null,
        nivel_educativo: nivel_educativo,
        anos_experiencia: anos_experiencia,
        descripcion: descripcion,
        area_interes_id: area_interes_id,
        creado_por_id: creado_por_id,
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
  nombre,
  ubicacion,
  departamento,
  nivel_educativo,
  anos_experiencia,
  descripcion,
  area_interes_id
) => {
  if (
    !vacante_id ||
    !nombre ||
    !ubicacion ||
    !nivel_educativo ||
    !anos_experiencia ||
    !descripcion ||
    !area_interes_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerVacante(vacante_id, 1, 1);

    t = await conn.transaction();

    await Vacantes.update(
      {
        nombre: nombre,
        ubicacion: ubicacion,
        departamento: departamento || null,
        nivel_educativo: nivel_educativo,
        anos_experiencia: anos_experiencia,
        descripcion: descripcion,
        area_interes_id: area_interes_id,
      },
      {
        where: {
          vacante_id: vacante_id,
        },
        transaction: t,
      }
    );

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la vacante: ${error.message}`);
  }
};

const cambiarEstadoRevisado = async (vacante_empleado_id, revisado_por_id) => {
  if (!vacante_empleado_id || !revisado_por_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerPostulacionEmpleado(vacante_empleado_id);

    const postulacion = await Vacantes_Empleados.findByPk(vacante_empleado_id);

    if (postulacion && !postulacion.revisado_por_id) {
      t = await conn.transaction();

      await Vacantes_Empleados.update(
        {
          revisado_por_id: revisado_por_id,
          estado_solicitud: "Revisado",
        },
        {
          where: {
            vacante_empleado_id: vacante_empleado_id,
          },
          transaction: t,
        }
      );

      await t.commit();
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar el estado de la postulación: ${error.message}`
    );
  }
};

const inactivarVacante = async (vacante_id) => {
  let t;

  try {
    const { vacante } = await traerVacante(vacante_id, 1, 1);

    t = await conn.transaction();

    await Vacantes.update(
      { activo: !vacante.activo },
      {
        where: { vacante_id: vacante_id },
        transaction: t,
      }
    );

    await t.commit();
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
  traerVacanteEmpleado,
  traerPostulacionesEmpleado,
  traerPostulacionEmpleado,
  crearVacante,
  postularVacanteEmpleado,
  modificarVacante,
  cambiarEstadoRevisado,
  inactivarVacante,
};
