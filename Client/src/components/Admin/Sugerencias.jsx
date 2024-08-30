import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllSugerencias,
  getSugerencia,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
  resetSugerencias,
} from "../../redux/sugerencias/sugerenciasActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import {
  getAllSedesActivas,
  resetSedesActivas,
} from "../../redux/sedes/sedesActions";

import { getAllTiposSugerenciasActivas } from "../../redux/tiposSugerencias/tiposSugerenciasActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Sugerencias() {
  const tableRef = useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const sugerencias = useSelector((state) => state.sugerencias.sugerencias);

  const empresas_activas = useSelector(
    (state) => state.empresas.empresas_activas
  );

  const sedes_activas = useSelector((state) => state.sedes.sedes_activas);

  const tipos_sugerencias_activas = useSelector(
    (state) => state.tipos_sugerencias.tipos_sugerencias_activas
  );

  const paginaActual = useSelector((state) => state.empleados.paginaActual);

  const limitePorPagina = useSelector(
    (state) => state.empleados.limitePorPagina
  );

  const filtros = useSelector((state) => state.empleados.filtros);

  const [filters, setFilters] = useState({
    empresa_id: filtros.empresa_id || "",
    sede_id: filtros.sede_id || "",
    tipo_sugerencia_id: filtros.tipo_sugerencia_id || "",
    revisado_por: filtros.revisado_por || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
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

  const handleResetFilters = () => {
    setFilters({
      empresa_id: filtros.empresa_id || "",
      sede_id: filtros.sede_id || "",
      tipo_sugerencia_id: filtros.tipo_sugerencia_id || "",
      revisado_por: filtros.revisado_por || "",
      orden_campo: filtros.orden_campo || "",
      orden_por: filtros.orden_por || "",
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

    dispatch(getAllEmpresasActivas());
    dispatch(getAllTiposSugerenciasActivas());

    handleFind();

    document.title = "Grupo Lamar - Sugerencias (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    if (filters.empresa_id && filters.empresa_id !== "Seleccione") {
      setFilters({ ...filters, sede_id: "Seleccione" });
      dispatch(getAllSedesActivas(filters.empresa_id));
    } else {
      dispatch(resetSedesActivas());
      setFilters({ ...filters, sede_id: "Seleccione" });
    }
  }, [filters.empresa_id]);

  useEffect(() => {
    dispatch(getAllSugerencias(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  const handleVerDetalles = () => {};

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
    if (paginaActual < sugerencias.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleValidate = (event) => {
    const { name, value } = event.target;

    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Sugerencias</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="empresa_id">Empresa</Label>

          <Select
            id="empresa_id"
            name="empresa_id"
            defaultValue="Seleccione"
            onChange={handleValidate}
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
            onChange={handleValidate}
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
          <Label htmlFor="tipo_sugerencia_id">Tipo de sugerencia</Label>

          <Select
            id="tipo_sugerencia_id"
            name="tipo_sugerencia_id"
            defaultValue="Seleccione"
            onChange={handleValidate}
          >
            <option>Seleccione</option>
            {tipos_sugerencias_activas?.length
              ? tipos_sugerencias_activas?.map((tipo_sugerencia, i) => (
                  <option
                    key={i}
                    name={tipo_sugerencia.descripcion}
                    value={tipo_sugerencia.tipo_sugerencia_id}
                  >
                    {tipo_sugerencia.descripcion}
                  </option>
                ))
              : null}
          </Select>
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="revisado_por">
            Filtrar por revisado / no revisado
          </Label>
          <Select
            id="revisado_por"
            name="revisado_por"
            onChange={handleChangeFilters}
            defaultValue={filters.revisado_por}
          >
            <option value="">Todos</option>
            <option value="0">No Revisados</option>
            <option value="1">Revisados</option>
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
        <div className=" overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      id="nombre_empresa"
                      name="nombre_empresa"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Empresa
                      <img
                        name="nombre_empresa"
                        src={
                          filters.orden_campo === "nombre_empresa" &&
                          filters.orden_por === "ASC"
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "nombre_empresa" &&
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
                  <div className="flex items-center">Sede</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Tipo De Sugerencia</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Descripción</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Revisado Por</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Fecha Revisado</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!sugerencias.sugerencias?.length ? (
                <tr>
                  <td colSpan="9" className="text-center p-2">
                    <p>¡No existen registros!</p>
                  </td>
                </tr>
              ) : (
                sugerencias.sugerencias?.map((sugerencia, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">{sugerencia.Empresa.nombre}</td>
                    <td className="px-4 py-4">{sugerencia.Sede.nombre}</td>
                    <td className="px-4 py-4">
                      {sugerencia.Tipo_Sugerencia.descripcion}
                    </td>
                    <td className="px-4 py-4">{sugerencia.descripcion}</td>
                    <td className="px-4 py-4">{sugerencia.revisado_por}</td>
                    <td className="px-4 py-4">{sugerencia.fecha_revisado}</td>
                    <td className="px-4 py-4 flex gap-2">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() =>
                          handleVerDetalles(sugerencia.sugerencia_id)
                        }
                      >
                        Ver Sugerencia
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
            sugerencias.totalRegistros
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
              sugerencias.cantidadPaginas
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
                  paginaActual >= sugerencias.cantidadPaginas
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
  );
}
