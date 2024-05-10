const { Op } = require("sequelize");

const fs = require("fs");

const { Empleado, Roles, Cargo, Cargo_Empleado, Empresa } = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const todosLosEmpleados = async (filtros, paginaActual, limitePorPagina) => {
  if (!paginaActual || !limitePorPagina) {
    throw new Error("Datos faltantes");
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
            filtros.activo ? { activo: filtros.activo } : {},
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

    if (!dataEmpleados) {
      throw new Error("No existen empleados");
    }

    const indexEnd = paginaActual * limitePorPagina;
    const indexStart = indexEnd - limitePorPagina;

    const empleados = dataEmpleados.slice(indexStart, indexEnd);
    const cantidadPaginas = Math.ceil(totalRegistros / limitePorPagina);

    return { cantidadPaginas, totalRegistros, empleados };
  } catch (error) {
    throw new Error("Error al traer todos los empleados: " + error.message);
  }
};

const traerEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
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
      throw new Error("No existe ese empleado");
    }

    return empleado;
  } catch (error) {
    throw new Error("Error al traer el empleado: " + error.message);
  }
};

const login = async (cedula, clave) => {
  if (!cedula || !clave) {
    throw new Error("Datos faltantes");
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
      throw new Error("Datos incorrectos");
    }

    if (!empleado.activo) {
      throw new Error(
        "Tienes el acceso restringido, ya que tu usuario se encuentra inactivo"
      );
    }

    const claveCoincide = await bcrypt.compare(clave, empleado.clave);

    if (!claveCoincide) {
      throw new Error("Datos incorrectos");
    }

    const rolCifrado = await bcrypt.hash(empleado.Role.nombre, 10);

    if (clave == "1234") {
      return {
        empleado_id: empleado.empleado_id,
        changePassword: true,
        rol: empleado.Role.nombre,
      };
    }

    const token = jwt.sign(
      {
        empleado_id: empleado.empleado_id,
        rol: rolCifrado,
      },
      SECRET_KEY,
      { expiresIn: "1min" }
    );

    const infoEmpleado = await traerEmpleado(empleado.empleado_id);

    return { token, infoEmpleado };
  } catch (error) {
    throw new Error("Error al loguear: " + error.message);
  }
};

const crearEmpleado = async (
  rol_id,
  cedula,
  nombres,
  apellidos,
  telefono,
  correo,
  direccion
) => {
  if (!cedula || !nombres || !apellidos || !telefono || !correo || !direccion) {
    throw new Error("Datos faltantes");
  }

  try {
    const claveCifrada = await bcrypt.hash("1234", 10);

    const [empleado, created] = await Empleado.findOrCreate({
      where: { cedula: cedula, rol_id: rol_id },
      defaults: {
        rol_id: rol_id,
        cedula: cedula,
        clave: claveCifrada,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
      },
    });

    if (created) {
      return empleado;
    }

    throw new Error("Ya existe un empleado con esa cédula de identidad y rol");
  } catch (error) {
    throw new Error("Error al crear el empleado: " + error.message);
  }
};

const actualizarClaveTemporalEmpleado = async (empleado_id, clave) => {
  if (!empleado_id || !clave) {
    throw new Error("Datos faltantes");
  }

  if (clave == "1234") {
    throw new Error("Debes ingresar una contraseña diferente a 1234");
  }

  try {
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
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al modificar el empleado: " + error.message);
  }
};

const modificarEmpleado = async (
  empleado_id,
  rol_id,
  cedula,
  nombres,
  apellidos,
  telefono,
  correo,
  direccion,
  activo
) => {
  if (
    !empleado_id ||
    !rol_id ||
    !cedula ||
    !nombres ||
    !apellidos ||
    !telefono ||
    !correo ||
    !direccion ||
    !activo
  ) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    await Empleado.update(
      {
        rol_id: rol_id,
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        activo: activo,
      },
      {
        where: {
          empleado_id: empleado_id,
        },
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al modificar el empleado: " + error.message);
  }
};

const modificarFotoEmpleado = async (empleado_id, filename, path) => {
  if (!empleado_id || !filename || !path) {
    throw new Error("Datos faltantes");
  }

  try {
    const empleado = await traerEmpleado(empleado_id);

    const rutaArchivo = empleado.foto_perfil_ruta;

    if (rutaArchivo) {
      fs.unlink(rutaArchivo, (error) => {
        if (error) {
          console.error("Error al borrar el archivo:", error);
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
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al modificar el empleado: " + error.message);
  }
};

const actualizarClaveEmpleado = async (
  empleado_id,
  claveAnterior,
  claveNueva
) => {
  if (!empleado_id || !claveAnterior || !claveNueva) {
    throw new Error("Datos faltantes");
  }

  if (claveNueva == "1234") {
    throw new Error("Debes ingresar una contraseña diferente a 1234");
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id, {
      attributes: ["clave"],
    });

    const compararClaves = await bcrypt.compare(claveAnterior, empleado.clave);

    if (!compararClaves) {
      throw new Error("Debes ingresar correctamente tu clave actual");
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
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al modificar el empleado: " + error.message);
  }
};

const reiniciarClaveEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
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
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al modificar el empleado: " + error.message);
  }
};

const inactivarEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const empleado = await traerEmpleado(empleado_id);

    await Empleado.update(
      { activo: !empleado.activo },
      {
        where: { empleado_id: empleado_id },
      }
    );

    return await traerEmpleado(empleado_id);
  } catch (error) {
    throw new Error("Error al inactivar el empleado: " + error.message);
  }
};

module.exports = {
  todosLosEmpleados,
  traerEmpleado,
  login,
  crearEmpleado,
  actualizarClaveTemporalEmpleado,
  modificarEmpleado,
  modificarFotoEmpleado,
  actualizarClaveEmpleado,
  reiniciarClaveEmpleado,
  inactivarEmpleado,
};
