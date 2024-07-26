import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteSesion } from "../../redux/sesiones/sesionesActions";

import { resetAreasInteres } from "../../redux/areasInteres/areasInteresActions";
import { resetCurriculos } from "../../redux/curriculos/curriculosActions";
import { resetEmpleados } from "../../redux/empleados/empleadosActions";
import { resetIdiomas } from "../../redux/idiomas/idiomasActions";
import { resetPruebas } from "../../redux/pruebasEmpleados/pruebasEmpleadosActions";

import { Logo } from "../UI";

import Swal from "sweetalert2";

export function BarraNavegacion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({});
  const [isOpenBurger, setIsOpenBurger] = useState(false);
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

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const logout = (rol) => {
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
        dispatch(resetEmpleados());
        dispatch(resetIdiomas());
        dispatch(resetPruebas());

        if (rol === "empleado") {
          navigate("/");
          return;
        }
        navigate("/admin/acceso");
        return;
      }
    });
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
    <div className="w-full fixed top-0 select-none z-50">
      <nav className="bg-[#002846] p-1 flex items-center justify-between">
        <div className="text-white flex items-center">
          <Logo
            onClick={toggleMenuBurger}
            className="w-16 sm:w-24 ml-2 sm:hover:opacity-80 cursor-pointer"
          />
          <img
            onClick={toggleMenuBurger}
            src="./Menu.svg"
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
              src={isHovered ? "./CloseYellow.svg" : "./Close.svg"}
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
                    to="/inicio"
                    className="block text-white hover:text-[#F0C95C]"
                    onClick={() => {
                      toggleMenuBurger();
                      toggleMenu({});
                    }}
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
                          ? "flex flex-col gap-3 my-3 p-2 border bg-sky-950"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/miPerfil/datosPersonales"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Datos personales
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/miPerfil/actualizarClave"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Actualizar contraseña
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
                        <span>Perfil Profesional</span>
                      </div>
                    </div>
                    <ul
                      className={
                        isOpen[1]
                          ? "flex flex-col gap-3 my-3 p-2 border bg-sky-950"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/perfilProfesional/info"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Actualizar Perfil
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/perfilProfesional/misDocumentos"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Anexar documentos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/perfilProfesional/pruebaKostick"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Aplicar Test de Valoración Actitudinal
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span
                      onClick={() => logout("empleado")}
                      className="block text-white hover:text-[#F0C95C]"
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Cerrar Sesión</div>
                      </div>
                    </span>
                  </li>
                </>
              )}
              {pathname.startsWith("/admin/") && (
                // ADMINISTRADORES
                <>
                  <Link
                    to="/admin/panel"
                    className="block text-white hover:text-[#F0C95C]"
                    onClick={() => {
                      toggleMenuBurger();
                      toggleMenu({});
                    }}
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
                          ? "flex flex-col gap-3 my-3 p-2 border bg-sky-950"
                          : "hidden"
                      }
                    >
                      <li>
                        <Link
                          to="/admin/miPerfil/datosPersonales"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Datos personales
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/miPerfil/actualizarClave"
                          className="block text-white hover:text-[#F0C95C] text-sm text-center"
                          onClick={toggleMenuBurger}
                        >
                          Actualizar contraseña
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to="/admin/empleados"
                      className="block text-white hover:text-[#F0C95C]"
                      onClick={() => {
                        toggleMenuBurger();
                        toggleMenu({});
                      }}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Empleados</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/postulaciones"
                      className="block text-white hover:text-[#F0C95C]"
                      onClick={() => {
                        toggleMenuBurger();
                        toggleMenu({});
                      }}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Postulaciones</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/pruebasEmpleados"
                      className="block text-white hover:text-[#F0C95C]"
                      onClick={() => {
                        toggleMenuBurger();
                        toggleMenu({});
                      }}
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Pruebas de Empleados</div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={() => logout("admin")}
                      className="block text-white hover:text-[#F0C95C]"
                    >
                      <div className="flex items-center justify-between p-2">
                        <div className="mx-auto">Cerrar Sesión</div>
                      </div>
                    </span>
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
