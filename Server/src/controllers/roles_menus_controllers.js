const { conn, Roles_Menus } = require("../db");

const todosLosRolesMenus = async (rol_id) => {
  if (!rol_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const roles_menus = await Roles_Menus.findAll({
      where: {
        rol_id: rol_id,
      },
    });

    return roles_menus;
  } catch (error) {
    throw new Error(
      `Error al traer todos los menús de ese rol: ${error.message}`
    );
  }
};

const traerRolMenu = async (rol_menu_id) => {
  if (!rol_menu_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const rol_menu = await Roles_Menus.findByPk(rol_menu_id);

    if (!rol_menu) {
      throw new Error(`No existe ese menú para ese rol`);
    }

    return rol_menu;
  } catch (error) {
    throw new Error(`Error al traer ese menú para ese rol: ${error.message}`);
  }
};

const crearRolMenu = async (rol_id, menu_id) => {
  if (!rol_id || !menu_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [rol_menu, created] = await Roles_Menus.findOrCreate({
      where: { rol_id: rol_id, menu_id: menu_id },
      defaults: {
        rol_id: rol_id,
        menu_id: menu_id,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return rol_menu;
    }

    throw new Error(`Ya existe ese menú para ese rol`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear ese menú para ese rol: ${error.message}`);
  }
};

const modificarRolMenu = async (rol_menu_id, rol_id, menu_id) => {
  if (!rol_menu_id || !rol_id || !menu_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    await traerRolMenu(rol_menu_id);

    await Roles_Menus.update(
      {
        rol_id: rol_id,
        menu_id: menu_id,
      },
      {
        where: {
          rol_menu_id: rol_menu_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerRolMenu(rol_menu_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al modificar ese menú para ese rol: ${error.message}`
    );
  }
};

const inactivarRolMenu = async (rol_menu_id) => {
  if (!rol_menu_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const rol_menu = await traerRolMenu(rol_menu_id);

    await Roles_Menus.update(
      { activo: !rol_menu.activo },
      {
        where: { rol_menu_id: rol_menu_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerRolMenu(rol_menu_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(
      `Error al inactivar ese menú para ese rol: ${error.message}`
    );
  }
};

module.exports = {
  todosLosRolesMenus,
  traerRolMenu,
  crearRolMenu,
  modificarRolMenu,
  inactivarRolMenu,
};
