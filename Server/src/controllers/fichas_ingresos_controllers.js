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
  Referencias_Personales,
} = require("../db");

const { calcularEdad } = require("../utils/formatearFecha");

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
    const ficha_ingreso = await Empleados.findOne({
      where: { empleado_id: empleado_id },
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
          include: {
            model: Paises,
            attributes: ["pais_id", "nombre"],
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
          model: Referencias_Personales,
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
              model: Municipios,
              attributes: ["municipio_id", "nombre"],
              include: {
                model: Estados,
                attributes: ["estado_id", "nombre"],
                include: {
                  model: Paises,
                  attributes: ["pais_id", "nombre"],
                },
              },
            },
            {
              model: Parroquias,
              attributes: ["parroquia_id", "nombre"],
            },
          ],
        },
        {
          model: Fichas_Ingresos,
          attributes: [
            "ficha_ingreso_id",
            "salario",
            "fecha_ingreso",
            "observaciones",
          ],
          include: [
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
            },
          ],
          where: {
            activo: true,
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
      titulo: "INFORMACIÓN PERSONAL",
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
          descripcion_campo: ficha_ingreso.Etnia?.nombre || "Ninguna",
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
          descripcion_campo: ficha_ingreso.cantidad_hijos.toString(),
        },
        {
          titulo_campo: "Carga familiar: ",
          descripcion_campo: ficha_ingreso.carga_familiar.toString(),
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
          descripcion_campo: ficha_ingreso.Estado.Paise.nombre,
        },
        {
          titulo_campo: "Licencia de conducir: ",
          descripcion_campo: ficha_ingreso.licencia_conducir_grado
            ? `Grado ${ficha_ingreso.licencia_conducir_grado}`
            : "No posee",
        },
        {
          titulo_campo: "Fecha de vencimiento de licencia de conducir: ",
          descripcion_campo:
            ficha_ingreso.licencia_conducir_vencimiento || "No posee",
        },
        {
          titulo_campo: "Fecha de vencimiento de carta médica: ",
          descripcion_campo:
            ficha_ingreso.carta_medica_vencimiento || "No posee",
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
          titulo_campo: "¿Trabajó anteriormente en esta empresa? ",
          descripcion_campo:
            ficha_ingreso.trabajo_anteriormente_especifique || "No",
        },
        {
          titulo_campo: "Motivo del retiro: ",
          descripcion_campo: ficha_ingreso.motivo_retiro || "",
        },
        {
          titulo_campo: "¿Posee parientes que trabajen en esta empresa? ",
          descripcion_campo: ficha_ingreso.posee_parientes_empresa.toString(),
        },
      ],
    });

    content.push({
      titulo: "DIRECCIÓN DE HABITACIÓN",
      contenido: [
        {
          titulo_campo: "Calle / Avenida: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].calle_avenida,
        },
        {
          titulo_campo: "Tipo vivienda: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].tipo_vivienda,
        },
        {
          titulo_campo: "Número casa: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].numero_casa || "N/A",
        },
        {
          titulo_campo: "Piso: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].piso || "N/A",
        },
        {
          titulo_campo: "Apartamento: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].apartamento || "N/A",
        },
        {
          titulo_campo: "Urbanización / Sector: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].urbanizacion_sector,
        },
        {
          titulo_campo: "Parroquia: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].Parroquia.nombre,
        },
        {
          titulo_campo: "Municipio: ",
          descripcion_campo: ficha_ingreso.Direcciones[0].Municipio.nombre,
        },
        {
          titulo_campo: "Estado: ",
          descripcion_campo:
            ficha_ingreso.Direcciones[0].Municipio.Estado.nombre,
        },
        {
          titulo_campo: "País: ",
          descripcion_campo:
            ficha_ingreso.Direcciones[0].Municipio.Estado.Paise.nombre,
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
      titulo: "EDUCACIÓN",
      contenido: [
        {
          titulo_campo: "Títulos Obtenidos",
          descripcion_campo: titulos_obtenidos,
        },
      ],
    });

    let experiencias = [];

    ficha_ingreso.Experiencias.forEach((experiencia) => {
      if (experiencia.tipo === "Laboral") {
        experiencias.push({
          tipo: experiencia.tipo,
          cargo_titulo: experiencia.cargo_titulo,
          fecha_desde: experiencia.fecha_desde,
          fecha_hasta: experiencia.fecha_hasta,
          empresa_centro_educativo: experiencia.empresa_centro_educativo,
        });
      }
    });

    content.push({
      titulo: "TRABAJOS ANTERIORES",
      contenido: [
        {
          titulo_campo: "Experiencias",
          descripcion_campo: experiencias,
        },
      ],
    });

    content.push({
      titulo: "SALUD",
      contenido: [
        {
          titulo_campo: "¿Es alérgico a algún medicamento? ",
          descripcion_campo: ficha_ingreso.Saluds[0].alergia_medicamentos
            ? "Si"
            : "No",
        },
        {
          titulo_campo: "¿Es alérgico a algún alimento? ",
          descripcion_campo: ficha_ingreso.Saluds[0].alergia_alimentos
            ? "Si"
            : "No",
        },
        {
          titulo_campo: "¿Tiene alguna otra alergia? ",
          descripcion_campo: ficha_ingreso.Saluds[0].alergia_otros
            ? "Si"
            : "No",
        },
        {
          titulo_campo: "Especifique la(s) alergia(s): ",
          descripcion_campo: ficha_ingreso.Saluds[0].alergia_especifique,
        },
        {
          titulo_campo: "¿Fuma? ",
          descripcion_campo: ficha_ingreso.Saluds[0].fuma ? "Si" : "No",
        },
        {
          titulo_campo: "¿Posee alguna cicatriz? ",
          descripcion_campo:
            ficha_ingreso.Saluds[0].cicatriz_especifique || "No",
        },
      ],
    });

    let contactos_emergencia = [];

    ficha_ingreso.Contactos_Emergencia.forEach((contacto) => {
      contactos_emergencia.push({
        nombre_apellido: contacto.nombre_apellido,
        parentesco: contacto.parentesco,
        telefono: contacto.telefono,
        direccion: contacto.direccion,
      });
    });

    content.push({
      titulo: "EN CASO DE EMERGENCIA",
      contenido: [
        {
          titulo_campo: "Contactos de Emergencia",
          descripcion_campo: contactos_emergencia,
        },
      ],
    });

    let referencias_personales = [];

    ficha_ingreso.Referencias_Personales.forEach((referencia) => {
      referencias_personales.push({
        nombre_apellido: referencia.nombre_apellido,
        direccion: referencia.direccion,
        telefono: referencia.telefono,
        ocupacion: referencia.ocupacion,
      });
    });

    content.push({
      titulo: "REFERENCIAS PERSONALES (NO FAMILIARES)",
      contenido: [
        {
          titulo_campo: "Referencias Personales",
          descripcion_campo: referencias_personales,
        },
      ],
    });

    content.push({
      titulo: "DATOS BANCARIOS",
      contenido: [
        {
          titulo_campo: "Titular de la cuenta: ",
          descripcion_campo: ficha_ingreso.Datos_Bancarios[0].titular_cuenta,
        },
        {
          titulo_campo: "Entidad bancaria: ",
          descripcion_campo: ficha_ingreso.Datos_Bancarios[0].entidad_bancaria,
        },
        {
          titulo_campo: "Número de cuenta: ",
          descripcion_campo: ficha_ingreso.Datos_Bancarios[0].numero_cuenta,
        },
        {
          titulo_campo: "Tipo de cuenta: ",
          descripcion_campo: ficha_ingreso.Datos_Bancarios[0].tipo_cuenta,
        },
        ficha_ingreso.Datos_Bancarios[0].nombre_apellido_tercero
          ? {
              titulo_campo: "Nombre del titular (tercero): ",
              descripcion_campo:
                ficha_ingreso.Datos_Bancarios[0].nombre_apellido_tercero,
            }
          : {},
        ficha_ingreso.Datos_Bancarios[0].nombre_apellido_tercero
          ? {
              titulo_campo: "Número de identificación (tercero): ",
              descripcion_campo: `${ficha_ingreso.Datos_Bancarios[0].tipo_identificacion_tercero}${ficha_ingreso.Datos_Bancarios[0].numero_identificacion_tercero}`,
            }
          : {},
        ficha_ingreso.Datos_Bancarios[0].nombre_apellido_tercero
          ? {
              titulo_campo: "Parentesco (tercero): ",
              descripcion_campo:
                ficha_ingreso.Datos_Bancarios[0].parentesco_tercero,
            }
          : {},
      ],
    });

    content.push({
      titulo: "ESPACIO PARA EL DEPARTAMENTO DE TALENTO HUMANO",
      contenido: [
        {
          titulo_campo: "Cargo: ",
          descripcion_campo: `${ficha_ingreso.Fichas_Ingresos[0].Cargos_Nivele.Cargo.descripcion} (${ficha_ingreso.Fichas_Ingresos[0].Cargos_Nivele.nivel})`,
        },
        {
          titulo_campo: "Departamento / Gerencia: ",
          descripcion_campo: `${ficha_ingreso.Fichas_Ingresos[0].Cargos_Nivele.Cargo.Departamento.nombre} (${ficha_ingreso.Fichas_Ingresos[0].Cargos_Nivele.Cargo.Departamento.Empresa.nombre})`,
        },
        {
          titulo_campo: "Salario: ",
          descripcion_campo: `${ficha_ingreso.Fichas_Ingresos[0].salario} Bs.`,
        },
        {
          titulo_campo: "Fecha de ingreso: ",
          descripcion_campo: ficha_ingreso.Fichas_Ingresos[0].fecha_ingreso,
        },
        {
          titulo_campo: "Observaciones: ",
          descripcion_campo:
            ficha_ingreso.Fichas_Ingresos[0].observaciones || "",
        },
      ],
    });

    return content;
  } catch (error) {
    throw new Error(`Error al crear la ficha de ingreso PDF: ${error.message}`);
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

    const [crearFichaIngreso, created] = await Fichas_Ingresos.findOrCreate({
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
        transaction: t,
      }
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
        transaction: t,
      }
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
