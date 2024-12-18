import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  getAllMovimientos,
  getMovimientoDetail,
  putAprobarMovimiento,
  putDenegarMovimiento,
  postMovimientoPDF,
} from "../../redux/movimientos/movimientosActions";

import { getAllClasesMovimientosActivas } from "../../redux/clasesMovimientos/clasesMovimientosActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import { getAllSedesActivas } from "../../redux/sedes/sedesActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import { calcularAntiguedad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export default function SolicitudesMovimientos() {
  const tableRef = useRef(null);

  const modalContentRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [movimiento, setMovimiento] = useState({});

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [empresasActivas, setEmpresasActivas] = useState([]);

  const [clasesMovimientosActivas, setClasesMovimientosActivas] = useState([]);

  const [sedesActivas, setSedesActivas] = useState([]);

  const [movimientos, setMovimientos] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    numero_identificacion: "",
    apellidos: "",
    clase_movimiento_id: "Seleccione",
    estado_solicitud: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: "Seleccione",
    sede_id: "Seleccione",
  });

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataMovimientos = await getAllMovimientos(token, filters, 1, value);

    setMovimientos(dataMovimientos);
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleChangeFiltersInput = (e) => {
    const { value } = e.target;

    const buscarPor = document.getElementById("buscar_por");
    const valueBuscarPor = buscarPor.value;

    setFilters({ ...filters, [valueBuscarPor]: value });
  };

  const handleResetFilters = async () => {
    setFilters({
      numero_identificacion: "",
      apellidos: "",
      clase_movimiento_id: "Seleccione",
      estado_solicitud: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: "Seleccione",
      sede_id: "Seleccione",
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";

    const dataMovimientos = await getAllMovimientos(
      token,
      {
        numero_identificacion: "",
        apellidos: "",
        clase_movimiento_id: "Seleccione",
        estado_solicitud: "",
        orden_campo: "",
        orden_por: "",
        empresa_id: "Seleccione",
        sede_id: "Seleccione",
      },
      1,
      limitePorPagina
    );

    setMovimientos(dataMovimientos);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataMovimientos = await getAllMovimientos(
      token,
      filters,
      1,
      limitePorPagina
    );

    setMovimientos(dataMovimientos);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    (async function () {
      const dataEmpresasActivas = await getAllEmpresasActivas();
      const dataClasesMovimientosActivas = await getAllClasesMovimientosActivas(
        token
      );

      setEmpresasActivas(dataEmpresasActivas);
      setClasesMovimientosActivas(dataClasesMovimientosActivas);
    })();

    document.title = "Grupo Lamar - Solicitudes Movimientos (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      // Reinicia el scroll al inicio cada vez que el modal se abre
      modalContentRef.current.scrollTop = 0;
    }
  }, [showModal]);

  useEffect(() => {
    (async function () {
      if (filters.empresa_id && filters.empresa_id !== "Seleccione") {
        setFilters({ ...filters, sede_id: "Seleccione" });

        const data = await getAllSedesActivas(filters.empresa_id);

        setSedesActivas(data);
      } else {
        setSedesActivas([]);
        setFilters({ ...filters, sede_id: "Seleccione" });
      }
    })();
  }, [filters.empresa_id]);

  const handleVerDetalles = async (movimiento_id) => {
    const data = await getMovimientoDetail(
      token,
      movimiento_id,
      empleado.empleado_id
    );

    setMovimiento(data);

    if (!showModal) {
      setShowModal(true);
    }
  };

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataMovimientos = await getAllMovimientos(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataMovimientos = await getAllMovimientos(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataMovimientos = await getAllMovimientos(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataMovimientos = await getAllMovimientos(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataMovimientos = await getAllMovimientos(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < movimientos.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataMovimientos = await getAllMovimientos(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAprobarMovimiento = async (movimiento_id) => {
    const { value: text, isConfirmed } = await Swal.fire({
      input: "textarea",
      inputLabel: "Aprobar Movimiento",
      inputPlaceholder: "Escribe tus observaciones aquí...",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (isConfirmed) {
      await putAprobarMovimiento(
        token,
        movimiento_id,
        empleado.empleado_id,
        text
      );

      handleFind();
      handleVerDetalles(movimiento_id);
    }
  };

  const handleDenegarMovimiento = async (movimiento_id) => {
    const { value: text, isConfirmed } = await Swal.fire({
      input: "textarea",
      inputLabel: "Denegar Movimiento",
      inputPlaceholder: "Escribe tus observaciones aquí...",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    });

    if (isConfirmed) {
      await putDenegarMovimiento(
        token,
        movimiento_id,
        empleado.empleado_id,
        text
      );

      handleFind();
      handleVerDetalles(movimiento_id);
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);

    setMovimiento({});
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

  const handleVerDetallesPDF = async (movimiento_id, identificacion) => {
    const response = await postMovimientoPDF(
      token,
      movimiento_id,
      empleado.empleado_id,
      identificacion
    );

    Swal.fire({
      text: `Movimiento del empleado ${identificacion} generado ¿Deseas abrirlo?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${response.data}`;
        window.open(URL_GET_PDF, "_blank");
      }
    });
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataMovimientos = await getAllMovimientos(
        token,
        filters,
        page,
        limitePorPagina
      );

      setMovimientos(dataMovimientos);

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
          <Title>Solicitudes Movimientos</Title>
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

          {/* Clase de Movimiento */}
          <div>
            <Label htmlFor="clase_movimiento_id">Clase De Movimiento</Label>
            <Select
              id="clase_movimiento_id"
              name="clase_movimiento_id"
              onChange={handleChangeFilters}
              value={filters.clase_movimiento_id}
            >
              <option value="Seleccione">Seleccione</option>
              {clasesMovimientosActivas?.length &&
                clasesMovimientosActivas?.map((clase_movimiento, i) => (
                  <option
                    key={i}
                    name={clase_movimiento.descripcion}
                    value={clase_movimiento.clase_movimiento_id}
                  >
                    {clase_movimiento.descripcion}
                  </option>
                ))}
            </Select>
          </div>

          <div className="flex flex-col place-content-between">
            <Label htmlFor="empresa_id">Empresa</Label>
            <Select
              id="empresa_id"
              name="empresa_id"
              value={filters.empresa_id}
              onChange={handleChangeFilters}
            >
              <option>Seleccione</option>
              {empresasActivas?.length &&
                empresasActivas?.map((empresa, i) => (
                  <option
                    key={i}
                    name={empresa.nombre}
                    value={empresa.empresa_id}
                  >
                    {empresa.nombre}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="sede_id">Sede</Label>
            <Select
              id="sede_id"
              name="sede_id"
              value={filters.sede_id}
              onChange={handleChangeFilters}
            >
              <option>Seleccione</option>
              {sedesActivas?.length &&
                sedesActivas?.map((sede, i) => (
                  <option key={i} name={sede.nombre} value={sede.sede_id}>
                    {sede.nombre}
                  </option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="estado_solicitud">Estado de la solicitud</Label>
            <Select
              id="estado_solicitud"
              name="estado_solicitud"
              value={filters.estado_solicitud}
              onChange={handleChangeFilters}
            >
              <option value="">Todos</option>
              <option value="Pendiente por revisar">
                Pendiente por revisar
              </option>
              <option value="Revisado">Revisado</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Denegado">Denegado</option>
            </Select>
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
            className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start gap-2"
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
                      <span
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
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Número identificación
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Clase Movimiento</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="createdAt"
                        name="createdAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Solicitado
                        <img
                          name="createdAt"
                          src={
                            filters.orden_campo === "createdAt" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "createdAt" &&
                                filters.orden_por === "DESC"
                              ? "./SortZA.svg"
                              : "./SortDefault.svg"
                          }
                          alt="Icon Sort"
                          className="w-5 h-5 ms-1.5 cursor-pointer"
                        />
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Estado</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="updatedAt"
                        name="updatedAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Revisado
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
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Acción</div>
                  </th>
                </tr>
              </thead>
              {movimientos.movimientos &&
                movimientos.movimientos.length > 0 && (
                  <tbody>
                    {movimientos.movimientos.map((movimiento, i) => (
                      <tr
                        key={i}
                        className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                      >
                        <td className="p-4">
                          {movimiento.Empleado.apellidos}{" "}
                          {movimiento.Empleado.nombres}
                        </td>
                        <td className="p-4">
                          {movimiento.Empleado.tipo_identificacion}
                          {movimiento.Empleado.numero_identificacion}
                        </td>
                        <td className="p-4">
                          {movimiento.Clases_Movimiento.descripcion}
                        </td>
                        <td className="p-4">
                          {DDMMYYYYHHMM2(movimiento.createdAt)}
                        </td>
                        <td className="p-4">{movimiento.estado_solicitud}</td>
                        <td className="p-4">
                          {DDMMYYYYHHMM2(movimiento.updatedAt)}
                        </td>
                        <td className="p-4 flex gap-2">
                          <Button
                            className="m-0 w-auto text-xs"
                            onClick={() =>
                              handleVerDetalles(movimiento.movimiento_id)
                            }
                          >
                            Ver Detalles
                          </Button>
                          <Button
                            className="m-0 w-auto text-xs bg-red-600 hover:bg-red-600/[.5] text-white"
                            onClick={() =>
                              handleVerDetallesPDF(
                                movimiento.movimiento_id,
                                `${movimiento.Empleado.tipo_identificacion}${movimiento.Empleado.numero_identificacion}`
                              )
                            }
                          >
                            PDF
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
              movimientos.totalRegistros
            )}
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <span
                  onClick={paginaAnterior}
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
                  paginaActual <= 1
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                >
                  Pág. Anterior
                </span>
              </li>
              {calcularPaginasARenderizar(
                paginaActual,
                movimientos.cantidadPaginas
              ).map((page) => (
                <li key={page}>
                  <span
                    onClick={() => handleChangePage(page)}
                    className={`cursor-pointer select-none text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                      page === paginaActual
                        ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50"
                        : ""
                    }`}
                  >
                    {page}
                  </span>
                </li>
              ))}
              <li>
                <span
                  onClick={paginaSiguiente}
                  className={`flex select-none text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
                ${
                  paginaActual >= movimientos.cantidadPaginas
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                >
                  Pág. Siguiente
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Main modal */}
      {showModal && (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center">
          <div className="p-4 max-h-full sm:min-w-[600px]">
            {/* <!-- Modal content --> */}
            <div className="bg-gray-400 rounded-lg border-2 border-white">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t flex-col sm:flex-row">
                <div className="flex flex-col items-center sm:items-start">
                  <Span className="font-bold m-0">
                    {`${movimiento?.movimiento?.Empleado?.Empresa?.nombre} (${movimiento?.movimiento?.Empleado?.Empresa?.Sedes[0]?.nombre})`}
                  </Span>
                  <Span className="m-0">
                    {`${movimiento?.movimiento?.Empleado?.nombres} ${movimiento?.movimiento?.Empleado?.apellidos}`}
                  </Span>
                  <Span className="m-0">
                    {`${movimiento?.movimiento?.Empleado?.tipo_identificacion}-${movimiento?.movimiento?.Empleado?.numero_identificacion}`}
                  </Span>
                </div>

                <div className="flex gap-2 items-center">
                  {movimiento?.movimiento?.estado_solicitud ===
                    "Pendiente por revisar" ||
                  movimiento?.movimiento?.estado_solicitud === "Revisado" ? (
                    <>
                      <Button
                        className="m-0 w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                        onClick={() =>
                          handleAprobarMovimiento(
                            movimiento.movimiento.movimiento_id
                          )
                        }
                      >
                        Aprobar
                      </Button>
                      <Button
                        className="m-0 w-auto text-xs bg-red-600 hover:bg-red-600/[.5]"
                        onClick={() =>
                          handleDenegarMovimiento(
                            movimiento.movimiento.movimiento_id
                          )
                        }
                      >
                        Denegar
                      </Button>
                    </>
                  ) : (
                    <Span className="m-0">
                      <b>Estado Solicitud: </b>
                      {movimiento?.movimiento?.estado_solicitud}
                    </Span>
                  )}

                  <Button
                    className="m-0 w-auto text-xs"
                    onClick={handleCerrarModal}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>

              {/* <!-- Modal body --> */}

              <div
                className="overflow-y-auto max-h-[60vh]"
                ref={modalContentRef}
              >
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span>
                    <b>Código de nómina: </b>
                    {movimiento?.movimientoAnterior?.codigo_nomina}
                  </Span>
                  <Span>
                    <b>Cargo actual: </b>
                    {movimiento?.movimiento?.Cargo_Actual?.Cargos_Nivele?.Cargo
                      ?.descripcion &&
                      `${movimiento?.movimiento?.Cargo_Actual?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.Cargo_Actual?.Cargos_Nivele?.nivel})`}
                  </Span>
                  <Span>
                    <b>Unidad organizativa de adscripción: </b>
                    {
                      movimiento?.movimiento?.Cargo_Actual?.Cargos_Nivele?.Cargo
                        ?.Departamento?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Fecha de ingreso: </b>
                    {movimiento?.movimiento?.Cargo_Actual?.fecha_ingreso}
                  </Span>
                  <Span>
                    <b>Antiguedad: </b>
                    {movimiento?.movimiento?.Cargo_Actual?.fecha_ingreso &&
                      `${calcularAntiguedad(
                        movimiento?.movimiento?.Cargo_Actual?.fecha_ingreso
                      )} días`}
                  </Span>
                  <Span>
                    <b>Sueldo actual: </b>
                    {movimiento?.movimiento?.Cargo_Actual?.salario &&
                      `Bs. ${movimiento?.movimiento?.Cargo_Actual?.salario}`}
                  </Span>
                  <Span>
                    <b>Tipo de nómina: </b>
                    {movimiento?.movimientoAnterior?.tipo_nomina}
                  </Span>
                  {movimiento?.movimientoAnterior?.tipo_nomina === "Otro" && (
                    <Span>
                      <b>Otro tipo de nómina: </b>
                      {movimiento?.movimientoAnterior?.otro_tipo_nomina}
                    </Span>
                  )}
                  <Span>
                    <b>Frecuencia de nómina: </b>
                    {movimiento?.movimientoAnterior?.frecuencia_nomina}
                  </Span>
                  {movimiento?.movimientoAnterior?.frecuencia_nomina ===
                    "Otro" && (
                    <Span>
                      <b>Otra frecuencia de nómina: </b>
                      {movimiento?.movimientoAnterior?.otra_frecuencia_nomina}
                    </Span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span className="mx-auto text-md sm:col-span-2 md:col-span-3">
                    <b>Detalle del Movimiento Organizativo</b>
                  </Span>
                  <Span>
                    <b>Clase de movimiento: </b>
                    {movimiento?.movimiento?.Clases_Movimiento?.descripcion}
                  </Span>
                  <Span>
                    <b>Duración de movimiento: </b>
                    {movimiento?.movimiento?.duracion_movimiento}
                  </Span>

                  {movimiento?.movimiento?.duracion_movimiento ===
                    "Temporal" && (
                    <Span>
                      <b>Duración de movimiento en días: </b>
                      {movimiento?.movimiento?.duracion_movimiento_dias}
                    </Span>
                  )}
                  <Span>
                    <b>Requiere periodo de prueba: </b>
                    {movimiento?.movimiento?.requiere_periodo_prueba
                      ? "Sí"
                      : "No"}
                  </Span>
                  {movimiento?.movimiento?.requiere_periodo_prueba && (
                    <Span>
                      <b>Duración de periodo de prueba en días: </b>
                      {movimiento?.movimiento?.duracion_periodo_prueba &&
                        `${movimiento?.movimiento?.duracion_periodo_prueba} días`}
                    </Span>
                  )}
                  <Span className="sm:col-span-2 md:col-span-3">
                    <b>Justificación del movimiento: </b>
                    {movimiento?.movimiento?.justificacion_movimiento}
                  </Span>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span className="mx-auto text-md sm:col-span-2 md:col-span-3">
                    <b>Nueva Condición Laboral Del Trabajador</b>
                  </Span>
                  <Span>
                    <b>Empresa: </b>
                    {
                      movimiento?.movimiento?.Nuevo_Cargo?.Cargo?.Departamento
                        ?.Empresa?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Departamento: </b>
                    {
                      movimiento?.movimiento?.Nuevo_Cargo?.Cargo?.Departamento
                        ?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Cargo: </b>
                    {movimiento?.movimiento?.Nuevo_Cargo?.Cargo?.descripcion}
                  </Span>
                  <Span>
                    <b>Nivel del cargo: </b>
                    {movimiento?.movimiento?.Nuevo_Cargo?.nivel}
                  </Span>
                  <Span>
                    <b>Vigencia del movimiento (fecha desde): </b>
                    {movimiento?.movimiento?.vigencia_movimiento_desde}
                  </Span>
                  <Span>
                    <b>Vigencia del movimiento (fecha hasta): </b>
                    {movimiento?.movimiento?.vigencia_movimiento_hasta}
                  </Span>
                  <Span>
                    <b>Tipo de nómina: </b>
                    {movimiento?.movimiento?.tipo_nomina}
                  </Span>
                  {movimiento?.movimiento?.tipo_nomina === "Otro" && (
                    <Span>
                      <b>Otro tipo de nómina: </b>
                      {movimiento?.movimiento?.otro_tipo_nomina}
                    </Span>
                  )}
                  <Span>
                    <b>Frecuencia de nómina: </b>
                    {movimiento?.movimiento?.frecuencia_nomina}
                  </Span>
                  {movimiento?.movimiento?.frecuencia_nomina === "Otro" && (
                    <Span>
                      <b>Otra frecuencia de nómina: </b>
                      {movimiento?.movimiento?.otra_frecuencia_nomina}
                    </Span>
                  )}
                  <Span>
                    <b>Nuevo sueldo: </b>
                    {movimiento?.movimiento?.sueldo &&
                      `Bs. ${movimiento?.movimiento?.sueldo}`}
                  </Span>
                  <Span>
                    <b>Código de nómina: </b>
                    {movimiento?.movimiento?.codigo_nomina}
                  </Span>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-b p-4 sm:2">
                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Datos Del Solicitante</b>
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Solicitante?.nombres}{" "}
                      {movimiento?.movimiento?.Solicitante?.apellidos}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Solicitante?.tipo_identificacion}
                      {"-"}
                      {
                        movimiento?.movimiento?.Solicitante
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Solicitante?.Cargos_Empleados[0]
                        ?.Cargos_Nivele?.Cargo?.descripcion &&
                        `${movimiento?.movimiento?.Solicitante?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.Solicitante?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Supervisor Inmediato</b>
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Supervisor?.nombres}{" "}
                      {movimiento?.movimiento?.Supervisor?.apellidos}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Supervisor?.tipo_identificacion}
                      {"-"}
                      {
                        movimiento?.movimiento?.Supervisor
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Supervisor?.Cargos_Empleados[0]
                        ?.Cargos_Nivele?.Cargo?.descripcion &&
                        `${movimiento?.movimiento?.Supervisor?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.Supervisor?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Aprobación Gerencia De Área</b>
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Gerencia?.nombres} {""}
                      {movimiento?.movimiento?.Gerencia?.apellidos}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Gerencia?.tipo_identificacion}
                      {"-"}
                      {movimiento?.movimiento?.Gerencia?.numero_identificacion}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.Gerencia?.Cargos_Empleados[0]
                        ?.Cargos_Nivele?.Cargo?.descripcion &&
                        `${movimiento?.movimiento?.Gerencia?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.Gerencia?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Talento Humano</b>
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.TTHH?.nombres} {""}
                      {movimiento?.movimiento?.TTHH?.apellidos}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.TTHH?.tipo_identificacion}
                      {"-"}
                      {movimiento?.movimiento?.TTHH?.numero_identificacion}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.TTHH?.Cargos_Empleados[0]
                        ?.Cargos_Nivele?.Cargo?.descripcion &&
                        `${movimiento?.movimiento?.TTHH?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.TTHH?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>
                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Revisado por: </b>
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.RevisadoPor?.nombres}{" "}
                      {movimiento?.movimiento?.RevisadoPor?.apellidos}
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.RevisadoPor?.tipo_identificacion}
                      {"-"}
                      {
                        movimiento?.movimiento?.RevisadoPor
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {movimiento?.movimiento?.RevisadoPor?.Cargos_Empleados[0]
                        ?.Cargos_Nivele?.Cargo?.descripcion &&
                        `${movimiento?.movimiento?.RevisadoPor?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${movimiento?.movimiento?.RevisadoPor?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>
                  {movimiento?.movimiento?.observaciones && (
                    <div className="flex flex-col justify-start items-center text-center sm:col-span-2">
                      <Span>
                        <b>Observaciones: </b>
                        {movimiento?.movimiento?.observaciones}
                      </Span>
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- Modal footer --> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
