import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  getPostulacionesEmpleado,
  getPostulacionEmpleado,
} from "../../redux/vacantes/vacantesActions";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

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
    buscar_por: "nombre",
    buscar: "",
    area_interes_id: "",
    estado_solicitud: "",
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
      buscar_por: "nombre",
      buscar: "",
      area_interes_id: "",
      estado_solicitud: "",
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
        buscar_por: "nombre",
        buscar: "",
        area_interes_id: "",
        estado_solicitud: "",
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

  const handleVerDetalles = async (vacante_empleado_id) => {
    const dataPostulacionDetail = await getPostulacionEmpleado(
      token,
      vacante_empleado_id
    );

    setPostulacionDetail(dataPostulacionDetail);

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
          <div className="flex flex-col place-content-between">
            <Label htmlFor="buscar_por">Buscar por</Label>
            <Select
              id="buscar_por"
              name="buscar_por"
              onChange={handleChangeFiltersSelect}
              value={filters.buscar_por}
            >
              <option value="nombre">Nombre de la vacante</option>
              <option value="ubicacion">Ubicación de la vacante</option>
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
            <Label htmlFor="estado_solicitud">Filtrar por estado</Label>
            <Select
              id="estado_solicitud"
              name="estado_solicitud"
              onChange={handleChangeFilters}
              value={filters.estado_solicitud}
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
                    <div className="flex items-center">Área de interés</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">Ubicación</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="createdAt"
                        name="createdAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Postulado
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
                    <div className="flex items-center">Estado Postulación</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      Última actualización
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
                        className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
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
                            onClick={() =>
                              handleVerDetalles(postulacion.vacante_empleado_id)
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
                <div>
                  <Span className="m-0">
                    <b>Nombre de la vacante:</b>{" "}
                    {postulacionDetail?.Vacante?.nombre}
                  </Span>
                </div>

                <div className="flex gap-2 items-center">
                  <Span className="m-0">
                    <b>Estado vacante: </b>
                    {postulacionDetail?.estado_solicitud}
                  </Span>

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
                <div className="grid sm:grid-cols-2 gap-6 border-b p-4">
                  <Span className="m-0">
                    <b>Ubicación: </b>
                    {postulacionDetail?.Vacante?.ubicacion}
                  </Span>
                  <Span className="m-0">
                    <b>Área de interés: </b>
                    {postulacionDetail?.Vacante?.Areas_Intere?.nombre}
                  </Span>
                  <Span className="m-0">
                    <b>Estado: </b>
                    {postulacionDetail?.Vacante?.activo ? "Activa" : "Inactiva"}
                  </Span>
                  <Span className="m-0 break-words">
                    <b>Descripción: </b>
                    {postulacionDetail?.Vacante?.descripcion}
                  </Span>
                  <Span className="m-0">
                    <b>Fecha creación de vacante: </b>
                    {DDMMYYYYHHMM2(postulacionDetail?.Vacante?.createdAt)}
                  </Span>
                  <Span className="m-0">
                    <b>Fecha última modificación de la vacante: </b>
                    {DDMMYYYYHHMM2(postulacionDetail?.Vacante?.updatedAt)}
                  </Span>
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
