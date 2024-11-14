import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getVacanteDetail,
  putCambiarEstadoPostulacion,
} from "../../redux/vacantes/vacantesActions";

import { putCambiarEstado } from "../../redux/curriculos/curriculosActions";

import { Button, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

export function DetalleVacante() {
  const navigate = useNavigate();

  const { vacante_id } = useParams();

  const tableRef = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const empleado = useSelector((state) => state.empleados.empleado);

  const token = useSelector((state) => state.empleados.token);

  const [vacanteDetail, setVacanteDetail] = useState({});

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(2);

  const [filters, setFilters] = useState({
    buscar_por: "numero_identificacion",
    buscar: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
  });

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataVacanteDetail = await getVacanteDetail(
      token,
      vacante_id,
      filters,
      1,
      value
    );

    setVacanteDetail(dataVacanteDetail);
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
      buscar_por: "numero_identificacion",
      buscar: "",
      activo: "",
      orden_campo: "",
      orden_por: "",
    });

    const buscar_por = document.getElementById("buscar_por");
    const buscar = document.getElementById("buscar");
    const activo = document.getElementById("activo");

    buscar_por.selectedIndex = 0;
    buscar.value = "";
    activo.selectedIndex = 0;

    const dataVacanteDetail = await getVacanteDetail(
      token,
      vacante_id,
      {
        buscar_por: "numero_identificacion",
        buscar: "",
        activo: "",
        orden_campo: "",
        orden_por: "",
      },
      paginaActual,
      limitePorPagina
    );

    setVacanteDetail(dataVacanteDetail);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataVacanteDetail = await getVacanteDetail(
      token,
      vacante_id,
      filters,
      1,
      limitePorPagina
    );

    setVacanteDetail(dataVacanteDetail);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Detalles De La Vacante (Admin)";

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

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        paginaActual,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        { ...filters, orden_por: "DESC" },
        paginaActual,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        { ...filters, orden_campo: "", orden_por: "" },
        paginaActual,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        paginaActual,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < vacanteDetail.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVerDetalles = async (
    identificacion,
    nombre,
    empleado_id,
    vacante_empleado_id
  ) => {
    await putCambiarEstado(token, empleado_id, empleado.empleado_id);

    await putCambiarEstadoPostulacion(
      token,
      vacante_empleado_id,
      empleado.empleado_id
    );

    const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${nombre}`;

    window.open(URL_GET_PDF, "_blank");
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataVacanteDetail = await getVacanteDetail(
        token,
        vacante_id,
        filters,
        page,
        limitePorPagina
      );

      setVacanteDetail(dataVacanteDetail);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center gap-1">
        <Title>Detalles de la Vacante</Title>
        <Button className="m-0 w-auto text-xs" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
      <div className="p-4 border rounded-lg shadow-md w-full mt-2">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
          <div>
            <Span className="font-bold">Nombre de la vacante: </Span>
            <Span>{vacanteDetail?.vacante?.nombre}</Span>
          </div>
          <div>
            <Span className="font-bold">Ubicación: </Span>
            <Span>{vacanteDetail?.vacante?.ubicacion}</Span>
          </div>
          <div>
            <Span className="font-bold">Departamento: </Span>
            <Span>{vacanteDetail?.vacante?.departamento}</Span>
          </div>
          <div>
            <Span className="font-bold">Nivel educativo: </Span>
            <Span className="text-justify">
              {vacanteDetail?.vacante?.nivel_educativo}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Años de experiencia: </Span>
            <Span>{vacanteDetail?.vacante?.anos_experiencia}</Span>
          </div>
          <div>
            <Span className="font-bold">Área de interés: </Span>
            <Span>{vacanteDetail?.vacante?.Areas_Intere?.nombre}</Span>
          </div>
          <div className="break-words">
            <Span className="font-bold">Descripción de la vacante: </Span>
            <Span className="text-justify">
              {vacanteDetail?.vacante?.descripcion}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Creado por: </Span>
            <Span>
              {vacanteDetail?.vacante?.CreadoPor?.nombres}{" "}
              {vacanteDetail?.vacante?.CreadoPor?.apellidos} (
              {vacanteDetail?.vacante?.CreadoPor?.tipo_identificacion}-
              {vacanteDetail?.vacante?.CreadoPor?.numero_identificacion})
            </Span>
          </div>
          <div>
            <Span className="font-bold">Fecha de creación: </Span>
            <Span>{DDMMYYYYHHMM2(vacanteDetail?.vacante?.createdAt)}</Span>
          </div>
          <div>
            <Span className="font-bold">Fecha de última modificación: </Span>
            <Span>{DDMMYYYYHHMM2(vacanteDetail?.vacante?.updatedAt)}</Span>
          </div>
          <div>
            <Span className="font-bold">Estado: </Span>
            <Span>
              {vacanteDetail?.vacante?.activo ? "Activo" : "Inactivo"}
            </Span>
          </div>
          <div>
            <Span className="font-bold">Cantidad postulados: </Span>
            <Span>{vacanteDetail?.vacante?.Vacantes_Empleados.length}</Span>
          </div>
        </div>
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
            <option value="numero_identificacion">
              Número de identificación
            </option>
            <option value="apellidos">Apellidos</option>
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
          <table
            id="tabla"
            className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400"
          >
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
                  <div className="flex items-center">Teléfono</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Estado Empleado</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      id="createdAt"
                      name="createdAt"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Fecha postulación
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
                  <div className="flex items-center">Revisado por</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            {vacanteDetail.postulaciones &&
              vacanteDetail.postulaciones.length > 0 && (
                <tbody>
                  {vacanteDetail.postulaciones.map((postulacion, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                    >
                      <td className="p-4">
                        {postulacion.Empleado.apellidos}{" "}
                        {postulacion.Empleado.nombres}
                      </td>
                      <td className="p-4">
                        {postulacion.Empleado.tipo_identificacion}
                        {postulacion.Empleado.numero_identificacion}
                      </td>
                      <td className="p-4">
                        {postulacion.Empleado.telefono ||
                          "Sin registrar / No posee"}
                      </td>
                      <td className="p-4">
                        {postulacion.Empleado.activo ? "Activo" : "Inactivo"}
                      </td>
                      <td className="p-4">
                        {DDMMYYYYHHMM2(postulacion.createdAt)}
                      </td>
                      <td className="p-4">{postulacion.estado_solicitud}</td>
                      <td className="p-4">
                        {postulacion.RevisadoPor && (
                          <>
                            {postulacion.RevisadoPor?.nombres}{" "}
                            {postulacion.RevisadoPor?.apellidos} (
                            {postulacion.RevisadoPor?.tipo_identificacion}-
                            {postulacion.RevisadoPor?.numero_identificacion})
                          </>
                        )}
                      </td>
                      <td className="p-4 flex gap-2">
                        {postulacion.Empleado.Documentos_Empleados[0]
                          ?.nombre ? (
                          <Button
                            className="m-0 w-auto text-xs"
                            onClick={() =>
                              handleVerDetalles(
                                `${postulacion.Empleado.tipo_identificacion}${postulacion.Empleado.numero_identificacion}`,
                                postulacion.Empleado.Documentos_Empleados[0]
                                  .nombre,
                                postulacion.Empleado.empleado_id,
                                postulacion.vacante_empleado_id
                              )
                            }
                          >
                            Ver Perfil
                          </Button>
                        ) : (
                          "Perfil no registrado"
                        )}
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
            vacanteDetail.totalRegistros
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
              vacanteDetail.cantidadPaginas
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
                  paginaActual >= vacanteDetail.cantidadPaginas
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
