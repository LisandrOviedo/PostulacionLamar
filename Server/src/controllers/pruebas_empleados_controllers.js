const { conn, Pruebas_Empleado } = require("../db");

const todasLasPruebas = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error("Datos faltantes");
  }

  try {
    const pruebas = await Pruebas_Empleado.findAll();

    if (!pruebas.length) {
      throw new Error("No existen pruebas");
    }

    return pruebas;
  } catch (error) {
    throw new Error("Error al traer todas las pruebas: " + error.message);
  }
};

const traerPruebasEmpleados = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error("Datos faltantes");
  }

  try {
    const pruebas = await Pruebas_Empleado.findAll({
      where: {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      order: [["createdAt", "DESC"]],
    });

    return pruebas;
  } catch (error) {
    throw new Error(
      "Error al traer todas las pruebas de ese empleado: " + error.message
    );
  }
};

const traerPrueba = async (prueba_id) => {
  if (!prueba_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const prueba = await Pruebas_Empleado.findByPk(prueba_id);

    if (!prueba) {
      throw new Error("No existe esa prueba");
    }

    return prueba;
  } catch (error) {
    throw new Error("Error al traer la prueba: " + error.message);
  }
};

const crearPrueba = async (empleado_id, prueba) => {
  if (!empleado_id || !prueba) {
    throw new Error("Datos faltantes");
  }

  let t;

  try {
    t = await conn.transaction();

    const crearPrueba = await Pruebas_Empleado.create(
      {
        empleado_id: empleado_id,
        prueba: prueba,
      },
      { transaction: t }
    );

    await t.commit();

    return crearPrueba;
  } catch (error) {
    await t.rollback();

    throw new Error("Error al crear la prueba: " + error.message);
  }
};

module.exports = {
  todasLasPruebas,
  traerPruebasEmpleados,
  traerPrueba,
  crearPrueba,
};
