import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
  getAllRolesFiltrados,
  postCrearRol,
  getRol,
  putModificarRol,
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

  const rolDetail = useSelector((state) => state.roles.rolDetail);

  const filtros = useSelector((state) => state.roles.filtros);

  const [filters, setFilters] = useState({
    nombre: filtros.nombre || "",
    descripcion: filtros.descripcion || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
  });

  const [nuevoRol, setNuevoRol] = useState({
    nombre: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [editarRol, setEditarRol] = useState({
    nombre: "",
    descripcion: "",
  });

  const [showDetallesRolModal, setShowDetallesRolModal] = useState(false);
  const [showCrearRolModal, setShowCrearRolModal] = useState(false);

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
    // Llamar a la función que realiza la solicitud a la API directamente
    postCrearRol(token, nuevoRol).then(() => {
      setShowCrearRolModal(false);
    });

    handleFind(); // Actualiza la tabla después de guardar
  };

  const handleOpenCrearRolModal = () => {
    setNuevoRol({ nombre: "", descripcion: "" });
    setShowCrearRolModal(true);
  };

  const handleOpenDetallesRolModal = (rol_id) => {
    dispatch(getRol(token, rol_id));

    setEditarRol({ nombre: "", descripcion: "" });

    setShowDetallesRolModal(true);
  };

  //editar

  const handleModificarRol = async () => {
    // Llamada a la función modificarRol

    Swal.fire({
      text: "¿Seguro que deseas modificar este rol?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        putModificarRol(
          token,
          rolDetail.rol_id,
          editarRol.nombre,
          editarRol.descripcion
        );

        handleFind();

        setShowDetallesRolModal(false);
      }
    });
  };

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

  const handleValidateCrear = (e) => {
    const { name, value } = e.target;

    setNuevoRol({ ...nuevoRol, [name]: value });
  };

  const handleValidateModificar = (e) => {
    const { name, value } = e.target;

    setEditarRol({ ...editarRol, [name]: value });
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
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
          {/* <div> */}
          <div
            id="tabla"
            ref={tableRef}
            className="flex flex-col sm:flex-row items-end gap-3 sm:col-span-2 md:col-span-3 justify-center"
          >
            <Button className="m-0 sm:w-auto" onClick={handleFind}>
              Buscar
            </Button>
            <Button className="m-0 sm:w-auto" onClick={handleResetFilters}>
              Restablecer Filtros
            </Button>
            <Button
              className="m-0 sm:w-auto bg-green-600"
              onClick={handleOpenCrearRolModal}
            >
              Crear rol
            </Button>
          </div>
          {/* </div> */}
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
                {!roles.roles?.length ? (
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
                          onClick={() => handleOpenDetallesRolModal(rol.rol_id)}
                        >
                          Editar
                        </Button>

                        <Button className="m-0 w-auto text-xs">
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
                    paginaActual <= 1
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Anterior
                </Span>
              </li>
              {calcularPaginasARenderizar(
                paginaActual,
                roles.cantidadPaginas
              ).map((page) => (
                <li key={page}>
                  <Span
                    onClick={() => {
                      dispatch(postPaginaActual(page)).then(() => {
                        tableRef.current.scrollIntoView({ behavior: "smooth" });
                      });
                    }}
                    className={`cursor-pointer text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                      page === paginaActual
                        ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50"
                        : ""
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
                    paginaActual >= roles.cantidadPaginas
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Pág. Siguiente
                </Span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal para crear rol */}
      {showCrearRolModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center mx-[6%]">
          <div className="bg-gray-400 rounded-lg border-2 border-white p-6">
            <div className="flex flex-col">
              <Label htmlFor="nombreCrear" className="font-bold">
                Nombre del rol:
              </Label>
              <Input
                type="text"
                id="nombreCrear"
                name="nombre"
                value={nuevoRol.nombre}
                onChange={handleValidateCrear}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="descripcionCrear" className="font-bold">
                Descripción del rol:
              </Label>
              <Input
                type="text"
                id="descripcionCrear"
                name="descripcion"
                value={nuevoRol.descripcion}
                onChange={handleValidateCrear}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                className="m-0 w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                onClick={handleGuardarRol}
              >
                Guardar
              </Button>
              <Button
                className="m-0 w-auto text-xs"
                onClick={() => setShowCrearRolModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showDetallesRolModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center mx-[6%]">
          <div className="bg-gray-400 rounded-lg border-2 border-white p-6">
            <div>
              <Span>Nombre: {rolDetail.nombre}</Span>
            </div>
            <div>
              <Span>Descripcion: {rolDetail.descripcion}</Span>
            </div>
            <div>
              <Label htmlFor="nombreEditar" className="font-bold">
                Nuevo nombre del rol:
              </Label>
              <Input
                type="text"
                id="nombreEditar"
                name="nombre"
                value={editarRol.nombre}
                onChange={handleValidateModificar}
              />
            </div>

            <div className="flex flex-col mt-4">
              <Label htmlFor="descripcionEditar" className="font-bold">
                Nueva descripción del rol:
              </Label>
              <Input
                type="text"
                id="descripcionEditar"
                name="descripcion"
                value={editarRol.descripcion}
                onChange={handleValidateModificar}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <Button
                className="m-0 w-auto text-xs"
                onClick={handleModificarRol}
              >
                Guardar Cambios
              </Button>
              <Button
                className="m-0 w-auto text-xs"
                onClick={() => setShowDetallesRolModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}