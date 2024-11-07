import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getPostulacionesEmpleado } from "../../redux/vacantes/vacantesActions";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import { calcularAntiguedad } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export function HistorialPostulaciones() {
  const tableRef = useRef(null);

  const modalContentRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(2);

  const [areasInteresActivas, setAreasInteresActivas] = useState([]);

  const [postulaciones, setPostulaciones] = useState([]);

  const [postulacionDetail, setPostulacionDetail] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState({
    buscar_por: "descripcion",
    buscar: "",
    area_interes_id: "",
    orden_campo: "",
    orden_por: "",
  });

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataPostulaciones = await getPostulacionesEmpleado(
      token,
      empleado.empleado_id,
      filters,
      1,
      value
    );

    setPostulaciones(dataPostulaciones);
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleChangeFiltersSelect = (e) => {
    const { value } = e.target;

    setFilters({ ...filters, ["buscar_por"]: value });
  };

  const handleResetFilters = async () => {
    setFilters({
      buscar_por: "descripcion",
      buscar: "",
      area_interes_id: "",
      orden_campo: "",
      orden_por: "",
    });

    const buscar_por = document.getElementById("buscar_por");
    const buscar = document.getElementById("buscar");

    buscar_por.selectedIndex = 0;
    buscar.value = "";

    const dataPostulaciones = await getPostulacionesEmpleado(
      token,
      empleado.empleado_id,
      {
        buscar_por: "descripcion",
        buscar: "",
        area_interes_id: "",
        orden_campo: "",
        orden_por: "",
      },
      1,
      limitePorPagina
    );

    setPostulaciones(dataPostulaciones);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataPostulaciones = await getPostulacionesEmpleado(
      token,
      empleado.empleado_id,
      filters,
      1,
      limitePorPagina
    );

    setPostulaciones(dataPostulaciones);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    (async function () {
      const dataAreasInteresActivas = await getAllAreasInteresActivas(token);

      setAreasInteresActivas(dataAreasInteresActivas);
    })();

    document.title = "Grupo Lamar - Mis Postulaciones";

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

  const handleVerDetalles = async (movimiento_id) => {
    if (!showModal) {
      setShowModal(true);
    }

    // const data = await getMovimientoDetail(
    //   token,
    //   movimiento_id,
    //   empleado.empleado_id
    // );

    // setPostulacionDetail(data);
  };

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < postulaciones.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);

    setPostulacionDetail({});
  };

  // const handleChangeFiltersSelect = (e) => {
  //   const { value } = e.target;

  //   const buscarPor = document.getElementById("input_search");
  //   const valueBuscarPor = buscarPor.value;

  //   if (valueBuscarPor) {
  //     setFilters((prevFilters) => {
  //       let updatedFilters = { ...prevFilters };

  //       if (value === "numero_identificacion") {
  //         updatedFilters.apellidos = "";
  //       } else if (value === "apellidos") {
  //         updatedFilters.numero_identificacion = "";
  //       }

  //       return { ...updatedFilters, [value]: valueBuscarPor };
  //     });
  //   }
  // };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataPostulaciones = await getPostulacionesEmpleado(
        token,
        empleado.empleado_id,
        filters,
        page,
        limitePorPagina
      );

      setPostulaciones(dataPostulaciones);

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
          <Title>Mis Postulaciones</Title>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="buscar_por">Buscar por</Label>
            <Select
              id="buscar_por"
              name="buscar_por"
              onChange={handleChangeFiltersSelect}
              value={filters.buscar_por}
            >
              <option value="descripcion">Descripción de la vacante</option>
            </Select>
          </div>
          <div className="flex w-full items-end">
            <Input
              id="buscar"
              type="text"
              placeholder="Escribe aquí tu búsqueda"
              name="buscar"
              onChange={handleChangeFilters}
              value={filters.buscar}
            />
          </div>
          <div className="flex flex-col place-content-between">
            <Label htmlFor="area_interes_id">Filtrar por área de interés</Label>
            <Select
              id="area_interes_id"
              name="area_interes_id"
              onChange={handleChangeFilters}
              value={filters.area_interes_id}
            >
              <option value="">Todos</option>
              {areasInteresActivas?.length
                ? areasInteresActivas?.map(
                    (area, i) =>
                      area.activo && (
                        <option
                          key={i}
                          name={area.nombre}
                          value={area.area_interes_id}
                        >
                          {area.nombre}
                        </option>
                      )
                  )
                : null}
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
                        id="nombre"
                        name="nombre"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Nombre de la vacante
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
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="area_interes_id"
                        name="area_interes_id"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Área de interés
                        <img
                          name="area_interes_id"
                          src={
                            filters.orden_campo === "area_interes_id" &&
                            filters.orden_por === "ASC"
                              ? "./SortAZ.svg"
                              : filters.orden_campo === "area_interes_id" &&
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
                    <div className="flex items-center">Ubicación</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Postulado</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Estado Postulación</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="updatedAt"
                        name="updatedAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Última actualización
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
              {postulaciones.postulaciones &&
                postulaciones.postulaciones.length > 0 && (
                  <tbody>
                    {postulaciones.postulaciones.map((postulacion, i) => (
                      <tr
                        key={i}
                        className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="p-4">{postulacion.Vacante.nombre}</td>
                        <td className="p-4">
                          {postulacion.Vacante.Areas_Intere.nombre}
                        </td>
                        <td className="p-4">{postulacion.Vacante.ubicacion}</td>
                        <td className="p-4">
                          {DDMMYYYYHHMM2(postulacion.createdAt)}
                        </td>
                        <td className="p-4">{postulacion.estado_solicitud}</td>
                        <td className="p-4">
                          {DDMMYYYYHHMM2(postulacion.updatedAt)}
                        </td>
                        <td className="p-4 flex gap-2">
                          <Button
                            className="m-0 w-auto text-xs"
                            // onClick={() =>
                            //   handleVerDetalles(postulacion.movimiento_id)
                            // }
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
              postulaciones.totalRegistros
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
                postulaciones.cantidadPaginas
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
                  paginaActual >= postulaciones.cantidadPaginas
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
                  <Span className="font-bold">
                    {`${postulacionDetail?.postulacionDetail?.Empleado?.Empresa?.nombre} (${postulacionDetail?.postulacionDetail?.Empleado?.Empresa?.Sedes[0]?.nombre})`}
                  </Span>
                  <Span>
                    {`${postulacionDetail?.postulacionDetail?.Empleado?.nombres} ${postulacionDetail?.postulacionDetail?.Empleado?.apellidos}`}
                  </Span>
                  <Span>
                    {`${postulacionDetail?.postulacionDetail?.Empleado?.tipo_identificacion}-${postulacionDetail?.postulacionDetail?.Empleado?.numero_identificacion}`}
                  </Span>
                </div>

                <div className="flex gap-2 items-center">
                  {postulacionDetail?.postulacionDetail?.estado_solicitud ===
                    "Pendiente por revisar" ||
                  postulacionDetail?.postulacionDetail?.estado_solicitud ===
                    "Revisado" ? (
                    <>
                      <Button
                        className="m-0 w-auto text-xs bg-green-600 hover:bg-green-600/[.5]"
                        onClick={() =>
                          handleAprobarMovimiento(
                            postulacionDetail.postulacionDetail.movimiento_id
                          )
                        }
                      >
                        Aprobar
                      </Button>
                      <Button
                        className="m-0 w-auto text-xs bg-red-600 hover:bg-red-600/[.5]"
                        onClick={() =>
                          handleDenegarMovimiento(
                            postulacionDetail.postulacionDetail.movimiento_id
                          )
                        }
                      >
                        Denegar
                      </Button>
                    </>
                  ) : (
                    <Span className="m-0">
                      <b>Estado Solicitud: </b>
                      {postulacionDetail?.postulacionDetail?.estado_solicitud}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span>
                    <b>Código de nómina: </b>
                    {postulacionDetail?.movimientoAnterior?.codigo_nomina}
                  </Span>
                  <Span>
                    <b>Cargo actual: </b>
                    {postulacionDetail?.postulacionDetail?.Cargo_Actual
                      ?.Cargos_Nivele?.Cargo?.descripcion &&
                      `${postulacionDetail?.postulacionDetail?.Cargo_Actual?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.Cargo_Actual?.Cargos_Nivele?.nivel})`}
                  </Span>
                  <Span>
                    <b>Unidad organizativa de adscripción: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Cargo_Actual
                        ?.Cargos_Nivele?.Cargo?.Departamento?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Fecha de ingreso: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Cargo_Actual
                        ?.fecha_ingreso
                    }
                  </Span>
                  <Span>
                    <b>Antiguedad: </b>
                    {postulacionDetail?.postulacionDetail?.Cargo_Actual
                      ?.fecha_ingreso &&
                      `${calcularAntiguedad(
                        postulacionDetail?.postulacionDetail?.Cargo_Actual
                          ?.fecha_ingreso
                      )} días`}
                  </Span>
                  <Span>
                    <b>Sueldo actual: </b>
                    {postulacionDetail?.postulacionDetail?.Cargo_Actual
                      ?.salario &&
                      `Bs. ${postulacionDetail?.postulacionDetail?.Cargo_Actual?.salario}`}
                  </Span>
                  <Span>
                    <b>Tipo de nómina: </b>
                    {postulacionDetail?.movimientoAnterior?.tipo_nomina}
                  </Span>
                  {postulacionDetail?.movimientoAnterior?.tipo_nomina ===
                    "Otro" && (
                    <Span>
                      <b>Otro tipo de nómina: </b>
                      {postulacionDetail?.movimientoAnterior?.otro_tipo_nomina}
                    </Span>
                  )}
                  <Span>
                    <b>Frecuencia de nómina: </b>
                    {postulacionDetail?.movimientoAnterior?.frecuencia_nomina}
                  </Span>
                  {postulacionDetail?.movimientoAnterior?.frecuencia_nomina ===
                    "Otro" && (
                    <Span>
                      <b>Otra frecuencia de nómina: </b>
                      {
                        postulacionDetail?.movimientoAnterior
                          ?.otra_frecuencia_nomina
                      }
                    </Span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span className="mx-auto text-md sm:col-span-2 md:col-span-3">
                    <b>Detalle del Movimiento Organizativo</b>
                  </Span>
                  <Span>
                    <b>Clase de postulacionDetail: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Clases_Movimiento
                        ?.descripcion
                    }
                  </Span>
                  <Span>
                    <b>Duración de postulacionDetail: </b>
                    {postulacionDetail?.postulacionDetail?.duracion_movimiento}
                  </Span>

                  {postulacionDetail?.postulacionDetail?.duracion_movimiento ===
                    "Temporal" && (
                    <Span>
                      <b>Duración de postulacionDetail en días: </b>
                      {
                        postulacionDetail?.postulacionDetail
                          ?.duracion_movimiento_dias
                      }
                    </Span>
                  )}
                  <Span>
                    <b>Requiere periodo de prueba: </b>
                    {postulacionDetail?.postulacionDetail
                      ?.requiere_periodo_prueba
                      ? "Sí"
                      : "No"}
                  </Span>
                  {postulacionDetail?.postulacionDetail
                    ?.requiere_periodo_prueba && (
                    <Span>
                      <b>Duración de periodo de prueba en días: </b>
                      {postulacionDetail?.postulacionDetail
                        ?.duracion_periodo_prueba &&
                        `${postulacionDetail?.postulacionDetail?.duracion_periodo_prueba} días`}
                    </Span>
                  )}
                  <Span className="sm:col-span-2 md:col-span-3">
                    <b>Justificación del postulacionDetail: </b>
                    {
                      postulacionDetail?.postulacionDetail
                        ?.justificacion_movimiento
                    }
                  </Span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b p-4">
                  <Span className="mx-auto text-md sm:col-span-2 md:col-span-3">
                    <b>Nueva Condición Laboral Del Trabajador</b>
                  </Span>
                  <Span>
                    <b>Empresa: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Nuevo_Cargo?.Cargo
                        ?.Departamento?.Empresa?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Departamento: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Nuevo_Cargo?.Cargo
                        ?.Departamento?.nombre
                    }
                  </Span>
                  <Span>
                    <b>Cargo: </b>
                    {
                      postulacionDetail?.postulacionDetail?.Nuevo_Cargo?.Cargo
                        ?.descripcion
                    }
                  </Span>
                  <Span>
                    <b>Nivel del cargo: </b>
                    {postulacionDetail?.postulacionDetail?.Nuevo_Cargo?.nivel}
                  </Span>
                  <Span>
                    <b>Vigencia del postulacionDetail (fecha desde): </b>
                    {
                      postulacionDetail?.postulacionDetail
                        ?.vigencia_movimiento_desde
                    }
                  </Span>
                  <Span>
                    <b>Vigencia del postulacionDetail (fecha hasta): </b>
                    {
                      postulacionDetail?.postulacionDetail
                        ?.vigencia_movimiento_hasta
                    }
                  </Span>
                  <Span>
                    <b>Tipo de nómina: </b>
                    {postulacionDetail?.postulacionDetail?.tipo_nomina}
                  </Span>
                  {postulacionDetail?.postulacionDetail?.tipo_nomina ===
                    "Otro" && (
                    <Span>
                      <b>Otro tipo de nómina: </b>
                      {postulacionDetail?.postulacionDetail?.otro_tipo_nomina}
                    </Span>
                  )}
                  <Span>
                    <b>Frecuencia de nómina: </b>
                    {postulacionDetail?.postulacionDetail?.frecuencia_nomina}
                  </Span>
                  {postulacionDetail?.postulacionDetail?.frecuencia_nomina ===
                    "Otro" && (
                    <Span>
                      <b>Otra frecuencia de nómina: </b>
                      {
                        postulacionDetail?.postulacionDetail
                          ?.otra_frecuencia_nomina
                      }
                    </Span>
                  )}
                  <Span>
                    <b>Nuevo sueldo: </b>
                    {postulacionDetail?.postulacionDetail?.sueldo &&
                      `Bs. ${postulacionDetail?.postulacionDetail?.sueldo}`}
                  </Span>
                  <Span>
                    <b>Código de nómina: </b>
                    {postulacionDetail?.postulacionDetail?.codigo_nomina}
                  </Span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-b p-4 sm:2">
                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Datos Del Solicitante</b>
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.Solicitante
                          ?.nombres
                      }{" "}
                      {
                        postulacionDetail?.postulacionDetail?.Solicitante
                          ?.apellidos
                      }
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.Solicitante
                          ?.tipo_identificacion
                      }
                      {"-"}
                      {
                        postulacionDetail?.postulacionDetail?.Solicitante
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.Solicitante
                        ?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                        ?.descripcion &&
                        `${postulacionDetail?.postulacionDetail?.Solicitante?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.Solicitante?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Supervisor Inmediato</b>
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.Supervisor
                          ?.nombres
                      }{" "}
                      {
                        postulacionDetail?.postulacionDetail?.Supervisor
                          ?.apellidos
                      }
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.Supervisor
                          ?.tipo_identificacion
                      }
                      {"-"}
                      {
                        postulacionDetail?.postulacionDetail?.Supervisor
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.Supervisor
                        ?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                        ?.descripcion &&
                        `${postulacionDetail?.postulacionDetail?.Supervisor?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.Supervisor?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Aprobación Gerencia De Área</b>
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.Gerencia?.nombres}{" "}
                      {""}
                      {
                        postulacionDetail?.postulacionDetail?.Gerencia
                          ?.apellidos
                      }
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.Gerencia
                          ?.tipo_identificacion
                      }
                      {"-"}
                      {
                        postulacionDetail?.postulacionDetail?.Gerencia
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.Gerencia
                        ?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                        ?.descripcion &&
                        `${postulacionDetail?.postulacionDetail?.Gerencia?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.Gerencia?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>

                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Talento Humano</b>
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.TTHH?.nombres} {""}
                      {postulacionDetail?.postulacionDetail?.TTHH?.apellidos}
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.TTHH
                          ?.tipo_identificacion
                      }
                      {"-"}
                      {
                        postulacionDetail?.postulacionDetail?.TTHH
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.TTHH
                        ?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                        ?.descripcion &&
                        `${postulacionDetail?.postulacionDetail?.TTHH?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.TTHH?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>
                  <div className="flex flex-col justify-start items-center text-center">
                    <Span>
                      <b>Revisado por: </b>
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.RevisadoPor
                          ?.nombres
                      }{" "}
                      {
                        postulacionDetail?.postulacionDetail?.RevisadoPor
                          ?.apellidos
                      }
                    </Span>
                    <Span>
                      {
                        postulacionDetail?.postulacionDetail?.RevisadoPor
                          ?.tipo_identificacion
                      }
                      {"-"}
                      {
                        postulacionDetail?.postulacionDetail?.RevisadoPor
                          ?.numero_identificacion
                      }
                    </Span>
                    <Span>
                      {postulacionDetail?.postulacionDetail?.RevisadoPor
                        ?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo
                        ?.descripcion &&
                        `${postulacionDetail?.postulacionDetail?.RevisadoPor?.Cargos_Empleados[0]?.Cargos_Nivele?.Cargo?.descripcion} (${postulacionDetail?.postulacionDetail?.RevisadoPor?.Cargos_Empleados[0]?.Cargos_Nivele?.nivel})`}
                    </Span>
                  </div>
                  {postulacionDetail?.postulacionDetail?.observaciones && (
                    <div className="flex flex-col justify-start items-center text-center sm:col-span-2">
                      <Span>
                        <b>Observaciones: </b>
                        {postulacionDetail?.postulacionDetail?.observaciones}
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
