import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Logo } from "../UI";

export function Navbar() {
  const [isOpen, setIsOpen] = useState({});
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const empleado = useSelector((state) => state.empleados.empleado);

  const toggleMenu = (index) => {
    setIsOpen({
      [index]: [index],
    });
  };

  const toggleMenuBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const { pathname } = useLocation();

  const asideRef = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;
  const FOTO_PERFIL = `${URL_SERVER}/documentos_empleados/documento/${empleado.cedula}/${empleado.foto_perfil_nombre}`;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        window.innerWidth > 640 &&
        asideRef.current &&
        !asideRef.current.contains(event.target)
      ) {
        setIsOpenBurger(false);
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

  return (
    <div className="w-full z-999 fixed top-0 select-none">
      <nav className="bg-[#002846] p-1 flex items-center justify-between">
        <div className="text-white flex items-center">
          <Logo
            onClick={toggleMenuBurger}
            className="w-16 sm:w-24 ml-2 sm:hover:opacity-80 cursor-pointer"
          />
          <img
            onClick={toggleMenuBurger}
            src="/Menu.svg"
            alt="Menu"
            className="w-6 cursor-pointer sm:hover:opacity-80"
          />
        </div>
        <div className="flex items-center space-x-4 mr-6">
          <span className="text-white text-sm md:text-base">Bienvenido/a</span>
          {empleado.foto_perfil_nombre ? (
            <img
              src={FOTO_PERFIL}
              alt="Icono de Perfil"
              className="w-6 sm:w-8"
            />
          ) : (
            <img
              src="/Person.svg"
              alt="Icono de Perfil"
              className="w-6 sm:w-8"
            />
          )}
        </div>
      </nav>

      <aside
        ref={asideRef}
        id="sidebar"
        className={`bg-[#002846] text-white w-full sm:w-56 p-4 h-screen ${
          isOpenBurger ? "block" : "hidden"
        }`}
      >
        <div className="h-full overflow-y-auto scroll-smooth pb-[20vh]">
          <div
            onClick={toggleMenuBurger}
            className="cursor-pointer"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
          >
            <img
              src={isHovered ? "/CloseYellow.svg" : "/Close.svg"}
              alt="Cerrar Menú"
              className="h-7 m-2 mx-auto"
            />
          </div>
          <nav>
            <ul className="space-y-2 cursor-pointer">
              {!pathname.startsWith("/admin/") && (
                // EMPLEADOS
                <>
                  <Link
                    to="/home"
                    className="block text-white hover:text-[#F0C95C]"
                    onClick={() => toggleMenu({})}
                  >
                    <div className="flex items-center justify-between p-2">
                      <div className="mx-auto">Inicio</div>
                    </div>
                  </Link>
                  <li>
                    <div
                      onClick={() => toggleMenu(0)}
                      data-index={0}
                      className="flex items-center justify-between p-2 hover:text-[#F0C95C]"
                    >
                      <div className="mx-auto">
                        <span>Mi Perfil</span>
                      </div>
                    </div>
                    <ul
                      className={
                        isOpen[0]
                          ? "flex flex-col gap-3 my-3 p-2 border border-[#F0C95C]"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/datosPersonales"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Datos personales
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/home"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Solicitar reinicio de contraseña
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div
                      onClick={() => toggleMenu(1)}
                      data-index={1}
                      className="flex items-center justify-between p-2 hover:text-[#F0C95C]"
                    >
                      <div className="mx-auto">
                        <span>Currículo</span>
                      </div>
                    </div>
                    <ul
                      className={
                        isOpen[1]
                          ? "flex flex-col gap-3 my-3 p-2 border border-[#F0C95C]"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/home"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Visualizar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/curriculo/info"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Crear / Modificar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/documentos"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Anexar documentos
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block text-white hover:text-[#F0C95C]"
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Cerrar Sesión</div>
                      </div>
                    </Link>
                  </li>
                </>
              )}
              {pathname.startsWith("/admin/") && (
                // ADMINISTRADORES
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block text-white hover:text-[#F0C95C]"
                    onClick={() => toggleMenu({})}
                  >
                    <div className="flex items-center justify-between p-2">
                      <div className="mx-auto">Inicio</div>
                    </div>
                  </Link>
                  <li>
                    <div
                      onClick={() => toggleMenu(0)}
                      data-index={0}
                      className="flex items-center justify-between p-2 hover:text-[#F0C95C]"
                    >
                      <div className="mx-auto">
                        <span>Mi Perfil</span>
                      </div>
                    </div>
                    <ul
                      className={
                        isOpen[0]
                          ? "flex flex-col gap-3 my-3 p-2 border border-[#F0C95C]"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Datos personales
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                        >
                          Solicitar reinicio de contraseña
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to="/admin/postulaciones"
                      className="block text-white hover:text-[#F0C95C]"
                      onClick={() => toggleMenu({})}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Postulaciones</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/login"
                      className="block text-white hover:text-[#F0C95C]"
                      onClick={() => toggleMenu({})}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Cerrar Sesión</div>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
