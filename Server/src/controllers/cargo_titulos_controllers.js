const { Cargo_Titulo } = require("../db");

const todosLosCargosTitulos = async () => {
  try {
    const cargos_titulos = await Cargo_Titulo.findAll();

    if (cargos_titulos.length === 0) {
      return "No existen cargos / títulos";
    }

    return cargos_titulos;
  } catch (error) {
    return "Error al traer todos los cargos / títulos: ", error.message;
  }
};

const traerCargoTitulo = async (cargo_titulo_id) => {
  if (!cargo_titulo_id) {
    return "Datos faltantes";
  }

  try {
    const cargo_titulo = await Cargo_Titulo.findByPk(cargo_titulo_id);

    if (cargo_titulo === null) {
      return "No existe ese cargo / título";
    }

    return cargo_titulo;
  } catch (error) {
    return "Error al traer el cargo / título: ", error.message;
  }
};

const crearCargoTitulo = async (nombre) => {
  if (!nombre) {
    return "Datos faltantes";
  }

  try {
    const [cargo_titulo, created] = await Cargo_Titulo.findOrCreate({
      where: { nombre: nombre },
      defaults: {
        nombre: nombre,
      },
    });

    if (created) {
      return cargo_titulo;
    }

    return "Ya existe un cargo / título con ese nombre";
  } catch (error) {
    return "Error al crear el cargo / título: ", error.message;
  }
};

const modificarCargoTitulo = async (cargo_titulo_id, nombre, inactivo) => {
  if (!cargo_titulo_id || !nombre || !inactivo) {
    return "Datos faltantes";
  }

  try {
    await traerCargoTitulo(cargo_titulo_id);

    await Cargo_Titulo.update(
      {
        nombre: nombre,
        inactivo: inactivo,
      },
      {
        where: {
          cargo_titulo_id: cargo_titulo_id,
        },
      }
    );

    return await traerCargoTitulo(cargo_titulo_id);
  } catch (error) {
    return "Error al modificar el cargo / título: ", error.message;
  }
};

const inactivarCargoTitulo = async (cargo_titulo_id) => {
  if (!cargo_titulo_id) {
    return "Datos faltantes";
  }

  try {
    const cargo_titulo = await traerCargoTitulo(cargo_titulo_id);

    await Cargo_Titulo.update(
      { inactivo: !cargo_titulo.inactivo },
      {
        where: { cargo_titulo_id: cargo_titulo_id },
      }
    );

    return await traerCargoTitulo(cargo_titulo_id);
  } catch (error) {
    return "Error al inactivar el cargo / título: ", error.message;
  }
};

module.exports = {
  todosLosCargosTitulos,
  traerCargoTitulo,
  crearCargoTitulo,
  modificarCargoTitulo,
  inactivarCargoTitulo,
};
