const { Op } = require("sequelize");

const axios = require("axios");

const fs = require("fs");

const {
  conn,
  Empleado,
  Roles,
  Cargo,
  Cargo_Empleado,
  Empresa,
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
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const { count: totalRegistros, rows: dataEmpleados } =
      await Empleado.findAndCountAll({
        attributes: {
          exclude: ["rol_id", "clave"],
        },
        where: {
          [Op.and]: [
            filtros.cedula
              ? { cedula: { [Op.like]: `%${filtros.cedula}%` } }
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
    throw new Error(
      `${fechaHoraActual()} - Error al traer todos los empleados:`,
      error.message
    );
  }
};

const traerEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id, {
      attributes: {
        exclude: ["rol_id", "clave"],
      },
      include: [
        {
          model: Roles,
          attributes: ["nombre", "descripcion"],
        },
        {
          model: Cargo,
          through: {
            model: Cargo_Empleado,
            where: {
              activo: true,
            },
            attributes: [],
          },
          attributes: ["descripcion"],
          include: [
            {
              model: Empresa,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    });

    if (!empleado) {
      throw new Error(`${fechaHoraActual()} - No existe ese empleado`);
    }

    return empleado;
  } catch (error) {
    throw new Error(
      `${fechaHoraActual()} - Error al traer el empleado:`,
      error.message
    );
  }
};

const login = async (cedula, clave) => {
  if (!cedula || !clave) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  try {
    const empleado = await Empleado.findOne({
      attributes: {
        exclude: ["rol_id"],
      },
      where: { cedula: cedula },
      include: [
        {
          model: Roles,
          attributes: ["rol_id", "nombre"],
        },
      ],
    });

    if (!empleado) {
      throw new Error(`${fechaHoraActual()} - Datos incorrectos`);
    }

    if (!empleado.activo) {
      throw new Error(
        `${fechaHoraActual()} - Tienes el acceso restringido, ya que tu usuario se encuentra inactivo`
      );
    }

    const claveCoincide = await bcrypt.compare(clave, empleado.clave);

    if (!claveCoincide) {
      throw new Error(`${fechaHoraActual()} - Datos incorrectos`);
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
          `${fechaHoraActual()} - Posees una sesión activa, debes cerrar la sesión anterior o volver a ingresar dentro de 5 minutos`
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
    throw new Error(`${fechaHoraActual()} - Error al loguear:`, error.message);
  }
};

const cargarEmpleados = async () => {
  let t;

  try {
    // const rolAdmin = await Roles.findOne({
    //   where: {
    //     nombre: "admin",
    //   },
    // });

    // for (const empleado of empleados) {
    //   t = await conn.transaction();

    //   const [crearEmpleado, created] = await Empleado.findOrCreate({
    //     where: { cedula: empleado.cedula },
    //     defaults: {
    //       rol_id: rolAdmin.rol_id,
    //       nombres: ordenarTextoAPI(empleado.nombres),
    //       apellidos: ordenarTextoAPI(empleado.apellidos),
    //       fecha_nacimiento: empleado.fecha_nacimiento,
    //     },
    //     transaction: t,
    //   });

    //   await t.commit();
    // }

    const rolEmpleado = await Roles.findOne({
      where: {
        nombre: "empleado",
      },
    });

    const { data } = await axios(API_EMPLEADOS);

    console.log(`${fechaHoraActual()} - Hizo la consulta de empleados`);

    for (const empleadoReal of data) {
      let empleado = await Empleado.findOne({
        where: {
          cedula: empleadoReal.cedula,
        },
      });

      if (!empleado) {
        t = await conn.transaction();

        await Empleado.create(
          {
            rol_id: rolEmpleado.rol_id,
            cedula: empleadoReal.cedula,
            nombres: ordenarNombresAPI(empleadoReal.nombres),
            apellidos: ordenarNombresAPI(empleadoReal.apellidos),
            fecha_nacimiento: `${YYYYMMDD(empleadoReal.fecha_nacimiento)}`,
            direccion: ordenarDireccionesAPI(empleadoReal.direccion) || null,
          },
          { transaction: t }
        );

        await t.commit();
      }
    }

    console.log(`${fechaHoraActual()} - Terminó de registrar los empleados`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear los empleados:`,
      error.message
    );
  }
};

const crearEmpleado = async (
  rol_id,
  cedula,
  nombres,
  apellidos,
  fecha_nacimiento,
  genero,
  etnia_id,
  telefono,
  correo,
  direccion,
  cantidad_hijos
) => {
  if (
    !cedula ||
    !nombres ||
    !apellidos ||
    !fecha_nacimiento ||
    !genero ||
    !telefono ||
    !direccion ||
    !cantidad_hijos
  ) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const claveCifrada = await bcrypt.hash("1234", 10);

    const [empleado, created] = await Empleado.findOrCreate(
      {
        where: { cedula: cedula },
        defaults: {
          rol_id: rol_id,
          cedula: cedula,
          clave: claveCifrada,
          nombres: nombres,
          apellidos: apellidos,
          fecha_nacimiento: fecha_nacimiento,
          genero: genero,
          etnia_id: etnia_id || null,
          telefono: telefono,
          correo: correo || null,
          direccion: direccion,
          cantidad_hijos: cantidad_hijos,
        },
      },
      { transaction: t }
    );

    await t.commit();

    if (created) {
      return empleado;
    }

    throw new Error(
      `${fechaHoraActual()} - Ya existe un empleado con esa cédula de identidad`
    );
  } catch (error) {
    if (!t.finished) {
      await t.rollback();
    }

    throw new Error(
      `${fechaHoraActual()} - Error al crear el empleado:`,
      error.message
    );
  }
};

const actualizarClaveTemporalEmpleado = async (empleado_id, clave) => {
  if (!empleado_id || !clave) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  if (clave == "1234") {
    throw new Error(
      `${fechaHoraActual()} - Debes ingresar una contraseña diferente a 1234`
    );
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    const claveCifrada = await bcrypt.hash(clave, 10);

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el empleado:`,
      error.message
    );
  }
};

const modificarEmpleado = async (datosPersonales) => {
  if (!datosPersonales.empleado_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  const camposActualizar = {};

  if (datosPersonales.rol_id) {
    camposActualizar.rol_id = datosPersonales.rol_id;
  }

  if (datosPersonales.cedula) {
    camposActualizar.cedula = datosPersonales.cedula;
  }

  if (datosPersonales.nombres) {
    camposActualizar.nombres = datosPersonales.nombres;
  }

  if (datosPersonales.apellidos) {
    camposActualizar.apellidos = datosPersonales.apellidos;
  }

  if (datosPersonales.fecha_nacimiento) {
    camposActualizar.fecha_nacimiento = datosPersonales.fecha_nacimiento;
  }

  if (datosPersonales.genero && datosPersonales.genero !== "Sin registrar") {
    camposActualizar.genero = datosPersonales.genero;
  }

  if (datosPersonales.etnia_id === "Ninguna") {
    camposActualizar.etnia_id = null;
  } else {
    camposActualizar.etnia_id = datosPersonales.etnia_id;
  }

  if (datosPersonales.telefono) {
    camposActualizar.telefono = datosPersonales.telefono;
  }

  if (datosPersonales.correo) {
    camposActualizar.correo = datosPersonales.correo;
  }

  if (datosPersonales.direccion) {
    camposActualizar.direccion = datosPersonales.direccion;
  }

  if (datosPersonales.cantidad_hijos) {
    camposActualizar.cantidad_hijos = datosPersonales.cantidad_hijos;
  }

  if (datosPersonales.activo) {
    camposActualizar.activo = datosPersonales.activo;
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(datosPersonales.empleado_id);

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el empleado:`,
      error.message
    );
  }
};

const modificarFotoEmpleado = async (empleado_id, filename, path) => {
  if (!empleado_id || !filename || !path) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
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

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el empleado:`,
      error.message
    );
  }
};

const actualizarClaveEmpleado = async (
  empleado_id,
  claveAnterior,
  claveNueva
) => {
  if (!empleado_id || !claveAnterior || !claveNueva) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  if (claveNueva == "1234") {
    throw new Error(
      `${fechaHoraActual()} - Debes ingresar una contraseña diferente a 1234`
    );
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await Empleado.findByPk(empleado_id, {
      attributes: ["clave"],
    });

    const compararClaves = await bcrypt.compare(claveAnterior, empleado.clave);

    if (!compararClaves) {
      throw new Error(
        `${fechaHoraActual()} - Debes ingresar correctamente tu clave actual`
      );
    }

    const claveCifradaNueva = await bcrypt.hash(claveNueva, 10);

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el empleado:`,
      error.message
    );
  }
};

const reiniciarClaveEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerEmpleado(empleado_id);

    const claveCifrada = await bcrypt.hash("1234", 10);

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al modificar el empleado:`,
      error.message
    );
  }
};

const inactivarEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error(`${fechaHoraActual()} - Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const empleado = await traerEmpleado(empleado_id);

    await Empleado.update(
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

    throw new Error(
      `${fechaHoraActual()} - Error al inactivar el empleado:`,
      error.message
    );
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
