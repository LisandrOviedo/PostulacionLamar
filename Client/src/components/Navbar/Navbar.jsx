import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { Logo } from "../UI";

export function Navbar() {
  const [isOpen, setIsOpen] = useState({});
  const [isOpenBurger, setIsOpenBurger] = useState(true);

  const toggleMenu = (index) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleMenuBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  const { pathname } = useLocation();

  return (
    <div className="w-full z-999 fixed top-0">
      <nav className="bg-[#002846] p-1 flex items-center justify-between">
        <div>
          <Link
            to="https://grupo-lamar.com/es/"
            target="_blank"
            className="hover:opacity-70"
          >
            <Logo className="w-24 ml-2" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Bienvenido</span>
          <img src="/Person.svg" alt="Icono de Perfil" className="w-8" />
        </div>
        <span
          onClick={toggleMenuBurger}
          className="text-white cursor-pointer hover:opacity-70 mr-6"
        >
          Menú
        </span>
      </nav>

      <aside
        id="sidebar"
        className={`bg-[#002846] text-white w-full sm:w-56 min-h-screen p-4 ${
          isOpenBurger ? "block" : "hidden"
        }`}
      >
        <img
          src="/Close.svg"
          alt="Icono de Perfil"
          className="w-6 cursor-pointer hover:opacity-70 m-2 mx-auto"
          onClick={toggleMenuBurger}
        />
        <nav>
          <ul className="space-y-2 cursor-pointer">
            {!pathname.startsWith("/admin/") && (
              // EMPLEADOS
              <>
                <Link
                  to="/home"
                  className="block text-white hover:text-[#F0C95C]"
                >
                  <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                    <div className="mx-auto">Inicio</div>
                  </div>
                </Link>
                <li>
                  <div
                    onClick={() => toggleMenu(0)}
                    data-index={0}
                    className="flex items-center justify-between p-2 hover:bg-gray-700 hover:text-[#F0C95C]"
                  >
                    <div className="mx-auto">
                      <span>Mi Perfil</span>
                    </div>
                  </div>
                  <ul className={isOpen[0] ? "flex flex-col gap-2" : "hidden"}>
                    <li>
                      <Link
                        to="/home"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
                      >
                        Datos personales
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/home"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
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
                    className="flex items-center justify-between p-2 hover:bg-gray-700 hover:text-[#F0C95C]"
                  >
                    <div className="mx-auto">
                      <span>Currículo</span>
                    </div>
                  </div>
                  <ul className={isOpen[1] ? "flex flex-col gap-2" : "hidden"}>
                    <li>
                      <Link
                        to="/home"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
                      >
                        Visualizar
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/home"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
                      >
                        Crear / Modificar
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/home"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
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
                    <div className="flex items-center justify-between p-2 hover:bg-gray-700">
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
                >
                  <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                    <div className="mx-auto">Inicio</div>
                  </div>
                </Link>
                <li>
                  <div
                    onClick={() => toggleMenu(0)}
                    data-index={0}
                    className="flex items-center justify-between p-2 hover:bg-gray-700 hover:text-[#F0C95C]"
                  >
                    <div className="mx-auto">
                      <span>Mi Perfil</span>
                    </div>
                  </div>
                  <ul className={isOpen[0] ? "flex flex-col gap-2" : "hidden"}>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
                      >
                        Datos personales
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block text-white hover:text-[#F0C95C] text-sm text-center hover:bg-gray-700"
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
                  >
                    <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                      <div className="mx-auto">Postulaciones</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="block text-white hover:text-[#F0C95C]"
                  >
                    <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                      <div className="mx-auto">Cerrar Sesión</div>
                    </div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
