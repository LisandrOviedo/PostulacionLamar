import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllMovimientos,
  // getMovimientoDetail,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
} from "../../redux/movimientos/movimientosActions";

import { getAllClasesMovimientosActivas } from "../../redux/clasesMovimientos/clasesMovimientosActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllSedesActivas,
  resetSedesActivas,
} from "../../redux/sedes/sedesActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function SolicitudesMovimientos() {
  const tableRef = useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const movimiento = useSelector((state) => state.movimientos.movimientoDetail);

  const movimientos = useSelector((state) => state.movimientos.movimientos);

  const paginaActual = useSelector((state) => state.movimientos.paginaActual);

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );
  const clases_movimientos_activas = useSelector(
    (state) => state.clases_movimientos.clases_movimientos_activas
  );

  const sedes_activas = useSelector((state) => state.sedes.sedes_activas);

  const limitePorPagina = useSelector(
    (state) => state.movimientos.limitePorPagina
  );

  const filtros = useSelector((state) => state.movimientos.filtros);

  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    apellidos: filtros.numero_identificacion || "",
    clase_movimiento_id: filtros.clase_movimiento_id || "Seleccione",
    estado_solicitud: filtros.estado_solicitud || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    empresa_id: filtros.empresa_id || "Seleccione",
    sede_id: filtros.sede_id || "Seleccione",
  });

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPagina(value));

    if (paginaActual !== 1) {
      dispatch(postPaginaActual(1));
    }
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

  const handleResetFilters = () => {
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

    dispatch(getAllEmpresasActivas(token));
    dispatch(getAllClasesMovimientosActivas(token));

    document.title = "Grupo Lamar - Solicitudes Movimientos (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(getAllMovimientos(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  useEffect(() => {
    if (filters.empresa_id && filters.empresa_id !== "Seleccione") {
      setFilters({ ...filters, sede_id: "Seleccione" });
      dispatch(getAllSedesActivas(filters.empresa_id));
    } else {
      dispatch(resetSedesActivas());
      setFilters({ ...filters, sede_id: "Seleccione" });
    }
  }, [filters.empresa_id]);

  const handleVerDetalles = (movimiento_id) => {
    setShowModal(true);

    // dispatch(getSugerencia(token, sugerencia_id, empleado.empleado_id));
  };
  //Finaliza nuevo codigo

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
    if (paginaActual < movimientos.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Solicitudes Movimientos</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            // onChange={handleChangeFiltersSelect}
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
            {clases_movimientos_activas?.length
              ? clases_movimientos_activas?.map((clase_movimiento, i) => (
                  <option
                    key={i}
                    name={clase_movimiento.descripcion}
                    value={clase_movimiento.clase_movimiento_id}
                  >
                    {clase_movimiento.descripcion}
                  </option>
                ))
              : null}
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
            {empresas_activas?.length
              ? empresas_activas?.map((empresa, i) => (
                  <option
                    key={i}
                    name={empresa.nombre}
                    value={empresa.empresa_id}
                  >
                    {empresa.nombre}
                  </option>
                ))
              : null}
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
            {sedes_activas?.length
              ? sedes_activas?.map((sede, i) => (
                  <option key={i} name={sede.nombre} value={sede.sede_id}>
                    {sede.nombre}
                  </option>
                ))
              : null}
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
            <option value="Pendiente por revisar">Pendiente por revisar</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Denegada">Denegada</option>
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
            <option value="2">2</option>
            <option value="10">10</option>
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
                  <div className="flex items-center">Número identificación</div>
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
            <tbody>
              {movimientos === "No existen movimientos" ||
              !movimientos.movimientos?.length ? (
                <tr>
                  <td colSpan="4" className="text-center p-2">
                    <p>¡No existen registros de movimientos!</p>
                  </td>
                </tr>
              ) : (
                movimientos.movimientos?.map((movimiento, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {movimiento.Empleado.apellidos}{" "}
                      {movimiento.Empleado.nombres}
                    </td>
                    <td className="px-4 py-4">
                      {movimiento.Empleado.tipo_identificacion}
                      {movimiento.Empleado.numero_identificacion}
                    </td>
                    <td className="px-4 py-4">
                      {movimiento.Clases_Movimiento.descripcion}
                    </td>
                    <td className="px-4 py-4">
                      {DDMMYYYYHHMM2(movimiento.createdAt)}
                    </td>
                    <td className="px-4 py-4">{movimiento.estado_solicitud}</td>
                    <td className="px-4 py-4">
                      {DDMMYYYYHHMM2(movimiento.updatedAt)}
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() => handleVerDetalles()}
                      >
                        Detalles
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
            movimientos.totalRegistros
          )}
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <span
                onClick={paginaAnterior}
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
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
                </span>
              </li>
            ))}
            <li>
              <span
                onClick={paginaSiguiente}
                className={`flex text-black items-center justify-center px-3 h-8 border border-gray-300 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white 
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
      {/* Main modal */}
      <div
        className={
          showModal
            ? "fixed z-50 inset-0 flex items-center justify-center"
            : "hidden"
        }
      >
        <div className="w-[80%]">
          {/* <!-- Modal content --> */}
          <div className="bg-[#FBFBFD] rounded-lg shadow border-4">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <div className="flex-grow">
              <span>
                <b>Inmarlaca Corporativo</b>{" "}
              </span>
              <span>
                <b>Astrid Molero</b>{" "}
              </span>
              </div>
             
              <div className="flex gap-4">
                <Button className="m-0 w-auto">Aprobar</Button>
                <Button className="m-0 w-auto">Denegar</Button>
                <Button
                  className="m-0 w-auto"
                  onClick={() => {
                    setShowModal(0);
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>

            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <span>
                <b>Tipo De Movimiento:</b>
                {/* {sugerencia.Tipos_Sugerencia?.descripcion} */}
                promocion
              </span>

              <p className="text-base leading-relaxed break-words">
                <span>
                  <b>Descripción: </b>
                </span>
                {/* {sugerencia.descripcion} */}
              </p>
              <br />
              <span>
                <b>Revisado por: </b>
                {/* {sugerencia.Empleado?.nombres ? (
                  <>
                    {sugerencia.Empleado?.nombres}{" "}
                    {sugerencia.Empleado?.apellidos} (
                    {sugerencia.Empleado?.tipo_identificacion}-
                    {sugerencia.Empleado?.numero_identificacion})
                  </>
                ) : (
                  ""
                )} */}
              </span>
              <span>
                <p></p>
              </span>
            </div>
            {/* <!-- Modal footer --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
