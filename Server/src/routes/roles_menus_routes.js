const { Router } = require("express");
const {
  getRolesMenus,
  getRolMenu,
  postRolMenu,
  putRolMenu,
  deleteRolMenu,
} = require("../handlers/roles_menus_handlers");

const { authenticateToken } = require("../auth/index");

const roles_menus = Router();

roles_menus.get("/:rol_id", authenticateToken, getRolesMenus);
roles_menus.get("/detalle/:rol_menu_id", authenticateToken, getRolMenu);

roles_menus.post("/", authenticateToken, postRolMenu);

roles_menus.put("/modificar", authenticateToken, putRolMenu);
roles_menus.put("/inactivar", authenticateToken, deleteRolMenu);

module.exports = roles_menus;
