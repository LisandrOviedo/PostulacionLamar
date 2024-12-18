import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteSesion } from "../../redux/sesiones/sesionesActions";

import { resetEmpleados } from "../../redux/empleados/empleadosActions";
import { getSugerenciasActivasNoRevisadas } from "../../redux/sugerencias/sugerenciasActions";

import { LogoHorizontal } from "../UI";

import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import Swal from "sweetalert2";

export default function BarraNavegacion() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [isOpenBurger, setIsOpenBurger] = useState(true);
  const [isOpenNotif, setIsOpenNotif] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [showSubMenu, setShowSubMenu] = useState({});

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const toggleMenu = (menu_id) => {
    if (showSubMenu.hasOwnProperty(menu_id)) {
      if (showSubMenu[menu_id]) {
        setShowSubMenu((prev) => {
          let obj = { ...prev };
          delete obj[menu_id];
          return obj;
        });
      } else {
        setShowSubMenu((prev) => {
          let obj = { ...prev };
          obj[menu_id] = true;
          return obj;
        });
      }
    } else {
      setShowSubMenu((prev) => {
        let obj = { ...prev };
        obj[menu_id] = true;
        return obj;
      });
    }
  };

  const toggleMenuBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  const toggleNotif = () => {
    setIsOpenNotif(!isOpenNotif);
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const logout = () => {
    Swal.fire({
      text: "¿Seguro que deseas salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (pathname.startsWith("/admin/")) {
          if (pathname !== "/admin/panel") {
            navigate("/admin/panel");
          }
        } else {
          if (pathname !== "/") {
            navigate("/");
          }
        }

        await deleteSesion(token, empleado.empleado_id);

        dispatch(resetEmpleados());
      }
    });
  };

  const asideRef = useRef(null);
  const asideRef2 = useRef(null);
  const asideRef3 = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.tipo_identificacion}${empleado.numero_identificacion}/${empleado.foto_perfil_nombre}`;

  const [notificaciones, setNotificaciones] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (pathname.startsWith("/admin/")) {
      (async function () {
        const data = await getSugerenciasActivasNoRevisadas();

        if (data > 0) {
          setNotificaciones({ ...notificaciones, sugerencias: data });
        }
      })();
    }

    const resultadoMenu = organizedMenus(empleado.Role.Menus);

    setMenu(resultadoMenu);
  }, [pathname]);

  const handleOutsideClick = (event) => {
    if (asideRef.current && !asideRef.current.contains(event.target)) {
      setIsOpenNotif(false);
    }

    if (
      asideRef2.current &&
      !asideRef2.current.contains(event.target) &&
      asideRef3.current &&
      !asideRef3.current.contains(event.target)
    ) {
      setIsOpenBurger(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [empleado]);

  const organizedMenus = (menu) => {
    const filteredMenu = pathname.startsWith("/admin/")
      ? menu.filter((item) => item.ruta_admin === true)
      : menu.filter((item) => item.ruta_admin === false);

    const buildMenuTree = (menuItems) => {
      const menuMap = new Map();

      // Crear un mapa de menús
      menuItems.forEach((item) => {
        menuMap.set(item.menu_id, { ...item, subMenus: [] });
      });

      const result = [];

      // Construir la jerarquía
      menuItems.forEach((item) => {
        if (item.padre_id === null) {
          result.push(menuMap.get(item.menu_id));
        } else {
          const parent = menuMap.get(item.padre_id);
          if (parent) {
            parent.subMenus.push(menuMap.get(item.menu_id));
          }
        }
      });

      return result;
    };

    // Crear el árbol de menús
    const menusResultado = buildMenuTree(filteredMenu);

    // Ordenar los menús por el atributo 'orden'
    const sortedMenus = menusResultado.sort((a, b) => a.orden - b.orden);

    // Ordenar los submenús y sub-submenús de forma recursiva
    const sortSubMenus = (menus) => {
      menus.forEach((menu) => {
        menu.subMenus.sort((a, b) => a.orden - b.orden);
        sortSubMenus(menu.subMenus); // Llamada recursiva
      });
    };

    sortSubMenus(sortedMenus);

    return sortedMenus;
  };

  const renderMenu = (menu) => {
    return menu.map((menuItem) => (
      <li key={menuItem.menu_id}>
        {menuItem.subMenus.length > 0 ? (
          <>
            <span
              onClick={() => toggleMenu(menuItem.menu_id)}
              className="hover:text-secondary block cursor-pointer"
            >
              {menuItem.titulo}
              {showSubMenu[menuItem.menu_id] ? (
                <IoMdArrowDropup className="inline" />
              ) : (
                <IoMdArrowDropdown className="inline" />
              )}
            </span>
            <ul
              className={
                showSubMenu[menuItem.menu_id]
                  ? "flex flex-col gap-1 my-3 p-1 border rounded-3xl text-sm"
                  : "hidden"
              }
            >
              {renderMenu(menuItem.subMenus)} {/* Llamada recursiva */}
            </ul>
          </>
        ) : (
          <NavLink
            to={menuItem.ruta}
            className={({ isActive }) => {
              return isActive
                ? "text-secondary hover:text-secondary block pointer-events-none"
                : "text-white hover:text-secondary block";
            }}
            onClick={() => {
              toggleMenuBurger();
            }}
          >
            {menuItem.titulo}
          </NavLink>
        )}
      </li>
    ));
  };

  return (
    <div className="w-full fixed top-0 select-none z-[999]">
      <nav className="bg-primary p-1 flex items-center justify-between">
        <div
          ref={asideRef3}
          onClick={toggleMenuBurger}
          className="text-white flex items-center sm:hover:opacity-85 cursor-pointer gap-1"
        >
          <LogoHorizontal className="w-20 sm:w-24 ml-2" />
          <img src="./Menu.svg" alt="Menu" className="w-6" />
        </div>

        <div className="flex items-center space-x-4 mr-6">
          {pathname.startsWith("/admin/") && (
            <>
              <div ref={asideRef} className="static">
                <span onClick={toggleNotif} className="cursor-pointer">
                  <img
                    src={
                      Object.keys(notificaciones).length
                        ? "./newNotification.svg"
                        : "./notification.svg"
                    }
                    alt="Notificaciones"
                    className={
                      Object.keys(notificaciones).length
                        ? "h-6 animate-bounce"
                        : "h-5"
                    }
                  />
                </span>

                <ul
                  className={
                    isOpenNotif
                      ? "flex flex-col gap-1 my-3 p-2 border bg-sky-950 absolute"
                      : "hidden"
                  }
                >
                  <li>
                    <Link
                      to="/admin/sugerencias"
                      className="text-white hover:text-secondary text-sm"
                    >
                      <span className="text-xs">
                        {notificaciones.sugerencias
                          ? notificaciones.sugerencias
                          : 0}{" "}
                        sugerencias por revisar
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

          <span className="text-white text-sm md:text-base">Bienvenido/a</span>
          {empleado.foto_perfil_nombre ? (
            <img
              src={FOTO_PERFIL}
              alt="Icono de Perfil"
              className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-secondary"
            />
          ) : (
            <img
              src="./Person.svg"
              alt="Icono de Perfil"
              className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-secondary"
            />
          )}
        </div>
      </nav>
      <aside
        ref={asideRef2}
        className={`bg-primary text-white w-full sm:w-56 p-4 h-screen overflow-hidden ${
          isOpenBurger ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="h-full overflow-y-auto scroll-smooth pb-[12vh]">
          <nav>
            <ul className="space-y-2 flex flex-col gap-2 text-center">
              <li>
                <div
                  onClick={toggleMenuBurger}
                  className="cursor-pointer flex justify-center"
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
                >
                  <img
                    src={isHovered ? "./CloseYellow.svg" : "./Close.svg"}
                    alt="Cerrar Menú"
                    className="h-7"
                  />
                </div>
              </li>
              {renderMenu(menu)}
              <li>
                <Link
                  className="text-white hover:text-secondary block"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
