import { Router } from "express";
import {
  getMenus,
  getMenusActivos,
  getMenu,
  postMenu,
  putMenu,
  deleteMenu,
} from "../handlers/menus_handlers.js";

import { authenticateToken } from "../auth/index.js";

const menus = Router();

menus.get("/", authenticateToken, getMenus);
menus.get("/activos", authenticateToken, getMenusActivos);
menus.get("/detalle/:menu_id", authenticateToken, getMenu);

menus.post("/", authenticateToken, postMenu);

menus.put("/modificar", authenticateToken, putMenu);
menus.put("/inactivar", authenticateToken, deleteMenu);

export default menus;
