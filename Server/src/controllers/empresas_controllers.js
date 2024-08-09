const axios = require("axios");

const { conn, Empresas } = require("../db");

const {
  ordenarNombresAPI,
  ordenarDireccionesAPI,
} = require("../utils/formatearTexto");

const { fechaHoraActual } = require("../utils/formatearFecha");

const { API_EMPLEADOS } = process.env;

const { empresas_faltantes } = require("../utils/empresas");

const todasLasEmpresas = async () => {
  try {
    const empresas = await Empresas.findAll();

    return empresas;
  } catch (error) {
    throw new Error(`Error al traer todas las empresas: ${error.message}`);
  }
};

const todasLasEmpresasActivas = async () => {
  try {
    const empresas = await Empresas.findAll({
      where: { activo: true },
    });

    return empresas;
  } catch (error) {
    throw new Error(`Error al traer todas las empresas: ${error.message}`);
  }
};

const traerEmpresa = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const empresa = await Empresas.findByPk(empresa_id);

    if (!empresa) {
      throw new Error(`No existe esa empresa`);
    }

    return empresa;
  } catch (error) {
    throw new Error(`Error al traer el empresa: ${error.message}`);
  }
};

const cargarEmpresas = async () => {
  let t;

  try {
    const { data } = await axios(API_EMPLEADOS);

    console.log(`${fechaHoraActual()} - Hizo la consulta de empresas`);

    for (const empresaAPI of data) {
      if (
        empresaAPI.descripcion_empresa
          .toLowerCase()
          .includes("aquatic feeds aquafica") ||
        empresaAPI.descripcion_empresa.toLowerCase().includes("pesca atlantico")
      ) {
        continue;
      }

      const empresa = await Empresas.findOne({
        where: {
          codigo_empresa: empresaAPI.codigo_empresa,
          nombre: ordenarNombresAPI(empresaAPI.descripcion_empresa),
        },
      });

      if (!empresa) {
        t = await conn.transaction();

        await Empresas.create(
          {
            codigo_empresa: empresaAPI.codigo_empresa,
            nombre: ordenarNombresAPI(empresaAPI.descripcion_empresa),
            direccion:
              ordenarDireccionesAPI(empresaAPI.direccion_empresa) || null,
            rif: empresaAPI.rif_empresa || null,
          },
          { transaction: t }
        );

        await t.commit();
      }
    }

    for (const empresa_faltante of empresas_faltantes) {
      const empresa2 = await Empresas.findOne({
        where: {
          codigo_empresa: empresa_faltante.codigo_empresa,
          nombre: ordenarNombresAPI(empresa_faltante.descripcion_empresa),
        },
      });

      if (!empresa2) {
        t = await conn.transaction();

        await Empresas.create(
          {
            codigo_empresa: empresa_faltante.codigo_empresa,
            nombre: ordenarNombresAPI(empresa_faltante.descripcion_empresa),
            direccion:
              ordenarDireccionesAPI(empresa_faltante.direccion_empresa) || null,
            rif: empresa_faltante.rif_empresa || null,
          },
          { transaction: t }
        );

        await t.commit();
      }
    }

    console.log(`${fechaHoraActual()} - Terminó de registrar las empresas`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear las empresas: ${error.message}`);
  }
};

const crearEmpresa = async (codigo_empresa, nombre, direccion, rif) => {
  if (!codigo_empresa || !nombre || !direccion || !rif) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [empresa, created] = await Empresas.findOrCreate({
      where: {
        codigo_empresa: codigo_empresa,
        nombre: nombre,
        direccion: direccion,
        rif: rif,
      },
      defaults: {
        codigo_empresa: codigo_empresa,
        nombre: nombre,
        direccion: direccion,
        rif: rif,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return empresa;
    }

    throw new Error(`Ya existe un empresa con ese nombre`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el empresa: ${error.message}`);
  }
};

const modificarEmpresa = async (
  empresa_id,
  codigo_empresa,
  nombre,
  direccion,
  rif
) => {
  if (!empresa_id || !codigo_empresa || !nombre || !direccion || !rif) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpresa(empresa_id);

    await Empresas.update(
      {
        codigo_empresa: codigo_empresa,
        nombre: nombre,
        direccion: direccion,
        rif: rif,
      },
      {
        where: {
          empresa_id: empresa_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpresa(empresa_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empresa: ${error.message}`);
  }
};

const inactivarEmpresa = async (empresa_id) => {
  if (!empresa_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empresa = await traerEmpresa(empresa_id);

    await Empresas.update(
      { activo: !empresa.activo },
      {
        where: { empresa_id: empresa_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpresa(empresa_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el empresa: ${error.message}`);
  }
};

module.exports = {
  todasLasEmpresas,
  todasLasEmpresasActivas,
  traerEmpresa,
  cargarEmpresas,
  crearEmpresa,
  modificarEmpresa,
  inactivarEmpresa,
};
