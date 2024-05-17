const { Op } = require("sequelize");

const {
  Curriculo,
  Empleado,
  Titulo_Obtenido,
  Areas_Interes,
  Experiencia,
  Documentos_Empleado,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");
const { traerAnexos } = require("./documentos_empleados_controllers");

const todosLosCurriculos = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error("Datos faltantes");
  }

  try {
    const { count: totalRegistros, rows: dataCurriculos } =
      await Curriculo.findAndCountAll({
        attributes: {
          exclude: ["empleado_id"],
        },
        include: [
          {
            model: Empleado,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Documentos_Empleado,
                attributes: ["tipo", "nombre"],
                where: { tipo: "perfil_pdf" },
              },
            ],
            where: filtros.cedula
              ? { cedula: { [Op.like]: `%${filtros.cedula}%` } }
              : filtros.apellidos
              ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
              : {},
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
            model: Titulo_Obtenido,
            attributes: {
              exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
            },
          },
          {
            model: Experiencia,
            attributes: {
              exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
            },
          },
        ],
        where: filtros.estado ? { estado: filtros.estado } : {},
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleado, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "grado_instruccion"
            ? ["grado_instruccion", filtros.orden_por]
            : filtros.orden_campo === "updatedAt"
            ? ["updatedAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    if (!dataCurriculos) {
      throw new Error("No existen curriculos");
    }

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const curriculos = dataCurriculos.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, curriculos };
  } catch (error) {
    throw new Error("Error al traer todos los curriculos: " + error.message);
  }
};

const traerCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    return await Curriculo.findByPk(curriculo_id);
  } catch (error) {
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const traerCurriculoPDF = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  const content = [];

  try {
    const curriculo = await traerCurriculoEmpleado(empleado_id);

    content.push({
      titulo: "Datos Personales",
      contenido: [
        {
          titulo_campo: "Nombre completo: ",
          descripcion_campo: `${curriculo.Empleado.nombres} ${curriculo.Empleado.apellidos}`,
        },
        {
          titulo_campo: "Número de cédula o identidad: ",
          descripcion_campo: curriculo.Empleado.cedula,
        },
        {
          titulo_campo: "Género: ",
          descripcion_campo: `${curriculo.Empleado.genero}`,
        },
        {
          titulo_campo: "Etnia: ",
          descripcion_campo: `${curriculo.Empleado.etnia}`,
        },
        {
          titulo_campo: "Número de teléfono: ",
          descripcion_campo: curriculo.Empleado.telefono,
        },
        {
          titulo_campo: "Correo electrónico: ",
          descripcion_campo: curriculo.Empleado.correo,
        },
        {
          titulo_campo: "Dirección: ",
          descripcion_campo: curriculo.Empleado.direccion,
        },
        {
          titulo_campo: "Cantidad hijos: ",
          descripcion_campo: curriculo.Empleado.cantidad_hijos,
        },
        {
          titulo_campo: "Grado de instrucción: ",
          descripcion_campo: curriculo.grado_instruccion,
        },
      ],
    });

    let areas = "";

    curriculo.Areas_Interes.forEach((area, index) => {
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

    let titulos_obtenidos = "";

    curriculo.Titulo_Obtenidos.forEach((titulo, index) => {
      titulos_obtenidos =
        index === 0 ? titulo.nombre : titulos_obtenidos + `, ${titulo.nombre}`;
    });

    content.push({
      titulo: "Títulos Obtenidos",
      contenido: [
        {
          descripcion_campo: titulos_obtenidos,
        },
      ],
    });

    let experiencias = [];

    curriculo.Experiencia.forEach((experiencia) => {
      experiencias.push({
        tipo: experiencia.tipo,
        cargo_titulo: experiencia.cargo_titulo,
        duracion: experiencia.duracion,
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

    content.push({
      titulo: "Habilidades Técnicas",
      contenido: [
        {
          descripcion_campo: curriculo.habilidades_tecnicas,
        },
      ],
    });

    content.push({
      titulo: "Disponibilidad",
      contenido: [
        {
          titulo_campo: "¿Puede viajar? ",
          descripcion_campo: curriculo.disponibilidad_viajar ? "Si" : "No",
        },
        {
          titulo_campo: "¿Puede cambiar de residencia? ",
          descripcion_campo: curriculo.disponibilidad_cambio_residencia
            ? "Si"
            : "No",
        },
      ],
    });

    return content;
  } catch (error) {
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const traerCurriculoPDFAnexos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  const anexos = [];

  try {
    const documentos = await traerAnexos(empleado_id);

    documentos.forEach((documento) => {
      anexos.push(documento.ruta);
    });

    return anexos;
  } catch (error) {
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const cambiarEstadoRevisado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }
  try {
    await traerEmpleado(empleado_id);

    const curriculo = await Curriculo.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });

    if (curriculo.estado === "Pendiente por revisar") {
      await Curriculo.update(
        {
          estado: "Revisado",
        },
        {
          where: {
            empleado_id: empleado_id,
          },
        }
      );
    }

    return await Curriculo.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });
  } catch (error) {
    throw new Error("Error al modificar el curriculo: " + error.message);
  }
};

const traerCurriculoEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const curriculo = await Curriculo.findOne({
      where: {
        empleado_id: empleado_id,
        activo: true,
      },
      attributes: {
        exclude: ["empleado_id"],
      },
      include: [
        {
          model: Empleado,
          attributes: {
            exclude: ["clave", "createdAt", "updatedAt"],
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
        },
        {
          model: Titulo_Obtenido,
          attributes: {
            exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Experiencia,
          attributes: {
            exclude: ["curriculo_id", "activo", "createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (curriculo) {
      return curriculo;
    }
  } catch (error) {
    throw new Error("Error al traer el curriculo: " + error.message);
  }
};

const crearCurriculo = async (
  empleado_id,
  grado_instruccion,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  habilidades_tecnicas
) => {
  if (!empleado_id || !grado_instruccion) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    const [curriculo, created] = await Curriculo.findOrCreate({
      where: { empleado_id: empleado_id },
      defaults: {
        empleado_id: empleado_id,
        grado_instruccion: grado_instruccion,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        habilidades_tecnicas: habilidades_tecnicas,
      },
    });

    if (created) {
      return curriculo;
    }

    throw new Error("Ya existe un curriculo para ese empleado");
  } catch (error) {
    throw new Error("Error al crear el curriculo: " + error.message);
  }
};

const modificarCurriculo = async (
  curriculo_id,
  grado_instruccion,
  disponibilidad_viajar,
  disponibilidad_cambio_residencia,
  habilidades_tecnicas
) => {
  if (!curriculo_id || !grado_instruccion) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerCurriculo(curriculo_id);

    await Curriculo.update(
      {
        grado_instruccion: grado_instruccion,
        disponibilidad_viajar: disponibilidad_viajar,
        disponibilidad_cambio_residencia: disponibilidad_cambio_residencia,
        habilidades_tecnicas: habilidades_tecnicas,
        estado: "Pendiente por revisar",
      },
      {
        where: {
          curriculo_id: curriculo_id,
        },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    throw new Error("Error al modificar el curriculo: " + error.message);
  }
};

const inactivarCurriculo = async (curriculo_id) => {
  if (!curriculo_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const curriculo = await traerCurriculo(curriculo_id);

    await Curriculo.update(
      { activo: !curriculo.activo },
      {
        where: { curriculo_id: curriculo_id },
      }
    );

    return await traerCurriculo(curriculo_id);
  } catch (error) {
    throw new Error("Error al inactivar el curriculo: " + error.message);
  }
};

module.exports = {
  todosLosCurriculos,
  traerCurriculo,
  traerCurriculoPDF,
  traerCurriculoPDFAnexos,
  cambiarEstadoRevisado,
  traerCurriculoEmpleado,
  crearCurriculo,
  modificarCurriculo,
  inactivarCurriculo,
};
