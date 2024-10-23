import { Router } from "express";
import {
  getRolesMenus,
  getRolMenu,
  postRolMenu,
  putRolMenu,
  deleteRolMenu,
} from "../handlers/roles_menus_handlers.js";

import { authenticateToken } from "../auth/index.js";

const roles_menus = Router();

roles_menus.get("/:rol_id", authenticateToken, getRolesMenus);
roles_menus.get("/detalle/:rol_menu_id", authenticateToken, getRolMenu);

roles_menus.post("/", authenticateToken, postRolMenu);

roles_menus.put("/modificar", authenticateToken, putRolMenu);
roles_menus.put("/inactivar", authenticateToken, deleteRolMenu);

export default roles_menus;
