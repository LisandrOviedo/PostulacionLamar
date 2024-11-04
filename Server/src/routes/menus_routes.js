const { Router } = require("express");
const {
  getMenus,
  getMenusActivos,
  getMenu,
  postMenu,
  putMenu,
  deleteMenu,
} = require("../handlers/menus_handlers");

const { authenticateToken } = require("../auth/index");

const menus = Router();

menus.get("/", authenticateToken, getMenus);
menus.get("/activos", authenticateToken, getMenusActivos);
menus.get("/detalle/:menu_id", authenticateToken, getMenu);

menus.post("/", authenticateToken, postMenu);

menus.put("/modificar", authenticateToken, putMenu);
menus.put("/inactivar", authenticateToken, deleteMenu);

module.exports = menus;
