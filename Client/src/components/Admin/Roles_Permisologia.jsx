import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllRoles, putRolEmpleado } from "../../redux/roles/rolesActions";

import {
  getAllEmpleados,
  getEmpleadoDetail,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
} from "../../redux/empleados/empleadosActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Roles_Permisologia() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const empleados = useSelector((state) => state.empleados.empleados);

  const empleadoDetail = useSelector((state) => state.empleados.empleadoDetail);

  const paginaActual = useSelector((state) => state.empleados.paginaActual);

  const limitePorPagina = useSelector(
    (state) => state.empleados.limitePorPagina
  );

  const roles = useSelector((state) => state.roles.roles);

  const filtros = useSelector((state) => state.empleados.filtros);

  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    apellidos: filtros.apellidos || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    empresa_id: empleado.empresa_id,
  });

  const [nuevoRol, setNuevoRol] = useState({});

  const [showModal, setShowModal] = useState(false);

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

        if (value === "numero_identificacion") {
          updatedFilters.apellidos = "";
        } else if (value === "apellidos") {
          updatedFilters.numero_identificacion = "";
        }

        return { ...updatedFilters, [value]: valueBuscarPor };
      });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      numero_identificacion: "",
      apellidos: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
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

    dispatch(getAllRoles(token));

    document.title = "Grupo Lamar - Roles y Permisología (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(getAllEmpleados(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

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
    if (paginaActual < empleados.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setNuevoRol({});
  };

  const handleVerDetalles = (empleado_id) => {
    if (!showModal) {
      setShowModal(true);
    }

    dispatch(getEmpleadoDetail(token, empleado_id));
  };

  const handleGuardarRol = () => {
    const identificacionEmpleado = `${empleadoDetail.tipo_identificacion}${empleadoDetail.numero_identificacion}`;

    Swal.fire({
      text: `¿Deseas asignar el rol ${nuevoRol.descripcion} al usuario ${identificacionEmpleado}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (nuevoRol.rol_id !== "Seleccione") {
          putRolEmpleado(token, nuevoRol.rol_id, empleadoDetail.empleado_id);
          setShowModal(false);
        } else {
          Swal.fire({
            title: "Oops...",
            text: "Debes seleccionar un rol válido",
            icon: "error",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    });
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;

    const rol_seleccionado = document.getElementById("rol_id");

    const descripcion_rol =
      rol_seleccionado.options[rol_seleccionado.selectedIndex].text;

    setNuevoRol({ descripcion: descripcion_rol, [name]: value });
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Roles y Permisología</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            onChange={handleChangeFiltersSelect}
            defaultValue={
              filtros.apellidos ? "apellidos" : "numero_identificacion"
            }
          >
            <option value="numero_identificacion">
              Número de identificación
            </option>
            <option value="apellidos">Apellidos</option>
          </Select>
        </div>
        <div className="flex w-full items-end">
          <Input
            type="text"
            id="input_search"
            placeholder="Escribe aquí tu búsqueda"
            onChange={handleChangeFiltersInput}
            defaultValue={
              filtros.apellidos
                ? `${filtros.apellidos}`
                : filtros.numero_identificacion
                ? `${filtros.numero_identificacion}`
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

        <div
          id="tabla"
          ref={tableRef}
          className="flex items-end justify-center sm:col-Span-2 lg:col-Span-1 lg:justify-start gap-2"
        >
          <Button className="m-0 w-auto" onClick={handleFind}>
            Buscar
          </Button>
          <Button className="m-0 w-auto" onClick={handleResetFilters}>
            Restablecer Filtros
          </Button>
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
                      id="apellidos"
                      name="apellidos"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Nombre Completo
                      <img
                        name="apellidos"
                        src={
                          filters.orden_campo === "apellidos" &&
                          filters.orden_por === "ASC"
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "apellidos" &&
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
                  <div className="flex items-center">Número identificación</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Cargo actual</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Empresa</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Unidad organizativa de adscripción
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Rol Actual</div>
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
              {empleados === "No existen empleados" ||
              !empleados.empleados?.length ? (
                <tr>
                  <td colSpan="4" className="text-center p-2">
                    <p>¡No existen registros de empleados!</p>
                  </td>
                </tr>
              ) : (
                empleados.empleados?.map((empleado, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="p-4">
                      {empleado.apellidos} {empleado.nombres}
                    </td>
                    <td className="p-4">
                      {empleado.tipo_identificacion}
                      {empleado.numero_identificacion}
                    </td>

                    <td className="p-4">
                      {
                        empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                          ?.descripcion
                      }
                    </td>
                    <td className="p-4">
                      {
                        empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                          ?.Departamento?.Empresa?.nombre
                      }
                    </td>
                    <td className="p-4">
                      {
                        empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                          ?.Departamento?.nombre
                      }
                    </td>
                    <td className="p-4">{empleado.Role.descripcion}</td>
                    <td className="p-4">{DDMMYYYY(empleado.updatedAt)}</td>
                    <td className="p-4 flex gap-2">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() => handleVerDetalles(empleado.empleado_id)}
                      >
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <nav className="flex items-center justify-center md:justify-between flex-column flex-wrap md:flex-row pt-4">
          {infoPaginador(
            paginaActual,
            limitePorPagina,
            empleados.totalRegistros
          )}
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <Span
                onClick={paginaAnterior}
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
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
              empleados.cantidadPaginas
            ).map((page) => (
              <li key={page}>
                <Span
                  onClick={() =>
                    dispatch(postPaginaActual(page)).then(() => {
                      tableRef.current.scrollIntoView({ behavior: "smooth" });
                    })
                  }
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
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
                  paginaActual >= empleados.cantidadPaginas
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
      {showModal && (
        <div className="fixed z-[1000] flex items-center justify-center w-full sm:w-[80%] max-h-[70vh] min-h-[70vh] text-sm md:text-base">
          {/* Modal content */}
          <div className="bg-gray-400 rounded-lg border-2 border-white">
            {/* Modal header */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
              <Span className="mr-2">
                <b>Nombre completo: </b>
                {empleadoDetail.nombres} {empleadoDetail.apellidos}
              </Span>

              <Span>
                <b>Número de identificación: </b>
                {empleado.tipo_identificacion}
                {empleado.numero_identificacion}
              </Span>

              <Span>
                <b>Cargo actual: </b>
                {
                  empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                    ?.descripcion
                }
              </Span>

              <Span>
                <b>Empresa: </b>
                {
                  empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                    ?.Departamento?.Empresa?.nombre
                }
              </Span>

              <Span>
                <b>Unidad organizativa de adscripción: </b>
                {
                  empleado.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                    ?.Departamento?.nombre
                }
              </Span>
              <Span>
                <b>Rol actual: </b>
                {empleado.Role.descripcion}
              </Span>

              <Span>
                <b>Última modificación: </b>
                {DDMMYYYY(empleado.updatedAt)}
              </Span>
            </div>

            {/* Cuerpo del modal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 rounded-t border-t gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="rol_id" className="font-bold">
                  Asignar nuevo rol:
                </Label>

                <Select
                  id="rol_id"
                  name="rol_id"
                  onChange={handleValidate}
                  className="md:w-auto"
                >
                  <option value="Seleccione">Seleccione</option>
                  {roles.length > 0 &&
                    roles.map((rol) => (
                      <option key={rol.rol_id} value={rol.rol_id}>
                        {rol.descripcion}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row justify-end items-center sm:items-end">
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
            {/* <!-- Modal footer --> */}
          </div>
        </div>
      )}
    </div>
  );
}
