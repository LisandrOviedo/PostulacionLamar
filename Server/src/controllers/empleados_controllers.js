const { Empleado, Cargo, Cargo_Empleado, Empresa } = require("../db");

const bcrypt = require("bcrypt");

const todosLosEmpleados = async () => {
  try {
    const empleados = await Empleado.findAll({
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!empleados) {
      throw new Error("No existen empleados");
    }

    return empleados;
  } catch (error) {
    throw new Error("Error al traer todos los empleados: ", error.message);
  }
};

const traerEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id, {
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!empleado) {
      throw new Error("No existe ese empleado");
    }

    return empleado;
  } catch (error) {
    throw new Error("Error al traer el empleado: ", error.message);
  }
};

const traerCargoActual = async (empleado_id) => {
  if (!empleado_id) {
    throw new Error("Datos faltantes");
  }

  try {
    const cargoActual = await Empleado.findByPk(empleado_id, {
      attributes: [],
      include: [
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

    if (!cargoActual) {
      throw new Error("No existe cargo actual para ese empleado");
    }

    return cargoActual;
  } catch (error) {
    throw new Error("Error al traer el empleado: ", error.message);
  }
};

const login = async (cedula, clave) => {
  if (!cedula || !clave) {
    throw new Error("Datos faltantes");
  }

  try {
    const empleado = await Empleado.findOne({
      attributes: ["empleado_id", "clave", "activo"],
      where: { cedula: cedula },
    });

    if (!empleado) {
      throw new Error("Datos incorrectos");
    }

    const claveCoincide = await bcrypt.compare(clave, empleado.clave);

    if (!claveCoincide) {
      throw new Error("Datos incorrectos");
    }

    if (clave == "1234") {
      return {
        empleado_id: empleado.empleado_id,
        changePassword: true,
      };
    }

    return empleado;
  } catch (error) {
    throw new Error("Error al loguear: ", error.message);
  }
};

const crearEmpleado = async (
  cedula,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion
) => {
  if (!cedula || !nombres || !apellidos || !correo || !telefono || !direccion) {
    throw new Error("Datos faltantes");
  }

  try {
    const claveCifrada = await bcrypt.hash("1234", 10);

    const [empleado, created] = await Empleado.findOrCreate({
      where: { cedula: cedula },
      defaults: {
        cedula: cedula,
        clave: claveCifrada,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
        direccion: direccion,
      },
    });

    if (created) {
      return empleado;
    }

    throw new Error(
      "Ya existe un empleado con ese número de cédula de identidad"
    );
  } catch (error) {
    throw new Error("Error al crear el empleado: ", error.message);
  }
};

const actualizarClaveEmpleado = async (empleado_id, clave) => {
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
    throw new Error("Error al modificar el empleado: ", error.message);
  }
};

const modificarEmpleado = async (
  empleado_id,
  cedula,
  nombres,
  apellidos,
  correo,
  telefono,
  direccion,
  activo
) => {
  if (
    !empleado_id ||
    !cedula ||
    !nombres ||
    !apellidos ||
    !correo ||
    !telefono ||
    !direccion ||
    !activo
  ) {
    throw new Error("Datos faltantes");
  }

  try {
    await traerEmpleado(empleado_id);

    await Empleado.update(
      {
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
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
    throw new Error("Error al modificar el empleado: ", error.message);
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
    throw new Error("Error al inactivar el empleado: ", error.message);
  }
};

module.exports = {
  todosLosEmpleados,
  traerEmpleado,
  traerCargoActual,
  login,
  crearEmpleado,
  actualizarClaveEmpleado,
  modificarEmpleado,
  inactivarEmpleado,
};
