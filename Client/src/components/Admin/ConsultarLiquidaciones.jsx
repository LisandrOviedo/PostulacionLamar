import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  getLiquidacion,
  getLiquidaciones,
} from "../../redux/liquidaciones/liquidacionesActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export default function ConsultarLiquidaciones() {
  const tableRef = useRef(null);
  const modalContentRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [liquidaciones, setLiquidaciones] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [liquidacion_id, setLiquidacionId] = useState(null);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [showModal, setShowModal] = useState(false);

  const [liquidacion, setliquidacion] = useState({});

  const [filters, setFilters] = useState({
    numero_identificacion: "",
    apellidos: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: empleado.empresa_id,
  });

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataLiquidaciones = await getLiquidaciones(token, filters, 1, value);

    setLiquidaciones(dataLiquidaciones);
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
      activo: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");
    const activo = document.getElementById("activo");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";
    activo.selectedIndex = 0;

    const dataLiquidaciones = await getLiquidaciones(
      token,
      {
        numero_identificacion: "",
        apellidos: "",
        activo: "",
        orden_campo: "",
        orden_por: "",
        empresa_id: empleado.empresa_id,
      },
      1,
      limitePorPagina
    );

    setLiquidaciones(dataLiquidaciones);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataLiquidaciones = await getLiquidaciones(
      token,
      filters,
      1,
      limitePorPagina
    );

    setLiquidaciones(dataLiquidaciones);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    console.log(liquidaciones);

    document.title = "Grupo Lamar - Consultar Liquidaciones (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleVerDetalles = async (movimiento_id) => {
    // Asegúrate de que showModal esté definido
    if (!showModal) {
      setShowModal(true);
    }

    // Verifica que liquidacion_id y numero_identificacion estén definidos
    if (
      liquidacion_id &&
      empleado &&
      empleado.empleado_id &&
      numero_identificacion
    ) {
      const data = await getLiquidacion(
        token,
        empleado.empleado_id,
        numero_identificacion
      );

      setliquidacion(data);
    }
  };
  const handleCerrarModal = () => {
    setShowModal(false);

    setliquidacion({});
  };

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataLiquidaciones = await getLiquidaciones(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_por: "DESC",
      }));

      const dataLiquidaciones = await getLiquidaciones(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataLiquidaciones = await getLiquidaciones(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataLiquidaciones = await getLiquidaciones(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataLiquidaciones = await getLiquidaciones(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < empleados.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataLiquidaciones = await getLiquidaciones(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataLiquidaciones = await getLiquidaciones(
        token,
        filters,
        page,
        limitePorPagina
      );

      setLiquidaciones(dataLiquidaciones);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Consultar Liquidaciones</Title>
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
          <Label htmlFor="activo">Filtrar por activo / inactivo</Label>
          <Select
            id="activo"
            name="activo"
            onChange={handleChangeFilters}
            defaultValue={filters.activo}
          >
            <option value="">Todos</option>
            <option value="1">Activos</option>
            <option value="0">Inactivos</option>
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
                  <div className="flex items-center">Código</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Número identificación</div>
                </th>
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
                    <span
                      id="updatedAt"
                      name="updatedAt"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Fecha de liquidación
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
                  <div className="flex items-center">Realizado por</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Motivo del retiro</div>
                </th>

                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>

            {liquidaciones.liquidaciones &&
              liquidaciones.liquidaciones.length > 0 && (
                <tbody>
                  {liquidaciones.liquidaciones.map((liquidacion, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="p-4">{liquidacion.codigo}</td>
                      <td className="p-4">
                        {empleado.tipo_identificacion}
                        {"-"}
                        {empleado.numero_identificacion}
                      </td>
                      <td className="p-4">
                        {empleado.apellidos} {empleado.nombres}
                      </td>
                      <td className="p-4">
                        {DDMMYYYYHHMM2(liquidacion.createdAt)}
                      </td>
                      <td className="p-4 text-center">
                        {liquidacion?.RealizadoPor && (
                          <>
                            <div>
                              {liquidacion.RealizadoPor.nombres}{" "}
                              {liquidacion.RealizadoPor.apellidos} (
                              {liquidacion.RealizadoPor.tipo_identificacion}-
                              {liquidacion.RealizadoPor.numero_identificacion})
                            </div>
                          </>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {liquidacion.motivo_retiro}
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() =>
                            handleVerDetalles(liquidaciones.liquidacion_id)
                          }
                        >
                          Detalles
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
            liquidaciones.totalRegistros
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
              liquidaciones.cantidadPaginas
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
                  paginaActual >= liquidaciones.cantidadPaginas
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
      {showModal && (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center">
          <div className="p-4 max-h-full sm:min-w-[600px]">
            {/* <!-- Modal content --> */}
            <div className="bg-gray-400 rounded-lg border-2 border-white">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t flex-col sm:flex-row">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="font-bold">
                    {liquidacion?.RealizadoPor?.numero_identificacion ||
                      "No disponible"}
                  </span>
                  <span>
                    {liquidacion?.RealizadoPor?.nombres || "No disponible"}{" "}
                    {liquidacion?.RealizadoPor?.apellidos || "No disponible"}
                  </span>
                  <span>
                    {liquidacion?.RealizadoPor?.tipo_identificacion ||
                      "No disponible"}{" "}
                    -{" "}
                    {liquidacion?.RealizadoPor?.numero_identificacion ||
                      "No disponible"}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    className="m-0 w-auto text-xs bg-blue-600 hover:bg-blue-600/[.5]"
                    onClick={handleCerrarModal}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
              {/* Cuerpo del modal */}
              <div
                className="overflow-y-auto max-h-[60vh]"
                ref={modalContentRef}
              >
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <span>
                    <b>Código de nómina: </b>
                    {liquidacion?.codigo_nomina || "No disponible"}
                  </span>
                  <span>
                    <b>Cargo actual: </b>
                    {liquidacion?.Cargo_Actual?.descripcion || "No disponible"}
                  </span>
                  <span>
                    <b>Unidad organizativa de adscripción: </b>
                    {liquidacion?.Cargo_Actual?.Departamento?.nombre ||
                      "No disponible"}
                  </span>
                  <span>
                    <b>Fecha de ingreso: </b>
                    {liquidacion?.Cargo_Actual?.fecha_ingreso ||
                      "No disponible"}
                  </span>
                  <span>
                    <b>Antigüedad: </b>
                    {liquidacion?.Cargo_Actual?.fecha_ingreso
                      ? `${calcularAntiguedad(
                          liquidacion?.Cargo_Actual?.fecha_ingreso
                        )} días`
                      : "No disponible"}
                  </span>
                  <span>
                    <b>Sueldo actual: </b>
                    {liquidacion?.Cargo_Actual?.salario
                      ? `Bs. ${liquidacion?.Cargo_Actual?.salario}`
                      : "No disponible"}
                  </span>
                  <span>
                    <b>Tipo de nómina: </b>
                    {liquidacion?.tipo_nomina || "No disponible"}
                  </span>
                  {liquidacion?.tipo_nomina === "Otro" && (
                    <span>
                      <b>Otro tipo de nómina: </b>
                      {liquidacion?.otro_tipo_nomina || "No disponible"}
                    </span>
                  )}
                </div>
                {/* Aquí puedes agregar más contenido basado en tu estructura original */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
