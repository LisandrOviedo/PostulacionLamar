const { Op } = require("sequelize");

const {
  conn,
  Movimientos,
  Empleados,
  Cargos_Empleados,
  Cargos_Niveles,
  Cargos,
  Departamentos,
  Empresas,
  Clases_Movimientos,
  Sedes,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todosLosMovimientos = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataMovimientos } =
      await Movimientos.findAndCountAll({
        attributes: {
          exclude: [
            "empleado_id",
            "cargo_actual_id",
            "clase_movimiento_id",
            "cargo_nivel_id",
            "solicitante_id",
            "supervisor_id",
            "gerencia_id",
            "tthh_id",
            "revisado_por_id",
          ],
        },
        include: [
          {
            model: Empleados,
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
            where: filtros.numero_identificacion
              ? {
                  numero_identificacion: {
                    [Op.like]: `%${filtros.numero_identificacion}%`,
                  },
                }
              : filtros.apellidos
              ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
              : {},
            include: {
              model: Empresas,
              attributes: ["empresa_id", "nombre"],
              where:
                filtros.empresa_id && filtros.empresa_id !== "Seleccione"
                  ? { empresa_id: filtros.empresa_id }
                  : {},
              include: {
                model: Sedes,
                attributes: ["sede_id", "nombre"],
                where:
                  filtros.sede_id && filtros.sede_id !== "Seleccione"
                    ? { sede_id: filtros.sede_id }
                    : {},
              },
            },
          },
          {
            model: Cargos_Empleados,
            as: "Cargo_Actual",
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          },
          {
            model: Clases_Movimientos,
            attributes: ["clase_movimiento_id", "descripcion"],
            where:
              filtros.clase_movimiento_id &&
              filtros.clase_movimiento_id !== "Seleccione"
                ? {
                    clase_movimiento_id: filtros.clase_movimiento_id,
                  }
                : {},
          },
          {
            model: Cargos_Niveles,
            as: "Nuevo_Cargo",
            attributes: ["cargo_nivel_id", "nivel"],
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
          {
            model: Empleados,
            as: "Solicitante",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
            include: {
              model: Cargos_Empleados,
              attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
              where: { activo: true },
              include: [
                {
                  model: Cargos_Niveles,
                  attributes: ["cargo_nivel_id", "nivel"],
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
            },
          },
          {
            model: Empleados,
            as: "Supervisor",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
            include: {
              model: Cargos_Empleados,
              attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
              where: { activo: true },
              include: [
                {
                  model: Cargos_Niveles,
                  attributes: ["cargo_nivel_id", "nivel"],
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
            },
          },
          {
            model: Empleados,
            as: "Gerencia",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
            include: {
              model: Cargos_Empleados,
              attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
              where: { activo: true },
              include: [
                {
                  model: Cargos_Niveles,
                  attributes: ["cargo_nivel_id", "nivel"],
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
            },
          },
          {
            model: Empleados,
            as: "TTHH",
            attributes: [
              "empleado_id",
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
            include: {
              model: Cargos_Empleados,
              attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
              where: { activo: true },
              include: [
                {
                  model: Cargos_Niveles,
                  attributes: ["cargo_nivel_id", "nivel"],
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
            },
          },
        ],
        where:
          filtros.estado_solicitud && filtros.estado_solicitud !== "Seleccione"
            ? {
                estado_solicitud: filtros.estado_solicitud,
              }
            : {},
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? [Empleados, "apellidos", filtros.orden_por]
            : filtros.orden_campo === "updatedAt"
            ? ["updatedAt", filtros.orden_por]
            : filtros.orden_campo === "createdAt"
            ? ["createdAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const movimientos = dataMovimientos.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, movimientos };
  } catch (error) {
    throw new Error(`Error al traer todos los movimientos: ${error.message}`);
  }
};

const traerMovimiento = async (movimiento_id) => {
  if (!movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const movimiento = await Movimientos.findByPk(movimiento_id, {
      attributes: {
        exclude: [
          "empleado_id",
          "cargo_actual_id",
          "clase_movimiento_id",
          "cargo_nivel_id",
          "solicitante_id",
          "supervisor_id",
          "gerencia_id",
          "tthh_id",
          "revisado_por_id",
        ],
      },
      include: [
        {
          model: Empleados,
          attributes: [
            "empleado_id",
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
          include: {
            model: Empresas,
            attributes: ["empresa_id", "nombre"],
            include: {
              model: Sedes,
              attributes: ["sede_id", "nombre"],
            },
          },
        },
        {
          model: Cargos_Empleados,
          as: "Cargo_Actual",
          attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
          include: [
            {
              model: Cargos_Niveles,
              attributes: ["cargo_nivel_id", "nivel"],
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
        },
        {
          model: Clases_Movimientos,
          attributes: ["clase_movimiento_id", "descripcion"],
        },
        {
          model: Cargos_Niveles,
          as: "Nuevo_Cargo",
          attributes: ["cargo_nivel_id", "nivel"],
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
        {
          model: Empleados,
          as: "Solicitante",
          attributes: [
            "empleado_id",
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
          include: {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            where: { activo: true },
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          },
        },
        {
          model: Empleados,
          as: "Supervisor",
          attributes: [
            "empleado_id",
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
          include: {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            where: { activo: true },
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          },
        },
        {
          model: Empleados,
          as: "Gerencia",
          attributes: [
            "empleado_id",
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
          include: {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            where: { activo: true },
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          },
        },
        {
          model: Empleados,
          as: "TTHH",
          attributes: [
            "empleado_id",
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
          include: {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            where: { activo: true },
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          include: {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "salario", "fecha_ingreso"],
            where: { activo: true },
            include: [
              {
                model: Cargos_Niveles,
                attributes: ["cargo_nivel_id", "nivel"],
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
          },
        },
      ],
    });

    if (!movimiento) {
      throw new Error(`No existe ese movimiento`);
    }

    return movimiento;
  } catch (error) {
    throw new Error(`Error al traer el movimiento: ${error.message}`);
  }
};

const crearMovimiento = async (
  empleado_id,
  cargo_empleado_id,
  clase_movimiento_id,
  duracion_movimiento,
  duracion_movimiento_dias,
  requiere_periodo_prueba,
  duracion_periodo_prueba,
  justificacion_movimiento,
  empresa_id,
  cargo_nivel_id,
  vigencia_movimiento_desde,
  vigencia_movimiento_hasta,
  tipo_nomina,
  otro_tipo_nomina,
  frecuencia_nomina,
  otra_frecuencia_nomina,
  sueldo,
  codigo_nomina,
  solicitante_id,
  supervisor_id,
  gerencia_id,
  tthh_id
) => {
  if (
    !empleado_id ||
    !clase_movimiento_id ||
    !duracion_movimiento ||
    !empresa_id ||
    !cargo_nivel_id ||
    cargo_nivel_id === "Seleccione" ||
    !vigencia_movimiento_desde ||
    !tipo_nomina ||
    !frecuencia_nomina ||
    !solicitante_id ||
    !supervisor_id ||
    !gerencia_id ||
    !tthh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerEmpleado(empleado_id);

    const existeMovimiento = await Movimientos.findOne({
      where: {
        empleado_id: empleado_id,
        estado_solicitud: "Pendiente por revisar",
      },
    });

    if (!existeMovimiento) {
      t = await conn.transaction();

      const crearMovimiento = await Movimientos.create(
        {
          empleado_id: empleado_id,
          cargo_actual_id: cargo_empleado_id || null,
          clase_movimiento_id: clase_movimiento_id,
          duracion_movimiento: duracion_movimiento,
          duracion_movimiento_dias:
            duracion_movimiento === "Temporal"
              ? duracion_movimiento_dias
              : null,
          requiere_periodo_prueba: requiere_periodo_prueba,
          duracion_periodo_prueba: requiere_periodo_prueba
            ? duracion_periodo_prueba
            : null,
          justificacion_movimiento: justificacion_movimiento || null,
          cargo_nivel_id: cargo_nivel_id,
          vigencia_movimiento_desde: vigencia_movimiento_desde,
          vigencia_movimiento_hasta: vigencia_movimiento_hasta || null,
          tipo_nomina: tipo_nomina,
          otro_tipo_nomina: tipo_nomina === "Otro" ? otro_tipo_nomina : null,
          frecuencia_nomina: frecuencia_nomina,
          otra_frecuencia_nomina:
            frecuencia_nomina === "Otro" ? otra_frecuencia_nomina : null,
          sueldo: sueldo || null,
          codigo_nomina: codigo_nomina || null,
          solicitante_id: solicitante_id,
          supervisor_id: supervisor_id,
          gerencia_id: gerencia_id,
          tthh_id: tthh_id,
        },
        { transaction: t }
      );

      await t.commit();
    } else {
      throw new Error(`Ese empleado posee un movimiento pendiente por revisar`);
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el movimiento: ${error.message}`);
  }
};

const modificarMovimiento = async (
  movimiento_id,
  clase_movimiento_id,
  duracion_movimiento,
  duracion_movimiento_dias,
  requiere_periodo_prueba,
  duracion_periodo_prueba,
  justificacion_movimiento,
  empresa_id,
  cargo_nivel_id,
  vigencia_movimiento_desde,
  vigencia_movimiento_hasta,
  tipo_nomina,
  otro_tipo_nomina,
  frecuencia_nomina,
  otra_frecuencia_nomina,
  sueldo,
  codigo_nomina,
  solicitante_id,
  supervisor_id,
  gerencia_id,
  tthh_id
) => {
  if (
    !movimiento_id ||
    !clase_movimiento_id ||
    !duracion_movimiento ||
    !empresa_id ||
    !cargo_nivel_id ||
    cargo_nivel_id === "Seleccione" ||
    !vigencia_movimiento_desde ||
    !tipo_nomina ||
    !frecuencia_nomina ||
    !solicitante_id ||
    !supervisor_id ||
    !gerencia_id ||
    !tthh_id
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerMovimiento(movimiento_id);

    t = await conn.transaction();

    await Movimientos.update(
      {
        clase_movimiento_id: clase_movimiento_id,
        duracion_movimiento: duracion_movimiento,
        duracion_movimiento_dias:
          duracion_movimiento === "Temporal" ? duracion_movimiento_dias : null,
        requiere_periodo_prueba: requiere_periodo_prueba,
        duracion_periodo_prueba: requiere_periodo_prueba
          ? duracion_periodo_prueba
          : null,
        justificacion_movimiento: justificacion_movimiento || null,
        cargo_nivel_id: cargo_nivel_id,
        vigencia_movimiento_desde: vigencia_movimiento_desde,
        vigencia_movimiento_hasta: vigencia_movimiento_hasta || null,
        tipo_nomina: tipo_nomina,
        otro_tipo_nomina: tipo_nomina === "Otro" ? otro_tipo_nomina : null,
        frecuencia_nomina: frecuencia_nomina,
        otra_frecuencia_nomina:
          frecuencia_nomina === "Otro" ? otra_frecuencia_nomina : null,
        sueldo: sueldo || null,
        codigo_nomina: codigo_nomina || null,
        solicitante_id: solicitante_id,
        supervisor_id: supervisor_id,
        gerencia_id: gerencia_id,
        tthh_id: tthh_id,
        estado_solicitud: "Pendiente por revisar",
        revisado_por_id: null,
        observaciones: null,
      },
      {
        where: {
          movimiento_id: movimiento_id,
        },
        transaction: t,
      }
    );

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el movimiento: ${error.message}`);
  }
};

const aprobarMovimiento = async (
  movimiento_id,
  revisado_por_id,
  observaciones
) => {
  if (!movimiento_id || !revisado_por_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const movimiento = await Movimientos.findOne({
      where: {
        movimiento_id: movimiento_id,
        estado_solicitud: "Pendiente por revisar",
      },
      include: {
        model: Cargos_Niveles,
        as: "Nuevo_Cargo",
        include: {
          model: Cargos,
          include: {
            model: Departamentos,
            include: {
              model: Empresas,
              required: true,
            },
          },
        },
      },
    });

    if (movimiento) {
      t = await conn.transaction();

      await Movimientos.update(
        {
          estado_solicitud: "Aprobada",
          revisado_por_id: revisado_por_id,
          observaciones: observaciones || null,
        },
        {
          where: {
            movimiento_id: movimiento.movimiento_id,
          },
          transaction: t,
        }
      );

      await Cargos_Empleados.update(
        {
          activo: false,
        },
        {
          where: {
            empleado_id: movimiento.empleado_id,
            activo: true,
          },
          transaction: t,
        }
      );

      await Cargos_Empleados.create(
        {
          empleado_id: movimiento.empleado_id,
          cargo_nivel_id: movimiento.cargo_nivel_id,
          salario: movimiento.sueldo,
          fecha_ingreso: movimiento.vigencia_movimiento_desde,
        },
        { transaction: t }
      );

      await Empleados.update(
        {
          empresa_id:
            movimiento.Nuevo_Cargo.Cargo.Departamento.Empresa.empresa_id,
        },
        {
          where: {
            empleado_id: movimiento.empleado_id,
          },
          transaction: t,
        }
      );

      await t.commit();
    } else {
      throw new Error(`Ese movimiento ya fue revisado o no existe`);
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el movimiento: ${error.message}`);
  }
};

const denegarMovimiento = async (
  movimiento_id,
  revisado_por_id,
  observaciones
) => {
  if (!movimiento_id || !revisado_por_id || !observaciones) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const movimiento = await Movimientos.findOne({
      where: {
        movimiento_id: movimiento_id,
        estado_solicitud: "Pendiente por revisar",
      },
    });

    if (movimiento) {
      t = await conn.transaction();

      await Movimientos.update(
        {
          estado_solicitud: "Denegada",
          revisado_por_id: revisado_por_id,
          observaciones: observaciones,
        },
        {
          where: {
            movimiento_id: movimiento.movimiento_id,
          },
          transaction: t,
        }
      );

      await t.commit();
    } else {
      throw new Error(`Ese movimiento ya fue revisado o no existe`);
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el movimiento: ${error.message}`);
  }
};

const inactivarMovimiento = async (movimiento_id) => {
  if (!movimiento_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const movimiento = await traerMovimiento(movimiento_id);

    await Movimientos.update(
      { activo: !movimiento.activo },
      {
        where: { movimiento_id: movimiento_id },
        transaction: t,
      }
    );

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el movimiento: ${error.message}`);
  }
};

module.exports = {
  todosLosMovimientos,
  traerMovimiento,
  crearMovimiento,
  modificarMovimiento,
  aprobarMovimiento,
  denegarMovimiento,
  inactivarMovimiento,
};
