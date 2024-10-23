import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
  getAllRolesFiltrados,
  postCrearRol,
  getRol
} from "../../redux/roles/rolesActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function GestionRoles() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const paginaActual = useSelector((state) => state.roles.paginaActual);

  const limitePorPagina = useSelector((state) => state.roles.limitePorPagina);

  const roles = useSelector((state) => state.roles.roles);

  const rol = useSelector((state) => state.roles.rol); 

  const filtros = useSelector((state) => state.roles.filtros);

  const [filters, setFilters] = useState({
    nombre: filtros.nombre || "",
    descripcion: filtros.descripcion || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    rol_id: roles.rol_id,
  });

  const [nuevoRol, setNuevoRol] = useState({
    nombre: "",
    descripcion: "",
  });


//codigo para getRoll
const [listaRoles, setListaRoles] = useState([]);
//finaliza
  const [showModal, setShowModal] = useState(false);
  // const [showModalListaRoll, setShowModalListaRoll] = useState(false); //revisar esto despues
  const tableRef = useRef(null);

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPagina(value));

    if (paginaActual !== 1) {
      dispatch(postPaginaActual(1));
    }
  };

  const handleChangeFiltersInput = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("buscar_por");
    const valueBuscarPor = buscarPor.value;

    setFilters({ ...filters, [valueBuscarPor]: value });
  };

  const handleChangeFiltersSelect = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("input_search");
    const valueBuscarPor = buscarPor.value;

    if (valueBuscarPor) {
      setFilters((prevFilters) => {
        let updatedFilters = { ...prevFilters };

        if (value === "nombre") {
          updatedFilters.descripcion = "";
        } else if (value === "descripcion") {
          updatedFilters.nombre = "";
        }

        return { ...updatedFilters, [value]: valueBuscarPor };
      });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      nombre: "",
      descripcion: "",
      orden_campo: "",
      orden_por: "",
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";

    dispatch(deleteFiltros());
  };

  const handleFind = () => {
    dispatch(postPaginaActual(1)).then(() => {
      dispatch(postFiltros(filters));
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    dispatch(
      getAllRolesFiltrados(token, filtros, paginaActual, limitePorPagina)
    );

    document.title = "Grupo Lamar - Gestión de Roles (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(
      getAllRolesFiltrados(token, filtros, paginaActual, limitePorPagina)
    );
  }, [filtros, paginaActual, limitePorPagina]);

  const handleGuardarRol = () => {
    try {
      // Llamar a la función que realiza la solicitud a la API directamente
      dispatch(postCrearRol(token, nuevoRol));

      handleCerrarModal();
      handleFind(); // Actualiza la tabla después de guardar
      Swal.fire({
        text: "¡Rol creado exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error al guardar el rol:", error);
      Swal.fire({
        text: "Error al crear el rol.",
        icon: "error",
      });
    }
  };

  //nuevo codigo getRoll

  const handleVerDetalles = async () => {
    try {
      await dispatch(getRol(token, setListaRoles)); // Asegúrate de que getRol acepte estos parámetros
    } catch (error) {
      console.error("Rol no encontrado:", error);
      Swal.fire({
        text: "Error al buscar el rol",
        icon: "error",
      });
    }
  };
//finaliza nuevo codigo

  const changeOrder = (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      return dispatch(postFiltros({ ...filters, orden_por: "DESC" }));
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: "", orden_por: "" })
      );
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      return dispatch(
        postFiltros({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      dispatch(postPaginaActual(paginaActual - 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < roles.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setNuevoRol({});
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;

    setNuevoRol({ ...nuevoRol, [name]: value });
  };

  return (
    <>
      <div
        className={`mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8 ${
          showModal && "opacity-50 pointer-events-none"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title>Gestión De Roles</Title>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="buscar_por">Buscar por</Label>
            <Select
              id="buscar_por"
              name="buscar_por"
              onChange={handleChangeFiltersSelect}
              defaultValue={filtros.nombre ? "nombre" : "descripcion"}
            >
              <option value="descripcion">Descripción</option>
              <option value="nombre">Nombre</option>
            </Select>
          </div>
          <div className="flex w-full items-end">
            <Input
              type="text"
              id="input_search"
              placeholder="Escribe aquí tu búsqueda"
              onChange={handleChangeFiltersInput}
              defaultValue={
                filtros.descripcion
                  ? `${filtros.descripcion}`
                  : filtros.nombre
                  ? `${filtros.nombre}`
                  : ""
              }
            />
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="limitePorPagina">Límite por página</Label>
            <Select
              id="limitePorPagina"
              name="limitePorPagina"
              defaultValue={limitePorPagina}
              onChange={handleChangePagination}
            >
              <option value="2">2</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </div>
          <div className="flex space-x-4">
            <div
              id="tabla"
              ref={tableRef}
              className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start gap-2"
            >
              <Button className="m-0 w-auto flex-1" onClick={handleFind}>
                Buscar
              </Button>
              <Button className="m-0 w-auto" onClick={handleResetFilters}>
                Restablecer Filtros
              </Button>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
              <div className="flex space-x-4">
                <Button
                  className="m-0 w-auto bg-green-600"
                  onClick={() => setShowModal(true)}
                >
                  Crear rol
                </Button>
              </div>
            </div>
          </div>
        </div>
  
        <div className="mt-8 sm:mx-auto w-full">
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <Span
                        id="nombre"
                        name="nombre"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Nombre del Rol
                        <img
                          name="nombre"
                          src={
                            filters.orden_campo === "nombre" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "nombre" &&
                                filters.orden_por === "DESC"
                              ? "./SortZA.svg"
                              : "./SortDefault.svg"
                          }
                          alt="Icon Sort"
                          className="w-5 h-5 ms-1.5 cursor-pointer"
                        />
                      </Span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Descripción</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <Span
                        id="updatedAt"
                        name="updatedAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Últ. Modif.
                        <img
                          name="updatedAt"
                          src={
                            filters.orden_campo === "updatedAt" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "updatedAt" &&
                                filters.orden_por === "DESC"
                              ? "./SortZA.svg"
                              : "./SortDefault.svg"
                          }
                          alt="Icon Sort"
                          className="w-5 h-5 ms-1.5 cursor-pointer"
                        />
                      </Span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles === "No existen roles" || !roles.roles?.length ? (
                  <tr>
                    <td colSpan="2" className="text-center p-2">
                      <p>¡No existen registros!</p>
                    </td>
                  </tr>
                ) : (
                  roles.roles?.map((rol, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="p-4">{rol.nombre}</td>
                      <td className="p-4">{rol.descripcion}</td>
                      <td className="p-4">{DDMMYYYY(rol.updatedAt)}</td>
                      <td className="p-4 flex gap-2">
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() =>
                            handleVerDetalles(rol.empleado_id, rol.rol_id)
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() =>
                            handleVerDetalles(rol.empleado_id)
                          }
                        >
                          Asignar Menús
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
  
          <nav className="flex items-center justify-center md:justify-between flex-column flex-wrap md:flex-row pt-4">
            {infoPaginador(paginaActual, limitePorPagina, roles.totalRegistros)}
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <Span
                  onClick={paginaAnterior}
                  className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    paginaActual <= 1 ? "cursor-default" : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Anterior
                </Span>
              </li>
              {calcularPaginasARenderizar(paginaActual, roles.cantidadPaginas).map((page) => (
                <li key={page}>
                  <Span
                    onClick={() => {
                      dispatch(postPaginaActual(page)).then(() => {
                        tableRef.current.scrollIntoView({ behavior: "smooth" });
                      });
                    }}
                    className={`cursor-pointer text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                      page === paginaActual ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50" : ""
                    }`}
                  >
                    {page}
                  </Span>
                </li>
              ))}
              <li>
                <Span
                  onClick={paginaSiguiente}
                  className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    paginaActual >= roles.cantidadPaginas ? "cursor-default" : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Siguiente
                </Span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  
      {showModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center mx-[6%]">
          <div className="bg-gray-400 rounded-lg border-2 border-white p-6">
            <div className="flex flex-col">
              <Label htmlFor="nombre" className="font-bold">
                Nombre del rol:
              </Label>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={nuevoRol.nombre}
                onChange={handleValidate}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="descripcion" className="font-bold">
                Descripción del rol:
              </Label>
              <Input
                type="text"
                id="descripcion"
                name="descripcion"
                value={nuevoRol.descripcion}
                onChange={handleValidate}
              />
            </div>
  
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                className="m-0 md:w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                onClick={handleGuardarRol}
              >
                Guardar
              </Button>
              <Button
                className="m-0 md:w-auto text-xs"
                onClick={handleCerrarModal}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );}