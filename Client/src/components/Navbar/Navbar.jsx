import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { Logo } from "../UI";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { pathname } = useLocation();

  return (
    <nav className="bg-[#002846] border-gray-200 w-full z-999 fixed top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="https://grupo-lamar.com/es/"
          target="_blank"
          className="hover:opacity-70"
        >
          <Logo className="w-24 sm:w-28 md:w-32" />
        </Link>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {!pathname.startsWith("/admin/") && (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white hover:text-[#F0C95C]"
                  >
                    Inicio
                  </Link>
                </li>
              </>
            )}
            {pathname === "/admin/login" && (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white hover:text-[#F0C95C]"
                  >
                    Ir a vista de empleado
                  </Link>
                </li>
              </>
            )}
            {pathname.startsWith("/admin/") && pathname !== "/admin/login" && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block py-2 px-3 text-white hover:text-[#F0C95C]"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/postulaciones"
                    className="block py-2 px-3 text-white hover:text-[#F0C95C]"
                  >
                    Postulaciones
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/login"
                    className="block py-2 px-3 text-white hover:text-[#F0C95C]"
                  >
                    Cerrar Sesión
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
