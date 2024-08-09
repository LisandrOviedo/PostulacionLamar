const {
  conn,
  Fichas_Ingresos,
  Empleados,
  Cargos_Niveles,
  Cargos,
  Departamentos,
  Empresas,
  Titulos_Obtenidos,
  Estados,
  Paises,
  Etnias,
  Experiencias,
  Salud,
  Contactos_Emergencia,
  Datos_Bancarios,
  Direcciones,
  Municipios,
  Parroquias,
} = require("../db");

const todasLasFichasIngresos = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const fichas_ingresos = await Fichas_Ingresos.findAll({
      where: { empleado_id: empleado_id },
    });

    if (!fichas_ingresos.length) {
      throw new Error(`No existen fichas de ingresos de ese empleado`);
    }

    return fichas_ingresos;
  } catch (error) {
    throw new Error(
      `Error al traer todas las fichas de ingresos de ese empleado: ${error.message}`
    );
  }
};

const traerFichaIngresoEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ficha_ingreso = await Empleados.findByPk(empleado_id, {
      attributes: {
        exclude: ["rol_id", "clave", "activo", "createdAt", "updatedAt"],
      },
      include: [
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
        {
          model: Etnias,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Estados,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Paises,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Salud,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Contactos_Emergencia,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Datos_Bancarios,
          attributes: {
            exclude: ["empleado_id", "activo", "createdAt", "updatedAt"],
          },
        },
        {
          model: Direcciones,
          attributes: {
            exclude: [
              "empleado_id",
              "parroquia_id",
              "municipio_id",
              "estado_id",
              "pais_id",
              "activo",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: Paises,
              attributes: ["pais_id", "nombre"],
            },
            {
              model: Estados,
              attributes: ["estado_id", "nombre"],
            },
            {
              model: Municipios,
              attributes: ["municipio_id", "nombre"],
            },
            {
              model: Parroquias,
              attributes: ["parroquia_id", "nombre"],
            },
          ],
        },
        {
          model: Cargos_Niveles,
          attributes: ["cargo_nivel_id", "nivel"],
          required: true,
          include: [
            {
              model: Cargos,
              attributes: [
                "cargo_id",
                "descripcion",
                "descripcion_cargo_antiguo",
              ],
              include: [
                {
                  model: Departamentos,
                  attributes: ["departamento_id", "nombre"],
                  include: [
                    {
                      model: Empresas,
                      attributes: ["empresa_id", "nombre"],
                    },
                  ],
                },
              ],
            },
          ],
          through: {
            model: Fichas_Ingresos,
            attributes: [
              "ficha_ingreso_id",
              "salario",
              "fecha_ingreso",
              "observaciones",
            ],
            where: {
              activo: true,
            },
          },
        },
      ],
    });

    if (!ficha_ingreso) {
      throw new Error(`No existe ficha de ingreso para ese empleado`);
    }

    return ficha_ingreso;
  } catch (error) {
    throw new Error(
      `Error al traer la ficha de ingreso de ese empleado: ${error.message}`
    );
  }
};

const traerFichaIngreso = async (ficha_ingreso_id) => {
  if (!ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const ficha_ingreso = await Fichas_Ingresos.findByPk(ficha_ingreso_id);

    if (!ficha_ingreso) {
      throw new Error(`No existe esa ficha de ingreso`);
    }

    return ficha_ingreso;
  } catch (error) {
    throw new Error(`Error al traer la ficha de ingreso: ${error.message}`);
  }
};

const traerFichaIngresoPDF = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  const content = [];

  try {
    const ficha_ingreso = await traerFichaIngresoEmpleado(empleado_id);

    content.push({
      titulo: "Información Personal",
      contenido: [
        {
          titulo_campo: "Nombre completo: ",
          descripcion_campo: `${ficha_ingreso.nombres} ${ficha_ingreso.apellidos}`,
        },
        {
          titulo_campo: "Número de identificación: ",
          descripcion_campo: `${ficha_ingreso.tipo_identificacion}${ficha_ingreso.numero_identificacion}`,
        },
        {
          titulo_campo: "Estado civil: ",
          descripcion_campo: `${ficha_ingreso.estado_civil}`,
        },
        {
          titulo_campo: "Registro de información fiscal (RIF): ",
          descripcion_campo: `${ficha_ingreso.rif}`,
        },
        {
          titulo_campo: "Número de teléfono: ",
          descripcion_campo: ficha_ingreso.telefono,
        },
        {
          titulo_campo: "Correo electrónico: ",
          descripcion_campo: ficha_ingreso.correo,
        },
        {
          titulo_campo: "Etnia: ",
          descripcion_campo: ficha_ingreso.Etnia?.nombre || null,
        },
        {
          titulo_campo: "Mano dominante: ",
          descripcion_campo: ficha_ingreso.mano_dominante,
        },
        {
          titulo_campo: "Sexo: ",
          descripcion_campo: ficha_ingreso.sexo,
        },
        {
          titulo_campo: "Factor y grupo sanguíneo: ",
          descripcion_campo: ficha_ingreso.factor_grupo_sanguineo,
        },
        {
          titulo_campo: "Cantidad hijos: ",
          descripcion_campo: ficha_ingreso.cantidad_hijos,
        },
        {
          titulo_campo: "Carga familiar: ",
          descripcion_campo: ficha_ingreso.carga_familiar,
        },
        {
          titulo_campo: "Fecha de nacimiento: ",
          descripcion_campo: `${ficha_ingreso.fecha_nacimiento} (${calcularEdad(
            ficha_ingreso.fecha_nacimiento
          )} años)`,
        },
        {
          titulo_campo: "Lugar de nacimiento: ",
          descripcion_campo: ficha_ingreso.nacimiento_lugar,
        },
        {
          titulo_campo: "Estado de nacimiento: ",
          descripcion_campo: ficha_ingreso.Estado.nombre,
        },
        {
          titulo_campo: "Nacionalidad: ",
          descripcion_campo: ficha_ingreso.Paise.nombre,
        },
        {
          titulo_campo: "Licencia de conducir: ",
          descripcion_campo: ficha_ingreso.licencia_conducir_grado
            ? `Grado ${ficha_ingreso.licencia_conducir_grado}`
            : null,
        },
        {
          titulo_campo: "Fecha de vencimiento de licencia: ",
          descripcion_campo:
            ficha_ingreso.licencia_conducir_vencimiento || null,
        },
        {
          titulo_campo: "Carta médica: ",
          descripcion_campo: ficha_ingreso.carta_medica_vencimiento || null,
        },
        {
          titulo_campo: "Talla camisa: ",
          descripcion_campo: ficha_ingreso.talla_camisa,
        },
        {
          titulo_campo: "Talla pantalón: ",
          descripcion_campo: ficha_ingreso.talla_pantalon,
        },
        {
          titulo_campo: "Talla calzado: ",
          descripcion_campo: ficha_ingreso.talla_calzado,
        },
        {
          titulo_campo: "¿Trabajó anteriormente en esta empresa?: ",
          descripcion_campo: ficha_ingreso.trabajo_anteriormente_especifique
            ? ficha_ingreso.trabajo_anteriormente_especifique
            : "No",
        },
        {
          titulo_campo: "Motivo del retiro: ",
          descripcion_campo: ficha_ingreso.motivo_retiro || null,
        },
        {
          titulo_campo: "¿Posee parientes que trabajen en esta empresa?: ",
          descripcion_campo: ficha_ingreso.posee_parientes_empresa,
        },
      ],
    });

    content.push({
      titulo: "Dirección de Habitación",
      contenido: [
        {
          titulo_campo: "Calle / Avenida: ",
          descripcion_campo: ficha_ingreso.Direcciones.calle_avenida,
        },
        {
          titulo_campo: "Tipo vivienda: ",
          descripcion_campo: ficha_ingreso.Direcciones.tipo_vivienda,
        },
        {
          titulo_campo: "Número casa: ",
          descripcion_campo: ficha_ingreso.Direcciones.numero_casa || null,
        },
        {
          titulo_campo: "Piso: ",
          descripcion_campo: ficha_ingreso.Direcciones.piso || null,
        },
        {
          titulo_campo: "Apartamento: ",
          descripcion_campo: ficha_ingreso.Direcciones.apartamento || null,
        },
        {
          titulo_campo: "Urbanización / Sector: ",
          descripcion_campo: ficha_ingreso.Direcciones.urbanizacion_sector,
        },
        {
          titulo_campo: "Parroqia: ",
          descripcion_campo: ficha_ingreso.Direcciones.Parroquia.nombre,
        },
        {
          titulo_campo: "Municipio: ",
          descripcion_campo: ficha_ingreso.Direcciones.Municipio.nombre,
        },
        {
          titulo_campo: "Estado: ",
          descripcion_campo: ficha_ingreso.Direcciones.Estado.nombre,
        },
        {
          titulo_campo: "País: ",
          descripcion_campo: ficha_ingreso.Direcciones.Paise.nombre,
        },
      ],
    });

    let titulos_obtenidos = [];

    ficha_ingreso.Titulos_Obtenidos.forEach((titulo_obtenido) => {
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

    ficha_ingreso.Experiencias.forEach((experiencia) => {
      experiencias.push({
        tipo: experiencia.tipo,
        cargo_titulo: experiencia.cargo_titulo,
        fecha_desde: experiencia.fecha_desde,
        fecha_hasta: experiencia.fecha_hasta,
        empresa_centro_educativo: experiencia.empresa_centro_educativo,
      });
    });

    content.push({
      titulo: "Trabajos Anteriores",
      contenido: [
        {
          titulo_campo: "Trabajos Anteriores",
          descripcion_campo: experiencias,
        },
      ],
    });

    return content;
  } catch (error) {
    throw new Error(`Error al traer el curriculo: ${error.message}`);
  }
};

const crearFichaIngreso = async (
  empleado_id,
  { cargo_nivel_id, salario, fecha_ingreso, observaciones }
) => {
  if (!empleado_id || !cargo_nivel_id || !salario || !fecha_ingreso) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [crearDireccion, created] = await Fichas_Ingresos.findOrCreate({
      where: {
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
      },
      defaults: {
        empleado_id: empleado_id,
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones || null,
      },
      transaction: t,
    });

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear la ficha de ingreso: ${error.message}`);
  }
};

const modificarFichaIngreso = async (
  ficha_ingreso_id,
  cargo_nivel_id,
  salario,
  fecha_ingreso,
  observaciones
) => {
  if (!ficha_ingreso_id || !cargo_nivel_id || !salario || !fecha_ingreso) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerFichaIngreso(ficha_ingreso_id);

    await Fichas_Ingresos.update(
      {
        cargo_nivel_id: cargo_nivel_id,
        salario: salario,
        fecha_ingreso: fecha_ingreso,
        observaciones: observaciones || null,
      },
      {
        where: {
          ficha_ingreso_id: ficha_ingreso_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerFichaIngreso(ficha_ingreso_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la ficha de ingreso: ${error.message}`);
  }
};

const inactivarFichaIngreso = async (ficha_ingreso_id) => {
  if (!ficha_ingreso_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const ficha_ingreso = await traerFichaIngreso(ficha_ingreso_id);

    await Fichas_Ingresos.update(
      { activo: !ficha_ingreso.activo },
      {
        where: { ficha_ingreso_id: ficha_ingreso_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerFichaIngreso(ficha_ingreso_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la ficha de ingreso: ${error.message}`);
  }
};

module.exports = {
  todasLasFichasIngresos,
  traerFichaIngresoEmpleado,
  traerFichaIngreso,
  traerFichaIngresoPDF,
  crearFichaIngreso,
  modificarFichaIngreso,
  inactivarFichaIngreso,
};
