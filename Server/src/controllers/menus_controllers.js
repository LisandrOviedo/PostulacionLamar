const { conn, Menus } = require("../db");

const todosLosMenus = async () => {
  try {
    const menus = await Menus.findAll({
      order: [["titulo", "ASC"]],
    });

    if (!menus.length) {
      throw new Error(`No existen menús`);
    }

    return menus;
  } catch (error) {
    throw new Error(`Error al traer todos los menús: ${error.message}`);
  }
};

const todosLosMenusActivos = async () => {
  try {
    const menus = await Menus.findAll({
      where: { activo: true },
      order: [["titulo", "ASC"]],
    });

    if (!menus.length) {
      throw new Error(`No existen menús`);
    }

    return menus;
  } catch (error) {
    throw new Error(`Error al traer todos los menús: ${error.message}`);
  }
};

const traerMenu = async (menu_id) => {
  if (!menu_id) {
    throw new Error(`Datos faltantes`);
  }

  try {
    const menu = await Menus.findByPk(menu_id);

    if (!menu) {
      throw new Error(`No existe ese menú`);
    }

    return menu;
  } catch (error) {
    throw new Error(`Error al traer el menú: ${error.message}`);
  }
};

const crearMenu = async (padre_id, titulo, ruta, orden, icono) => {
  if (!titulo || !ruta || !orden) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    t = await conn.transaction();

    const [menu, created] = await Menus.findOrCreate({
      where: { ruta: ruta },
      defaults: {
        padre_id: padre_id || null,
        titulo: titulo,
        ruta: ruta,
        orden: orden,
        icono: icono || null,
      },
      transaction: t,
    });

    await t.commit();

    if (created) {
      return menu;
    }

    throw new Error(`Ya existe un menú con esa ruta`);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al crear el menú: ${error.message}`);
  }
};

const modificarMenu = async (menu_id, padre_id, titulo, ruta, orden, icono) => {
  if (!menu_id || !titulo || !ruta || !orden) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    await traerMenu(menu_id);

    t = await conn.transaction();

    await Menus.update(
      {
        padre_id: padre_id || null,
        titulo: titulo,
        ruta: ruta,
        orden: orden,
        icono: icono || null,
      },
      {
        where: {
          menu_id: menu_id,
        },
        transaction: t,
      }
    );

    await t.commit();

    return await traerMenu(menu_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al modificar el menú: ${error.message}`);
  }
};

const inactivarMenu = async (menu_id) => {
  if (!menu_id) {
    throw new Error(`Datos faltantes`);
  }

  let t;

  try {
    const menu = await traerMenu(menu_id);

    t = await conn.transaction();

    await Menus.update(
      { activo: !menu.activo },
      {
        where: { menu_id: menu_id },
        transaction: t,
      }
    );

    await t.commit();

    return await traerMenu(menu_id);
  } catch (error) {
    if (t && !t.finished) {
      await t.rollback();
    }

    throw new Error(`Error al inactivar el menú: ${error.message}`);
  }
};

module.exports = {
  todosLosMenus,
  todosLosMenusActivos,
  traerMenu,
  crearMenu,
  modificarMenu,
  inactivarMenu,
};
