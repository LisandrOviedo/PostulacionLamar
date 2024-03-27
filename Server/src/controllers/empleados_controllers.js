const { Empleado, Cargo, Cargo_Empleado, Empresa } = require("../db");

const todosLosEmpleados = async () => {
  try {
    const empleados = await Empleado.findAll({
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!empleados) {
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
    const empleado = await Empleado.findByPk(empleado_id, {
      attributes: {
        exclude: ["clave"],
      },
    });

    if (!empleado) {
      return "No existe ese empleado";
    }

    return empleado;
  } catch (error) {
    return "Error al traer el empleado: ", error.message;
  }
};

const traerCargoActual = async (empleado_id) => {
  if (!empleado_id) {
    return "Datos faltantes";
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
      return "No existe cargo actual para ese empleado";
    }

    return cargoActual;
  } catch (error) {
    return "Error al traer el empleado: ", error.message;
  }
};

const login = async (cedula, clave) => {
  if (!cedula || !clave) {
    return "Datos faltantes";
  }

  try {
    const empleado = await Empleado.findOne({
      attributes: ["empleado_id"],
      where: { cedula: cedula, clave: clave },
    });

    if (!empleado) {
      return "Datos incorrectos";
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
  traerCargoActual,
  login,
  crearEmpleado,
  modificarEmpleado,
  inactivarEmpleado,
};
