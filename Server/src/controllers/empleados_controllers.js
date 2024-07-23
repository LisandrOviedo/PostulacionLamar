const { Op } = require("sequelize");

const axios = require("axios");

const fs = require("fs");

const {
  conn,
  Empleados,
  Roles,
  Cargos,
  Cargos_Empleados,
  Empresas,
  Paises,
} = require("../db");

const { API_EMPLEADOS } = process.env;

const { YYYYMMDD, fechaHoraActual } = require("../utils/formatearFecha");

const {
  ordenarNombresAPI,
  ordenarDireccionesAPI,
} = require("../utils/formatearTexto");

const { empleados } = require("../utils/empleados");

const { crearSesion, traerSesion } = require("./sesiones_controllers");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const todosLosEmpleados = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataEmpleados } =
      await Empleados.findAndCountAll({
        attributes: {
          exclude: ["rol_id", "clave"],
        },
        where: {
          [Op.and]: [
            filtros.numero_identificacion
              ? {
                  numero_identificacion: {
                    [Op.like]: `%${filtros.numero_identificacion}%`,
                  },
                }
              : filtros.apellidos
              ? { apellidos: { [Op.like]: `%${filtros.apellidos}%` } }
              : {},
            filtros.activo === "1" || filtros.activo === "0"
              ? { activo: filtros.activo }
              : {},
          ],
        },
        distinct: true,
        order: [
          filtros.orden_campo === "apellidos"
            ? ["apellidos", filtros.orden_por]
            : filtros.orden_campo === "activo"
            ? ["activo", filtros.orden_por]
            : filtros.orden_campo === "updatedAt"
            ? ["updatedAt", filtros.orden_por]
            : null,
        ].filter(Boolean),
      });

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const empleados = dataEmpleados.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, empleados };
  } catch (error) {
    throw new Error(`Error al traer todos los empleados: ${error.message}`);
  }
};

const traerEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const empleado = await Empleados.findByPk(empleado_id, {
      attributes: {
        exclude: ["rol_id", "clave"],
      },
      include: [
        {
          model: Roles,
          attributes: ["nombre", "descripcion"],
        },
        {
          model: Cargos,
          through: {
            model: Cargos_Empleados,
            where: {
              activo: true,
            },
            attributes: [],
          },
          attributes: ["descripcion"],
          include: [
            {
              model: Empresas,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });

    if (!empleado) {
      throw new Error(`No existe ese empleado`);
    }

    return empleado;
  } catch (error) {
    throw new Error(`Error al traer el empleado: ${error.message}`);
  }
};

const login = async (tipo_identificacion, numero_identificacion, clave) => {
  if (!tipo_identificacion || !numero_identificacion || !clave) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const empleado = await Empleados.findOne({
      attributes: {
        exclude: ["rol_id"],
      },
      where: {
        tipo_identificacion: tipo_identificacion,
        numero_identificacion: numero_identificacion,
      },
      include: [
        {
          model: Roles,
          attributes: ["rol_id", "nombre"],
        },
      ],
    });

    if (!empleado) {
      throw new Error(`Datos incorrectos`);
    }

    if (!empleado.activo) {
      throw new Error(
        `Tienes el acceso restringido, ya que tu usuario se encuentra inactivo`
      );
    }

    const claveCoincide = await bcrypt.compare(clave, empleado.clave);

    if (!claveCoincide) {
      throw new Error(`Datos incorrectos`);
    }

    const rolCifrado = await bcrypt.hash(empleado.Role.nombre, 10);

    if (clave == "1234") {
      return {
        empleado_id: empleado.empleado_id,
        changePassword: true,
        rol: empleado.Role.nombre,
      };
    }

    const sesion = await traerSesion(empleado.empleado_id);

    if (sesion && sesion.activo === true) {
      const diferencia_fechas =
        new Date() - new Date(sesion.updatedAt).getTime();

      if (diferencia_fechas < 300000) {
        throw new Error(
          `Posees una sesión activa, debes cerrar la sesión anterior o volver a ingresar dentro de 5 minutos`
        );
      }
    }

    const token = jwt.sign(
      {
        empleado_id: empleado.empleado_id,
        rol: rolCifrado,
      },
      SECRET_KEY,
      { expiresIn: "4h" }
    );

    const infoEmpleado = await traerEmpleado(empleado.empleado_id);

    await crearSesion(empleado.empleado_id, token);

    return { token, infoEmpleado };
  } catch (error) {
    throw new Error(`Error al loguear: ${error.message}`);
  }
};

const cargarEmpleados = async () => {
  let t;

  try {
    const rolEmpleado = await Roles.findOne({
      where: {
        nombre: "empleado",
      },
    });

    const nacionalidad_venezolana = await Paises.findOne({
      where: {
        nombre: "Venezuela",
      },
    });

    const { data } = await axios(API_EMPLEADOS);

    console.log(`${fechaHoraActual()} - Hizo la consulta de empleados`);

    for (const empleadoAPI of data) {
      t = await conn.transaction();

      const [crearEmpleado, created] = await Empleados.findOrCreate({
        where: {
          tipo_identificacion:
            empleadoAPI.nacionalidad === "Venezolano"
              ? "V"
              : empleadoAPI.nacionalidad === "Extranjero"
              ? "E"
              : null,
          numero_identificacion: empleadoAPI.cedula,
        },
        defaults: {
          rol_id: rolEmpleado.rol_id,
          nombres: ordenarNombresAPI(empleadoAPI.nombres),
          apellidos: ordenarNombresAPI(empleadoAPI.apellidos),
          tipo_identificacion:
            empleadoAPI.nacionalidad === "Venezolano"
              ? "V"
              : empleadoAPI.nacionalidad === "Extranjero"
              ? "E"
              : null,
          numero_identificacion: empleadoAPI.cedula,
          fecha_nacimiento: `${YYYYMMDD(empleadoAPI.fecha_nacimiento)}`,
          nacimiento_pais_id:
            empleadoAPI.nacionalidad === "Venezolano"
              ? nacionalidad_venezolana.pais_id
              : null,
          // direccion: ordenarDireccionesAPI(empleadoAPI.direccion) || null,
        },
        transaction: t,
      });

      await t.commit();
    }

    console.log(`${fechaHoraActual()} - Terminó de registrar los empleados`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear los empleados: ${error.message}`);
  }
};

const crearEmpleado = async ({
  rol_id,
  nombres,
  apellidos,
  tipo_identificacion,
  numero_identificacion,
  estado_civil,
  rif,
  telefono,
  correo,
  etnia_id,
  mano_dominante,
  sexo,
  factor_grupo_sanguineo,
  cantidad_hijos,
  carga_familiar,
  fecha_nacimiento,
  nacimiento_ciudad_id,
  nacimiento_estado_id,
  nacimiento_pais_id,
  licencia_conducir_grado,
  licencia_conducir_vencimiento,
  carta_medica_vencimiento,
  talla_camisa,
  talla_pantalon,
  talla_calzado,
  trabajo_anteriormente_especifique,
  motivo_retiro,
  posee_parientes_empresa,
}) => {
  if (
    !nombres ||
    !apellidos ||
    !tipo_identificacion ||
    !numero_identificacion ||
    !estado_civil ||
    !etnia_id ||
    !mano_dominante ||
    !sexo ||
    !cantidad_hijos ||
    !carga_familiar ||
    !fecha_nacimiento ||
    !nacimiento_ciudad_id ||
    !nacimiento_estado_id ||
    !nacimiento_pais_id ||
    !talla_camisa ||
    !talla_pantalon ||
    !talla_calzado ||
    !posee_parientes_empresa
  ) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const claveCifrada = await bcrypt.hash("1234", 10);

    const [empleado, created] = await Empleados.findOrCreate(
      {
        where: {
          tipo_identificacion: tipo_identificacion,
          numero_identificacion: numero_identificacion,
        },
        defaults: {
          rol_id: rol_id,
          nombres: nombres,
          apellidos: apellidos,
          tipo_identificacion: tipo_identificacion,
          numero_identificacion: numero_identificacion,
          clave: claveCifrada,
          estado_civil: estado_civil,
          rif: rif || null,
          telefono: telefono || null,
          correo: correo || null,
          etnia_id: etnia_id || null,
          mano_dominante: mano_dominante,
          sexo: sexo,
          factor_grupo_sanguineo: factor_grupo_sanguineo || null,
          cantidad_hijos: cantidad_hijos,
          carga_familiar: carga_familiar,
          fecha_nacimiento: fecha_nacimiento,
          nacimiento_ciudad_id: nacimiento_ciudad_id,
          nacimiento_estado_id: nacimiento_estado_id,
          nacimiento_pais_id: nacimiento_pais_id,
          licencia_conducir_grado: licencia_conducir_grado || null,
          licencia_conducir_vencimiento: licencia_conducir_vencimiento || null,
          carta_medica_vencimiento: carta_medica_vencimiento || null,
          talla_camisa: talla_camisa,
          talla_pantalon: talla_pantalon,
          talla_calzado: talla_calzado,
          trabajo_anteriormente_especifique:
            trabajo_anteriormente_especifique || null,
          motivo_retiro: motivo_retiro || null,
          posee_parientes_empresa: posee_parientes_empresa,
        },
      },
      { transaction: t }
    );

    await t.commit();

    if (created) {
      return empleado;
    }

    throw new Error(`Ya existe un empleado con esa cédula de identidad`);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el empleado: ${error.message}`);
  }
};

const actualizarClaveTemporalEmpleado = async (empleado_id, clave) => {
  if (!empleado_id || !clave) {
    throw new Error(`Datos faltantes`);
  }

  if (clave == "1234") {
    throw new Error(`Debes ingresar una contraseña diferente a 1234`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await Empleados.findOne({
      where: {
        empleado_id: empleado_id,
      },
    });

    if (empleado) {
      const claveTemporal = await bcrypt.compare("1234", empleado.clave);

      if (!claveTemporal) {
        throw new Error(
          `Ya has actualizado tu clave temporal anteriormente. Para actualizar tu clave actual primero debes iniciar sesión en tu cuenta y luego dirigirte a "Mi Perfil" y luego a "Actualizar contraseña"`
        );
      }
    }

    const claveCifrada = await bcrypt.hash(clave, 10);

    await Empleados.update(
      {
        clave: claveCifrada,
      },
      {
        where: {
          empleado_id: empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empleado: ${error.message}`);
  }
};

const modificarEmpleado = async (datosPersonales) => {
  if (!datosPersonales.empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  const camposActualizar = {};

  if (datosPersonales.rol_id) {
    camposActualizar.rol_id = datosPersonales.rol_id;
  }

  if (datosPersonales.nombres) {
    camposActualizar.nombres = datosPersonales.nombres;
  }

  if (datosPersonales.apellidos) {
    camposActualizar.apellidos = datosPersonales.apellidos;
  }

  if (datosPersonales.tipo_identificacion) {
    camposActualizar.tipo_identificacion = datosPersonales.tipo_identificacion;
  }

  if (datosPersonales.numero_identificacion) {
    camposActualizar.numero_identificacion =
      datosPersonales.numero_identificacion;
  }

  if (datosPersonales.estado_civil) {
    camposActualizar.estado_civil = datosPersonales.estado_civil;
  }

  if (datosPersonales.rif) {
    camposActualizar.rif = datosPersonales.rif;
  }

  if (datosPersonales.telefono) {
    camposActualizar.telefono = datosPersonales.telefono;
  }

  if (datosPersonales.correo) {
    camposActualizar.correo = datosPersonales.correo;
  }

  if (datosPersonales.etnia_id) {
    camposActualizar.etnia_id = datosPersonales.etnia_id;
  }

  if (datosPersonales.mano_dominante) {
    camposActualizar.mano_dominante = datosPersonales.mano_dominante;
  }

  if (datosPersonales.sexo) {
    camposActualizar.sexo = datosPersonales.sexo;
  }

  if (datosPersonales.factor_grupo_sanguineo) {
    camposActualizar.factor_grupo_sanguineo =
      datosPersonales.factor_grupo_sanguineo;
  }

  if (datosPersonales.cantidad_hijos) {
    camposActualizar.cantidad_hijos = datosPersonales.cantidad_hijos;
  }

  if (datosPersonales.carga_familiar) {
    camposActualizar.carga_familiar = datosPersonales.carga_familiar;
  }

  if (datosPersonales.fecha_nacimiento) {
    camposActualizar.fecha_nacimiento = datosPersonales.fecha_nacimiento;
  }

  if (datosPersonales.nacimiento_ciudad_id) {
    camposActualizar.nacimiento_ciudad_id =
      datosPersonales.nacimiento_ciudad_id;
  }

  if (datosPersonales.nacimiento_estado_id) {
    camposActualizar.nacimiento_estado_id =
      datosPersonales.nacimiento_estado_id;
  }

  if (datosPersonales.nacimiento_pais_id) {
    camposActualizar.nacimiento_pais_id = datosPersonales.nacimiento_pais_id;
  }

  if (datosPersonales.licencia_conducir_grado) {
    camposActualizar.licencia_conducir_grado =
      datosPersonales.licencia_conducir_grado;
  }
  if (datosPersonales.licencia_conducir_vencimiento) {
    camposActualizar.licencia_conducir_vencimiento =
      datosPersonales.licencia_conducir_vencimiento;
  }
  if (datosPersonales.carta_medica_vencimiento) {
    camposActualizar.carta_medica_vencimiento =
      datosPersonales.carta_medica_vencimiento;
  }
  if (datosPersonales.talla_camisa) {
    camposActualizar.talla_camisa = datosPersonales.talla_camisa;
  }
  if (datosPersonales.talla_pantalon) {
    camposActualizar.talla_pantalon = datosPersonales.talla_pantalon;
  }
  if (datosPersonales.talla_calzado) {
    camposActualizar.talla_calzado = datosPersonales.talla_calzado;
  }
  if (datosPersonales.trabajo_anteriormente_especifique) {
    camposActualizar.trabajo_anteriormente_especifique =
      datosPersonales.trabajo_anteriormente_especifique;
  }
  if (datosPersonales.motivo_retiro) {
    camposActualizar.motivo_retiro = datosPersonales.motivo_retiro;
  }
  if (datosPersonales.posee_parientes_empresa) {
    camposActualizar.posee_parientes_empresa =
      datosPersonales.posee_parientes_empresa;
  }

  if (datosPersonales.activo) {
    camposActualizar.activo = datosPersonales.activo;
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(datosPersonales.empleado_id);

    await Empleados.update(
      camposActualizar,
      {
        where: {
          empleado_id: datosPersonales.empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(datosPersonales.empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empleado: ${error.message}`);
  }
};

const modificarFotoEmpleado = async (empleado_id, filename, path) => {
  if (!empleado_id || !filename || !path) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await traerEmpleado(empleado_id);

    const rutaArchivo = empleado.foto_perfil_ruta;

    if (rutaArchivo) {
      fs.unlink(rutaArchivo, (error) => {
        if (error) {
          console.error(
            `${fechaHoraActual()} - Error al borrar el archivo:`,
            error
          );
        }
      });
    }

    await Empleados.update(
      {
        foto_perfil_nombre: filename,
        foto_perfil_ruta: path,
      },
      {
        where: {
          empleado_id: empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empleado: ${error.message}`);
  }
};

const actualizarClaveEmpleado = async (
  empleado_id,
  claveAnterior,
  claveNueva
) => {
  if (!empleado_id || !claveAnterior || !claveNueva) {
    throw new Error(`Datos faltantes`);
  }

  if (claveNueva == "1234") {
    throw new Error(`Debes ingresar una contraseña diferente a 1234`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await Empleados.findByPk(empleado_id, {
      attributes: ["clave"],
    });

    const compararClaves = await bcrypt.compare(claveAnterior, empleado.clave);

    if (!compararClaves) {
      throw new Error(`Debes ingresar correctamente tu clave actual`);
    }

    const claveCifradaNueva = await bcrypt.hash(claveNueva, 10);

    await Empleados.update(
      {
        clave: claveCifradaNueva,
      },
      {
        where: {
          empleado_id: empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empleado: ${error.message}`);
  }
};

const reiniciarClaveEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    const claveCifrada = await bcrypt.hash("1234", 10);

    await Empleados.update(
      {
        clave: claveCifrada,
      },
      {
        where: {
          empleado_id: empleado_id,
        },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el empleado: ${error.message}`);
  }
};

const inactivarEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await traerEmpleado(empleado_id);

    await Empleados.update(
      { activo: !empleado.activo },
      {
        where: { empleado_id: empleado_id },
      },
      { transaction: t }
    );

    await t.commit();

    return await traerEmpleado(empleado_id);
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el empleado: ${error.message}`);
  }
};

module.exports = {
  todosLosEmpleados,
  traerEmpleado,
  login,
  cargarEmpleados,
  crearEmpleado,
  actualizarClaveTemporalEmpleado,
  modificarEmpleado,
  modificarFotoEmpleado,
  actualizarClaveEmpleado,
  reiniciarClaveEmpleado,
  inactivarEmpleado,
};
