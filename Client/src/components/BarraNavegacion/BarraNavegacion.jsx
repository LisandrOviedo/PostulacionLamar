import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteSesion } from "../../redux/sesiones/sesionesActions";

import { resetAreasInteres } from "../../redux/areasInteres/areasInteresActions";
import { resetCurriculos } from "../../redux/curriculos/curriculosActions";
import { resetEmpleados } from "../../redux/empleados/empleadosActions";
import { resetIdiomas } from "../../redux/idiomas/idiomasActions";
import { resetPruebas } from "../../redux/pruebasEmpleados/pruebasEmpleadosActions";
import { getSugerenciasActivasNoRevisadas } from "../../redux/sugerencias/sugerenciasActions";

import { LogoHorizontal } from "../UI";

import Swal from "sweetalert2";

export function BarraNavegacion() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({});
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isOpenNotif, setIsOpenNotif] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const toggleMenu = (index) => {
    if (isOpen.hasOwnProperty(index)) {
      setIsOpen({});
      return;
    }

    setIsOpen({
      [index]: [index],
    });
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
        await deleteSesion(token, empleado.empleado_id);

        dispatch(resetAreasInteres());
        dispatch(resetCurriculos());
        dispatch(resetIdiomas());
        dispatch(resetPruebas());
        dispatch(resetEmpleados());
      }
    });
  };

  const { pathname } = useLocation();

  const asideRef = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.tipo_identificacion}${empleado.numero_identificacion}/${empleado.foto_perfil_nombre}`;

  const [notificaciones, setNotificaciones] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (pathname.startsWith("/admin/")) {
      dispatch(getSugerenciasActivasNoRevisadas()).then((data) => {
        if (data > 0) {
          setNotificaciones({ ...notificaciones, sugerencias: data });
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    const resultadoMenu = organizedMenus(empleado?.Role?.Menus);

    setMenu(resultadoMenu);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        window.innerWidth > 640 &&
        asideRef.current &&
        !asideRef.current.contains(event.target)
      ) {
        setIsOpenNotif(false);
      }
    };

    if (window.innerWidth > 640) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      if (window.innerWidth > 640) {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };
  }, [empleado]);

  const organizedMenus = (menu) => {
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
    const menusResultado = buildMenuTree(menu);

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
            <div
              onClick={() => toggleMenu(menuItem.menu_id)}
              data-index={menuItem.menu_id}
              className="hover:text-[#F0C95C]"
            >
              <span>{menuItem.titulo}</span>
            </div>
            <ul
              className={
                isOpen[menuItem.menu_id]
                  ? "flex flex-col gap-1 my-3 p-1 border bg-sky-950"
                  : "hidden"
              }
            >
              {renderMenu(menuItem.subMenus)} {/* Llamada recursiva */}
            </ul>
          </>
        ) : (
          <Link
            to={menuItem.ruta}
            className="text-white hover:text-[#F0C95C]"
            onClick={() => {
              toggleMenuBurger();
              toggleMenu({});
            }}
          >
            {menuItem.titulo}
          </Link>
        )}
      </li>
    ));
  };

  return (
    <div className="w-full fixed top-0 select-none z-[999]">
      <nav className="bg-[#002846] p-1 flex items-center justify-between">
        <div className="text-white flex items-center sm:hover:opacity-80 cursor-pointer gap-1">
          <LogoHorizontal
            onClick={toggleMenuBurger}
            className="w-20 sm:w-24 ml-2"
          />
          <img
            onClick={toggleMenuBurger}
            src="./Menu.svg"
            alt="Menu"
            className="w-6"
          />
        </div>

        <div className="flex items-center space-x-4 mr-6">
          {pathname.startsWith("/admin/") ? (
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
                      Object.keys(notificaciones).length ? "h-6" : "h-5"
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
                      className="text-white hover:text-[#F0C95C] text-sm"
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
          ) : null}

          <span className="text-white text-sm md:text-base">Bienvenido/a</span>
          {empleado.foto_perfil_nombre ? (
            <img
              src={FOTO_PERFIL}
              alt="Icono de Perfil"
              className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#F0C95C]"
            />
          ) : (
            <img
              src="./Person.svg"
              alt="Icono de Perfil"
              className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-[#F0C95C]"
            />
          )}
        </div>
      </nav>
      <aside
        className={`bg-[#002846] text-white w-full sm:w-56 p-4 h-screen ${
          isOpenBurger ? "block" : "hidden"
        }`}
      >
        <div className="h-full overflow-y-auto scroll-smooth pb-[20vh]">
          <nav>
            <ul className="space-y-2 cursor-pointer flex flex-col gap-2 text-center">
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

              <li>
                <Link
                  to={
                    !pathname.startsWith("/admin/") ? "/inicio" : "/admin/panel"
                  }
                  className="text-white hover:text-[#F0C95C]"
                  onClick={() => {
                    toggleMenuBurger();
                    toggleMenu({});
                  }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <div
                  onClick={() => toggleMenu(0)}
                  data-index={0}
                  className="hover:text-[#F0C95C]"
                >
                  <span>Mi Perfil</span>
                </div>
                <ul
                  className={
                    isOpen[0]
                      ? "flex flex-col gap-1 my-3 p-1 border bg-sky-950"
                      : "hidden"
                  }
                >
                  <li>
                    <Link
                      to={
                        !pathname.startsWith("/admin/")
                          ? "/miPerfil/datosPersonales"
                          : "/admin/miPerfil/datosPersonales"
                      }
                      className="text-white hover:text-[#F0C95C] text-sm"
                      onClick={toggleMenuBurger}
                    >
                      Datos personales
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        !pathname.startsWith("/admin/")
                          ? "/miPerfil/actualizarClave"
                          : "/admin/miPerfil/actualizarClave"
                      }
                      className="text-white hover:text-[#F0C95C] text-sm"
                      onClick={toggleMenuBurger}
                    >
                      Actualizar contraseña
                    </Link>
                  </li>
                </ul>
              </li>
              {!pathname.startsWith("/admin/") ? (
                // EMPLEADOS
                <>
                  <li>
                    <div
                      onClick={() => toggleMenu(1)}
                      data-index={1}
                      className="hover:text-[#F0C95C]"
                    >
                      <span>Perfil Profesional</span>
                    </div>
                    <ul
                      className={
                        isOpen[1]
                          ? "flex flex-col gap-1 my-3 p-1 border bg-sky-950"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/perfilProfesional/info"
                          className="text-white hover:text-[#F0C95C] text-sm"
                          onClick={toggleMenuBurger}
                        >
                          Actualizar Perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/perfilProfesional/misDocumentos"
                          className="text-white hover:text-[#F0C95C] text-sm"
                          onClick={toggleMenuBurger}
                        >
                          Anexar documentos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/perfilProfesional/pruebaKostick"
                          className="text-white hover:text-[#F0C95C] text-sm"
                          onClick={toggleMenuBurger}
                        >
                          Aplicar Test de Valoración Actitudinal
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                // ADMINISTRADORES

                renderMenu(menu)

                // menu?.map((menu) =>
                //   menu.subMenus.length > 0 ? (
                //     <li key={menu.menu_id}>
                //       <div
                //         onClick={() => toggleMenu(menu.menu_id)}
                //         data-index={menu.menu_id}
                //         className="hover:text-[#F0C95C]"
                //       >
                //         <span>{menu.titulo}</span>
                //       </div>
                //       <ul
                //         className={
                //           isOpen[menu.menu_id]
                //             ? "flex flex-col gap-1 my-3 p-1 border bg-sky-950"
                //             : "hidden"
                //         }
                //       >
                //         {menu.subMenus.map((submenu) => (
                //           <li key={submenu.menu_id}>
                //             <Link
                //               to={submenu.ruta}
                //               className="text-white hover:text-[#F0C95C] text-sm"
                //               onClick={toggleMenuBurger}
                //             >
                //               {submenu.titulo}
                //             </Link>
                //           </li>
                //         ))}
                //       </ul>
                //     </li>
                //   ) : (
                //     <li key={menu.menu_id}>
                //       <Link
                //         to={menu.ruta}
                //         className="text-white hover:text-[#F0C95C]"
                //         onClick={() => {
                //           toggleMenuBurger();
                //           toggleMenu({});
                //         }}
                //       >
                //         {menu.titulo}
                //       </Link>
                //     </li>
                //   )
                // )
              )}

              <li>
                <Link
                  className="text-white hover:text-[#F0C95C]"
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
