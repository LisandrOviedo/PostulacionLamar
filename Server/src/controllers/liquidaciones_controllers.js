const { Op } = require("sequelize");

const {
  conn,
  Liquidaciones,
  Empleados,
  Cargos_Empleados,
  Cargos_Niveles,
  Departamentos,
  Empresas,
  Cargos,
} = require("../db");

const { traerEmpleado } = require("./empleados_controllers");

const todasLasLiquidaciones = async (
  paginaActual,
  limitePorPagina,
  buscar_por,
  buscar,
  orden_campo,
  orden_por,
  activo
) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  let condicionesLiquidaciones = {};

  let condicionesEmpleado = {};

  if (buscar_por && buscar) {
    condicionesEmpleado[buscar_por] = { [Op.like]: `%${buscar}%` };
  }

  if (activo) {
    condicionesLiquidaciones.activo = activo;
  }

  try {
    const { count: totalRegistros, rows: dataLiquidaciones } =
      await Liquidaciones.findAndCountAll({
        where: condicionesLiquidaciones,
        include: [
          {
            model: Empleados,
            where: condicionesLiquidaciones,
            attributes: [
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
          },
          {
            model: Cargos_Empleados,
            attributes: ["cargo_empleado_id", "fecha_ingreso", "fecha_egreso"],
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
            model: Empleados,
            as: "RealizadoPor",
            attributes: [
              "nombres",
              "apellidos",
              "tipo_identificacion",
              "numero_identificacion",
            ],
          },
        ],
        distinct: true,
        order: [orden_campo ? [orden_campo, orden_por] : null].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const liquidaciones = dataLiquidaciones.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, liquidaciones };
  } catch (error) {
    throw new Error(`Error al traer todas las liquidaciones: ${error.message}`);
  }
};

const traerLiquidacion = async (liquidacion_id) => {
  if (!liquidacion_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const liquidacion = await Liquidaciones.findByPk(liquidacion_id, {
      include: [
        {
          model: Empleados,
          attributes: [
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
        },
        {
          model: Cargos_Empleados,
          attributes: ["cargo_empleado_id", "fecha_ingreso", "fecha_egreso"],
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
          model: Empleados,
          as: "CreadoPor",
          attributes: [
            "nombres",
            "apellidos",
            "tipo_identificacion",
            "numero_identificacion",
          ],
        },
      ],
    });

    if (!liquidacion) {
      throw new Error(`No existe esa liquidación`);
    }

    return liquidacion;
  } catch (error) {
    throw new Error(`Error al traer la liquidación: ${error.message}`);
  }
};

const crearLiquidacion = async (
  codigo,
  empleado_id,
  cargo_empleado_id,
  fecha_egreso,
  motivo_retiro,
  causa,
  ssst,
  anticipos_prestamos,
  vacaciones_vencidas,
  dias_cesta_ticket,
  poliza_hcm,
  bonificacion,
  creado_por_id
) => {
  if (
    !codigo ||
    !empleado_id ||
    !cargo_empleado_id ||
    !fecha_egreso ||
    !motivo_retiro ||
    !causa ||
    !anticipos_prestamos ||
    !vacaciones_vencidas ||
    !dias_cesta_ticket ||
    !poliza_hcm ||
    !bonificacion ||
    !creado_por_id
  ) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    const empleado = await traerEmpleado(empleado_id);

    if (empleado.activo) {
      t = await conn.transaction();

      await Liquidaciones.create(
        {
          codigo: codigo,
          empleado_id: empleado_id,
          cargo_empleado_id: cargo_empleado_id,
          fecha_egreso: fecha_egreso,
          motivo_retiro: motivo_retiro,
          causa: causa,
          ssst: ssst || null,
          anticipos_prestamos: anticipos_prestamos,
          vacaciones_vencidas: vacaciones_vencidas,
          dias_cesta_ticket: dias_cesta_ticket,
          poliza_hcm: poliza_hcm,
          bonificacion: bonificacion,
          creado_por_id: creado_por_id,
        },
        { transaction: t }
      );

      await Empleados.update(
        {
          activo: false,
        },
        {
          where: {
            empleado_id: empleado_id,
          },
          transaction: t,
        }
      );

      await t.commit();
    } else {
      throw new Error(
        "Error al crear la liquidación: El empleado se encuentra inactivo"
      );
    }
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }
    throw new Error(`Error al crear la liquidación: ${error.message}`);
  }
};

const modificarLiquidacion = async (
  liquidacion_id,
  codigo,
  fecha_egreso,
  motivo_retiro,
  causa,
  ssst,
  anticipos_prestamos,
  vacaciones_vencidas,
  dias_cesta_ticket,
  poliza_hcm,
  bonificacion
) => {
  if (
    !liquidacion_id ||
    !codigo ||
    !fecha_egreso ||
    !motivo_retiro ||
    !causa ||
    !anticipos_prestamos ||
    !vacaciones_vencidas ||
    !dias_cesta_ticket ||
    !poliza_hcm ||
    !bonificacion
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerLiquidacion(liquidacion_id);

    t = await conn.transaction();

    await Liquidaciones.update(
      {
        codigo: codigo,
        fecha_egreso: fecha_egreso,
        motivo_retiro: motivo_retiro,
        causa: causa,
        ssst: ssst,
        anticipos_prestamos: anticipos_prestamos,
        vacaciones_vencidas: vacaciones_vencidas,
        dias_cesta_ticket: dias_cesta_ticket,
        poliza_hcm: poliza_hcm,
        bonificacion: bonificacion,
      },
      {
        where: { liquidacion_id: liquidacion_id },
        transaction: t,
      }
    );

    await t.commit();
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar la liquidación: ${error.message}`);
  }
};

const inactivarLiquidacion = async (liquidacion_id) => {
  if (!liquidacion_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const liquidacion = await traerLiquidacion(liquidacion_id);

    t = await conn.transaction();

    await Liquidaciones.update(
      { activo: !liquidacion.activo },
      {
        where: { liquidacion_id: liquidacion_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerLiquidacion(liquidacion_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar la liquidación: ${error.message}`);
  }
};

module.exports = {
  todasLasLiquidaciones,
  traerLiquidacion,
  crearLiquidacion,
  modificarLiquidacion,
  inactivarLiquidacion,
};
