const { Op } = require("sequelize");

const {
  conn,
  Curriculos,
  Empleados,
  Titulos_Obtenidos,
  Areas_Interes,
  Experiencias,
  Documentos_Empleados,
  Idiomas,
  Etnias,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { traerAnexos } = require("./documentos_empleados_controllers");
const { calcularEdad } = require("../utils/formatearFecha");

const todosLosCurriculos = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataCurriculos } =
      await Curriculos.findAndCountAll({
        attributes: {
          exclude: ["empleado_id"],
        },
        include: [
          {
            model: Empleados,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Documentos_Empleados,
                attributes: ["tipo", "nombre"],
                where: { tipo: "perfil_pdf" },
              },
              {
                model: Titulos_Obtenidos,
                attributes: {
                  exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
                },
              },
              {
                model: Experiencias,
                attributes: {
                  exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
                },
              },
            ],
            where: {
              empresa_id: filtros.empresa_id,
              [Op.and]: [
                filtros.numero_identificacion
                  ? {
                      numero_identificacion: {
                        [Op.like]: `%${filtros.numero_identificacion}%`,
                      },
                    }
                  : filtros.apellidos
                  ? {
                      apellidos: { [Op.like]: `%${filtros.apellidos}%` },
                    }
                  : {},
              ],
            },
          },
          {
            model: Areas_Interes,
            attributes: {
              exclude: ["activo", "createdAt", "updatedAt"],
            },
            through: {
              attributes: ["area_interes_curriculo_id"],
            },
            where: filtros.area_interes_id
              ? { area_interes_id: filtros.area_interes_id }
              : {},
          },
          {
            model: Idiomas,
            attributes: {
              exclude: ["activo", "createdAt", "updatedAt"],
            },
            through: {
              attributes: ["nivel"],
            },
            where: filtros.idioma_id ? { idioma_id: filtros.idioma_id } : {},
          },
        ],
        where: filtros.estado ? { estado: filtros.estado } : {},
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleados, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "updatedAt"
            ? ["updatedAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const curriculos = dataCurriculos.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, curriculos };
  } catch (error) {
    throw new Error(`Error al traer todos los curriculos: ${error.message}`);
  }
};

const traerCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    return await Curriculos.findByPk(curriculo_id);
  } catch (error) {
    throw new Error(`Error al traer el curriculo: ${error.message}`);
  }
};

const traerCurriculoPDF = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  const content = [];

  try {
    const curriculo = await traerCurriculoEmpleado(empleado_id);

    content.push({
      titulo: "Datos Personales",
      contenido: [
        {
          titulo_campo: "Nombre completo: ",
          descripcion_campo: `${curriculo.nombres} ${curriculo.apellidos}`,
        },
        {
          titulo_campo: "Número de identificación: ",
          descripcion_campo: `${curriculo.tipo_identificacion}${curriculo.numero_identificacion}`,
        },
        {
          titulo_campo: "Número de teléfono: ",
          descripcion_campo: curriculo.telefono,
        },
        {
          titulo_campo: "Correo electrónico: ",
          descripcion_campo: curriculo.correo,
        },
        {
          titulo_campo: "Etnia: ",
          descripcion_campo: curriculo.Etnia?.nombre || null,
        },
        {
          titulo_campo: "Sexo: ",
          descripcion_campo: curriculo.sexo,
        },
        {
          titulo_campo: "Cantidad hijos: ",
          descripcion_campo: curriculo.cantidad_hijos,
        },
        {
          titulo_campo: "Fecha de nacimiento: ",
          descripcion_campo: `${curriculo.fecha_nacimiento} (${calcularEdad(
            curriculo.fecha_nacimiento
          )} años)`,
        },
      ],
    });

    content.push({
      titulo: "Disponibilidad",
      contenido: [
        {
          titulo_campo: "¿Puede viajar? ",
          descripcion_campo: curriculo.Curriculo.disponibilidad_viajar
            ? "Si"
            : "No",
        },
        {
          titulo_campo: "¿Puede cambiar de residencia? ",
          descripcion_campo: curriculo.Curriculo
            .disponibilidad_cambio_residencia
            ? "Si"
            : "No",
        },
      ],
    });

    let titulos_obtenidos = [];

    curriculo.Titulos_Obtenidos.forEach((titulo_obtenido) => {
      titulos_obtenidos.push({
        grado_instruccion: titulo_obtenido.grado_instruccion,
        fecha_desde: titulo_obtenido.fecha_desde,
        fecha_hasta: titulo_obtenido.fecha_hasta,
        nombre_instituto: titulo_obtenido.nombre_instituto,
        titulo_obtenido: titulo_obtenido.titulo_obtenido,
      });
    });

    content.push({
      titulo: "Títulos Obtenidos",
      contenido: [
        {
          titulo_campo: "Títulos Obtenidos",
          descripcion_campo: titulos_obtenidos,
        },
      ],
    });

    let experiencias = [];

    curriculo.Experiencias.forEach((experiencia) => {
      experiencias.push({
        tipo: experiencia.tipo,
        cargo_titulo: experiencia.cargo_titulo,
        fecha_desde: experiencia.fecha_desde,
        fecha_hasta: experiencia.fecha_hasta,
        empresa_centro_educativo: experiencia.empresa_centro_educativo,
      });
    });

    content.push({
      titulo: "Experiencias",
      contenido: [
        {
          titulo_campo: "Experiencias",
          descripcion_campo: experiencias,
        },
      ],
    });

    let idiomas = [];

    curriculo.Curriculo.Idiomas.forEach((idioma) => {
      idiomas.push({
        nombre: idioma.nombre,
        nivel: idioma.Idiomas_Curriculos.nivel,
      });
    });

    content.push({
      titulo: "Idiomas",
      contenido: [
        {
          titulo_campo: "Idiomas",
          descripcion_campo: idiomas,
        },
      ],
    });

    content.push({
      titulo: "Habilidades Técnicas",
      contenido: [
        {
          descripcion_campo: curriculo.Curriculo.habilidades_tecnicas,
        },
      ],
    });

    let areas = "";

    curriculo.Curriculo.Areas_Interes.forEach((area, index) => {
      areas = index === 0 ? area.nombre : areas + `, ${area.nombre}`;
    });

    content.push({
      titulo: "Áreas de Interés",
      contenido: [
        {
          descripcion_campo: areas,
        },
      ],
    });

    return content;
  } catch (error) {
    throw new Error(`Error al traer el curriculo: ${error.message}`);
  }
};

const traerCurriculoPDFAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  const anexos = [];

  try {
    const documentos = await traerAnexos(empleado_id);

    documentos.forEach((documento) => {
      anexos.push(documento.ruta);
    });

    return anexos;
  } catch (error) {
    throw new Error(`Error al traer el curriculo: ${error.message}`);
  }
};

const cambiarEstadoRevisado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    const curriculo = await Curriculos.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });

    if (curriculo.estado === "Pendiente por revisar") {
      await Curriculos.update(
        {
          estado: "Revisado",
        },
        {
          where: {
            empleado_id: empleado_id,
          },
        },
        { transaction: t }
      );
    }

    await t.commit();

    return await Curriculos.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el curriculo: ${error.message}`);
  }
};

const traerCurriculoEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    await traerEmpleado(empleado_id);

    const curriculo = await Empleados.findOne({
      where: {
        empleado_id: empleado_id,
        activo: true,
      },
      include: [
        {
          model: Etnias,
        },
        {
          model: Titulos_Obtenidos,
          attributes: {
            exclude: [
              "empleado_id",
              "titulo_obtenido_id",
              "activo",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: Experiencias,
          attributes: {
            exclude: [
              "empleado_id",
              "experiencia_id",
              "activo",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: Curriculos,
          include: [
            {
              model: Areas_Interes,
              attributes: {
                exclude: ["activo", "createdAt", "updatedAt"],
              },
              through: {
                attributes: ["area_interes_curriculo_id"],
              },
            },
            {
              model: Idiomas,
              attributes: ["idioma_id", "nombre"],
              through: {
                attributes: ["nivel"],
              },
            },
          ],
        },
      ],
    });

    if (curriculo) {
      return curriculo;
    }
  } catch (error) {
    throw new Error(`Error al traer el curriculo: ${error.message}`);
  }
};

const modificarCurriculo = async (
  empleado_id,
  curriculo_id,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  habilidades_tecnicas
) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    if (curriculo_id) {
      t = await conn.transaction();

      await traerCurriculo(curriculo_id);

      await Curriculos.update(
        {
          disponibilidad_viajar: disponibilidad_viajar,
          disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
          habilidades_tecnicas: habilidades_tecnicas,
          estado: "Pendiente por revisar",
        },
        {
          where: {
            curriculo_id: curriculo_id,
          },
        },
        { transaction: t }
      );

      await t.commit();

      return await traerCurriculo(curriculo_id);
    } else {
      t = await conn.transaction();

      await traerEmpleado(empleado_id);

      const [crearCurriculo, created] = await Curriculos.findOrCreate({
        where: {
          empleado_id: empleado_id,
        },
        defaults: {
          empleado_id: empleado_id,
          disponibilidad_viajar: disponibilidad_viajar,
          disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
          habilidades_tecnicas: habilidades_tecnicas,
          estado: "Pendiente por revisar",
        },
        transaction: t,
      });

      await t.commit();

      if (created) {
        return await traerCurriculo(crearCurriculo.curriculo_id);
      }
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el curriculo: ${error.message}`);
  }
};

const inactivarCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const curriculo = await traerCurriculo(curriculo_id);

    await Curriculos.update(
      { activo: !curriculo.activo },
      {
        where: { curriculo_id: curriculo_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el curriculo: ${error.message}`);
  }
};

module.exports = {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoPDF,
  traerCurriculoPDFAnexos,
  cambiarEstadoRevisado,
  traerCurriculoEmpleado,
  modificarCurriculo,
  inactivarCurriculo,
};
