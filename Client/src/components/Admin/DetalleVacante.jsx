import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getVacanteDetail,
  postPaginaActualDetail,
  postLimitePorPaginaDetail,
  postFiltrosDetail,
  deleteFiltrosDetail,
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

  const dispatch = useDispatch();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const empleado = useSelector((state) => state.empleados.empleado);

  const token = useSelector((state) => state.empleados.token);

  const vacanteDetail = useSelector((state) => state.vacantes.vacanteDetail);

  const paginaActual = useSelector(
    (state) => state.vacantes.paginaActualDetail
  );

  const limitePorPagina = useSelector(
    (state) => state.vacantes.limitePorPaginaDetail
  );

  const filtros = useSelector((state) => state.vacantes.filtrosDetail);

  const [filters, setFilters] = useState({
    buscar_por: filtros.buscar_por || "numero_identificacion",
    buscar: filtros.buscar || "",
    activo: filtros.activo || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
  });

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPaginaDetail(value));

    if (paginaActual !== 1) {
      dispatch(postPaginaActualDetail(1));
    }
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });
  };

  const handleChangeFiltersSelect = (e) => {
    const { value } = e.target;

    setFilters({ ...filters, ["buscar_por"]: value });
  };

  const handleResetFilters = () => {
    setFilters({
      buscar_por: "numero_identificacion",
      buscar: "",
      activo: "",
      orden_campo: "",
      orden_por: "",
    });

    const buscar_por = document.getElementById("buscar_por");
    const buscar = document.getElementById("buscar");

    buscar_por.selectedIndex = 0;
    buscar.value = "";

    dispatch(deleteFiltrosDetail());
  };

  const handleFind = () => {
    dispatch(postPaginaActualDetail(1)).then(() => {
      dispatch(postFiltrosDetail(filters));
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Detalles De La Vacante (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(
      getVacanteDetail(
        token,
        vacante_id,
        filtros,
        paginaActual,
        limitePorPagina
      )
    );
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
        postFiltrosDetail({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      return dispatch(postFiltrosDetail({ ...filters, orden_por: "DESC" }));
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      return dispatch(
        postFiltrosDetail({ ...filters, orden_campo: "", orden_por: "" })
      );
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      return dispatch(
        postFiltrosDetail({ ...filters, orden_campo: name, orden_por: "ASC" })
      );
    }
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      dispatch(postPaginaActualDetail(paginaActual - 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < vacanteDetail.cantidadPaginas) {
      dispatch(postPaginaActualDetail(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const handleVerDetalles = async (identificacion, nombre, empleado_id) => {
    await putCambiarEstado(token, empleado_id, empleado.empleado_id).then(
      () => {
        const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${nombre}`;

        window.open(URL_GET_PDF, "_blank");
      }
    );
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
          <div>
            <Span className="font-bold">Descripción de la vacante: </Span>
            <Span>{vacanteDetail?.vacante?.descripcion}</Span>
          </div>
          <div>
            <Span className="font-bold">Área de interés: </Span>
            <Span>{vacanteDetail?.vacante?.Areas_Intere?.nombre}</Span>
          </div>
          <div>
            <Span className="font-bold">Fecha de creación: </Span>
            <Span>{DDMMYYYYHHMM2(vacanteDetail?.vacante?.createdAt)}</Span>
          </div>
          <div>
            <Span className="font-bold">Creado por: </Span>
            <Span>
              {vacanteDetail.vacante.CreadoPor.nombres}{" "}
              {vacanteDetail.vacante.CreadoPor.apellidos} (
              {vacanteDetail.vacante.CreadoPor.tipo_identificacion}-
              {vacanteDetail.vacante.CreadoPor.numero_identificacion})
            </Span>
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
            <Span className="font-bold">Cantidad Postulados: </Span>
            <Span>{vacanteDetail?.totalRegistros}</Span>
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
                  <div className="flex items-center">Correo</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      name="activo"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Estado
                      <img
                        name="activo"
                        src={
                          filters.orden_campo === "activo" &&
                          filters.orden_por === "ASC"
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "activo" &&
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
                    </span>
                  </div>
                </th>

                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!vacanteDetail.empleados?.length ? (
                <tr>
                  <td colSpan="9" className="text-center p-2">
                    <p>¡No existen registros!</p>
                  </td>
                </tr>
              ) : (
                vacanteDetail.empleados?.map((empleado, i) => (
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
                      {empleado.telefono || "Sin registrar / No posee"}
                    </td>
                    <td className="p-4">
                      {empleado.correo || "Sin registrar / No posee"}
                    </td>
                    <td className="p-4">
                      {empleado.activo ? "Activo" : "Inactivo"}
                    </td>
                    <td className="p-4">{DDMMYYYYHHMM2(empleado.updatedAt)}</td>
                    <td className="p-4 flex gap-2">
                      {empleado.Documentos_Empleados[0]?.nombre ? (
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() =>
                            handleVerDetalles(
                              `${empleado.tipo_identificacion}${empleado.numero_identificacion}`,
                              empleado.Documentos_Empleados[0].nombre,
                              empleado.empleado_id
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
                ))
              )}
            </tbody>
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
              vacanteDetail.cantidadPaginas
            ).map((page) => (
              <li key={page}>
                <span
                  onClick={() =>
                    dispatch(postPaginaActualDetail(page)).then(() => {
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
