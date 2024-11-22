import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllEmpleados,
  getEmpleadoDetail,
} from "../../redux/empleados/empleadosActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export default function AsignacionAccesoEmpresas() {
  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [empresas, setEmpresas] = useState([]);

  const [empleadoDetail, setEmpleadoDetail] = useState({});

  const [empleados, setEmpleados] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [filters, setFilters] = useState({
    numero_identificacion: "",
    apellidos: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: empleado.empresa_id,
  });

  const [accesosEmpresas, setAccesosEmpresas] = useState({});

  const [selectAll, setSelectAll] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const tableRef = useRef(null);

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataEmpleados = await getAllEmpleados(token, filters, 1, value);

    setEmpleados(dataEmpleados);
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

  const handleResetFilters = async () => {
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

    const dataEmpleados = await getAllEmpleados(
      token,
      {
        numero_identificacion: "",
        apellidos: "",
        orden_campo: "",
        orden_por: "",
        empresa_id: empleado.empresa_id,
      },
      1,
      limitePorPagina
    );

    setEmpleados(dataEmpleados);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataEmpleados = await getAllEmpleados(
      token,
      filters,
      1,
      limitePorPagina
    );

    setEmpleados(dataEmpleados);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    (async function () {
      const dataAllEmpresas = await getAllEmpresasActivas();

      setEmpresas(dataAllEmpresas);
    })();

    document.title = "Grupo Lamar - Asignación Accesos Empresas (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < empleados.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setAccesosEmpresas({});
  };

  const handleVerDetalles = async (empleado_id) => {
    const dataEmpleadoDetail = await getEmpleadoDetail(token, empleado_id);

    setEmpleadoDetail(dataEmpleadoDetail);

    if (!showModal) {
      setShowModal(true);
    }
  };

  const handleGuardarRol = () => {
    const identificacionEmpleado = `${empleadoDetail.tipo_identificacion}${empleadoDetail.numero_identificacion}`;

    Swal.fire({
      text: `¿Deseas actualizar los accesos del usuario ${identificacionEmpleado}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
  };

  const handleSelectAll = () => {
    const empresasSeleccionadas = {};

    if (selectAll) {
      setAccesosEmpresas({});
    } else {
      empresas.forEach((empresa) => {
        empresasSeleccionadas[empresa.empresa_id] = true;
      });
    }

    setAccesosEmpresas(empresasSeleccionadas);
    setSelectAll(!selectAll);
  };

  const handleValidate = (e) => {
    const { name, checked } = e.target;

    if (accesosEmpresas[name] === true) {
      setAccesosEmpresas((prevState) => {
        const newState = { ...prevState };
        delete newState[name];

        return newState;
      });
    } else {
      setAccesosEmpresas({ ...accesosEmpresas, [name]: checked });
    }
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        page,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8 ${
          showModal && "opacity-50 pointer-events-none"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title>Asignación Accesos Empresas</Title>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="buscar_por">Buscar por</Label>
            <Select
              id="buscar_por"
              name="buscar_por"
              onChange={handleChangeFiltersSelect}
              defaultValue={
                filters.apellidos ? "apellidos" : "numero_identificacion"
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
                filters.apellidos
                  ? `${filters.apellidos}`
                  : filters.numero_identificacion
                  ? `${filters.numero_identificacion}`
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
              <option value="15">15</option>
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
                    <div className="flex items-center">
                      Número identificación
                    </div>
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
              {empleados.empleados && empleados.empleados.length > 0 && (
                <tbody>
                  {empleados.empleados.map((empleado, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
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
                          onClick={() =>
                            handleVerDetalles(empleado.empleado_id)
                          }
                        >
                          Editar Accesos
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
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
                    onClick={() => handleChangePage(page)}
                    className={`cursor-pointer select-none text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
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
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
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
      </div>

      {showModal && (
        <div className="fixed z-[999] w-full min-h-screen top-0 left-0">
          {/* Modal content */}
          <div className="bg-gray-400 rounded-lg border-2 border-white m-[5%] max-h-[80vh] overflow-auto">
            {/* Modal header */}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 p-4 rounded-t border-t gap-4">
              <div>
                <Label className="font-bold">Lista de empresas</Label>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <div className="overflow-auto shadow-md sm:rounded-lg max-h-[80vh]">
                  <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-xs uppercase bg-gray-300">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-all-search"
                              type="checkbox"
                              className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 focus:ring-2"
                              onChange={handleSelectAll}
                              checked={selectAll}
                            />
                            <label htmlFor="checkbox-all-search">
                              Sel. Todo
                            </label>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Código
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                          RIF
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Seguro Social
                        </th>
                        <th scope="col" className="px-6 py-3">
                          División
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Sector
                        </th>
                      </tr>
                    </thead>
                    {empresas && empresas.length > 0 && (
                      <tbody>
                        {empresas.map((empresa, i) => (
                          <tr
                            key={i}
                            className="bg-gray-200 border-b hover:bg-gray-300"
                          >
                            <td className="w-4 p-4 text-center">
                              <input
                                id={empresa.empresa_id}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500"
                                checked={
                                  accesosEmpresas[empresa.empresa_id] || false
                                }
                                onChange={handleValidate}
                                name={empresa.empresa_id}
                              />
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium whitespace-nowrap"
                            >
                              {empresa.codigo_empresa}
                            </th>
                            <td className="px-6 py-4">{empresa.nombre}</td>
                            <td className="px-6 py-4">{empresa.rif}</td>
                            <td className="px-6 py-4">{empresa.tipo}</td>
                            <td className="px-6 py-4">
                              {empresa.seguro_social_id}
                            </td>
                            <td className="px-6 py-4">{empresa.division_id}</td>
                            <td className="px-6 py-4">{empresa.sector_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 pb-4 sm:flex-row justify-center items-center">
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
  );
}
