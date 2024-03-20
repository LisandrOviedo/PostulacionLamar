const { Empleado } = require("../db");

const todosLosEmpleados = async () => {
  try {
    const empleados = await Empleado.findAll();

    if (empleados.length === 0) {
      return "No existen empleados";
    }

    return empleados;
  } catch (error) {
    return "Error al traer todos los empleados: ", error.message;
  }
};

const traerEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    return "Datos faltantes";
  }

  try {
    const empleado = await Empleado.findByPk(empleado_id);

    if (empleado === null) {
      return "No existe ese empleado";
    }

    return empleado;
  } catch (error) {
    return "Error al traer el empleado: ", error.message;
  }
};

const login = async (cedula) => {
  if (!cedula) {
    return "Datos faltantes";
  }

  try {
    const empleado = await Empleado.findOne({
      where: { cedula: cedula },
    });

    if (empleado === null) {
      return "No existe ese empleado";
    }

    return empleado;
  } catch (error) {
    return "Error al loguear: ", error.message;
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
    return "Datos faltantes";
  }

  try {
    const [empleado, created] = await Empleado.findOrCreate({
      where: { cedula: cedula },
      defaults: {
        cedula: cedula,
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

    return "Ya existe un empleado con ese número de cédula de identidad";
  } catch (error) {
    return "Error al crear el empleado: ", error.message;
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
    return "Datos faltantes";
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
    return "Error al modificar el empleado: ", error.message;
  }
};

const inactivarEmpleado = async (empleado_id) => {
  if (!empleado_id) {
    return "Datos faltantes";
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
    return "Error al inactivar el empleado: ", error.message;
  }
};

module.exports = {
  todosLosEmpleados,
  traerEmpleado,
  login,
  crearEmpleado,
  modificarEmpleado,
  inactivarEmpleado,
};
