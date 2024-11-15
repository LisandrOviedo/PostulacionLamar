import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  getAllSugerencias,
  getSugerencia,
} from "../../redux/sugerencias/sugerenciasActions";

import { getAllEmpresasActivas } from "../../redux/empresas/empresasActions";

import { getAllSedesActivas } from "../../redux/sedes/sedesActions";

import { getAllTiposSugerenciasActivas } from "../../redux/tiposSugerencias/tiposSugerenciasActions";

import { Button, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function Sugerencias() {
  const tableRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [sugerencias, setSugerencias] = useState([]);

  const [sugerencia, setSugerencia] = useState({});

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [filters, setFilters] = useState({
    empresa_id: "",
    sede_id: "",
    tipo_sugerencia_id: "",
    estado: "",
    orden_campo: "",
    orden_por: "",
  });

  const [empresasActivas, setEmpresasActivas] = useState([]);

  const [tiposSugerenciasActivas, setTiposSugerenciasActivas] = useState([]);

  const [sedesActivas, setSedesActivas] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataSugerencias = await getAllSugerencias(token, filters, 1, value);

    setSugerencias(dataSugerencias);
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleResetFilters = async () => {
    setFilters({
      empresa_id: "",
      sede_id: "",
      tipo_sugerencia_id: "",
      estado: "",
      orden_campo: "",
      orden_por: "",
    });

    const empresa_id = document.getElementById("empresa_id");
    const sede_id = document.getElementById("sede_id");
    const tipo_sugerencia_id = document.getElementById("tipo_sugerencia_id");

    empresa_id.selectedIndex = 0;
    sede_id.selectedIndex = 0;
    tipo_sugerencia_id.selectedIndex = 0;

    const dataSugerencias = await getAllSugerencias(
      token,
      {
        empresa_id: "",
        sede_id: "",
        tipo_sugerencia_id: "",
        estado: "",
        orden_campo: "",
        orden_por: "",
      },
      1,
      limitePorPagina
    );

    setSugerencias(dataSugerencias);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataSugerencias = await getAllSugerencias(
      token,
      filters,
      1,
      limitePorPagina
    );

    setSugerencias(dataSugerencias);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    (async function () {
      const dataEmpresasActivas = await getAllEmpresasActivas();
      const dataTiposSugerenciasActivas = await getAllTiposSugerenciasActivas();

      setEmpresasActivas(dataEmpresasActivas);
      setTiposSugerenciasActivas(dataTiposSugerenciasActivas);
    })();

    document.title = "Grupo Lamar - Sugerencias (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

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

  const handleVerDetalles = async (sugerencia_id) => {
    const dataSugerencia = await getSugerencia(
      token,
      sugerencia_id,
      empleado.empleado_id
    );

    setSugerencia(dataSugerencia);

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

      const dataSugerencias = await getAllSugerencias(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataSugerencias = await getAllSugerencias(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataSugerencias = await getAllSugerencias(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataSugerencias = await getAllSugerencias(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataSugerencias = await getAllSugerencias(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < sugerencias.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataSugerencias = await getAllSugerencias(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataSugerencias = await getAllSugerencias(
        token,
        filters,
        page,
        limitePorPagina
      );

      setSugerencias(dataSugerencias);

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
          <Title>Sugerencias</Title>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="empresa_id">Empresa</Label>

            <Select
              id="empresa_id"
              name="empresa_id"
              defaultValue="Seleccione"
              onChange={handleChangeFilters}
            >
              <option>Seleccione</option>
              {empresasActivas?.length
                ? empresasActivas?.map((empresa, i) => (
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
              {sedesActivas?.length
                ? sedesActivas?.map((sede, i) => (
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
              onChange={handleChangeFilters}
            >
              <option>Seleccione</option>
              {tiposSugerenciasActivas?.length
                ? tiposSugerenciasActivas?.map((tipo_sugerencia, i) => (
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
            <Label htmlFor="estado">Filtrar por estado</Label>
            <Select
              id="estado"
              name="estado"
              onChange={handleChangeFilters}
              value={filters.estado}
            >
              <option value="">Todos</option>
              <option value="Pendiente por revisar">
                Pendiente por revisar
              </option>
              <option value="Revisado">Revisado</option>
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
              {sugerencias.sugerencias &&
                sugerencias.sugerencias.length > 0 && (
                  <tbody>
                    {sugerencias.sugerencias.map((sugerencia, i) => (
                      <tr
                        key={i}
                        className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                      >
                        <td className="p-4">
                          {sugerencia.Sede.Empresa.nombre}
                        </td>
                        <td className="p-4">{sugerencia.Sede.nombre}</td>
                        <td className="p-4">
                          {sugerencia.Tipos_Sugerencia.descripcion}
                        </td>
                        <td className="p-4">
                          {sugerencia.Empleado?.nombres ? (
                            <>
                              {sugerencia.Empleado?.nombres}{" "}
                              {sugerencia.Empleado?.apellidos}
                            </>
                          ) : (
                            "No revisado"
                          )}
                        </td>
                        <td className="p-4">
                          {sugerencia.fecha_revision
                            ? DDMMYYYYHHMM2(sugerencia.fecha_revision)
                            : "No revisado"}
                        </td>
                        <td className="p-4 flex gap-2">
                          <Button
                            className="m-0 w-auto text-xs"
                            onClick={() =>
                              handleVerDetalles(sugerencia.sugerencia_id)
                            }
                          >
                            Ver Detalles
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
              sugerencias.totalRegistros
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
                sugerencias.cantidadPaginas
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
      {/* Main modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="p-4 max-w-2xl max-h-full sm:min-w-[600px]">
            {/* <!-- Modal content --> */}
            <div className="bg-gray-400 rounded-lg border-2 border-white">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="sm:text-lg font-semibold text-gray-900">
                  {sugerencia.Sede?.Empresa?.nombre} - Sede{" "}
                  {sugerencia.Sede?.nombre}
                </h3>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <span>
                  <b>Tipo De Sugerencia:</b>{" "}
                  {sugerencia.Tipos_Sugerencia?.descripcion}
                </span>

                <p className="text-base leading-relaxed break-words">
                  <span>
                    <b>Descripción: </b>
                  </span>
                  {sugerencia.descripcion}
                </p>
                <br />
                <span>
                  <b>Revisado por: </b>
                  {sugerencia.Empleado?.nombres ? (
                    <>
                      {sugerencia.Empleado?.nombres}{" "}
                      {sugerencia.Empleado?.apellidos} (
                      {sugerencia.Empleado?.tipo_identificacion}-
                      {sugerencia.Empleado?.numero_identificacion})
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center justify-center border-t border-gray-200 rounded-b">
                <Button
                  className="w-auto"
                  onClick={() => {
                    setShowModal(0);
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
