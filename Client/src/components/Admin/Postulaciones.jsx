import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllCurriculos,
  getCurriculoPDFAnexos,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  putCambiarEstado,
  deleteFiltros,
} from "../../redux/curriculos/curriculosActions";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";
import { getAllIdiomasActivos } from "../../redux/idiomas/idiomasActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

export function Postulaciones() {
  const tableRef = useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.empleados.token);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const empleado = useSelector((state) => state.empleados.empleado);

  const curriculos = useSelector((state) => state.curriculos.curriculos);

  const paginaActual = useSelector((state) => state.curriculos.paginaActual);

  const limitePorPagina = useSelector(
    (state) => state.curriculos.limitePorPagina
  );

  const filtros = useSelector((state) => state.curriculos.filtros);

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const idiomas_activos = useSelector((state) => state.idiomas.idiomas_activos);

  const [filters, setFilters] = useState({
    numero_identificacion: filtros.numero_identificacion || "",
    apellidos: filtros.apellidos || "",
    area_interes_id: filtros.area_interes_id || "",
    estado: filtros.estado || "",
    idioma_id: filtros.idioma_id || "",
    orden_campo: filtros.orden_campo || "",
    orden_por: filtros.orden_por || "",
    empresa_id: empleado.empresa_id,
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

  const handleResetFilters = () => {
    setFilters({
      numero_identificacion: "",
      apellidos: "",
      area_interes_id: "",
      estado: "",
      idioma_id: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
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

    dispatch(getAllAreasInteresActivas(token));

    dispatch(getAllIdiomasActivos(token));

    handleFind();

    document.title = "Grupo Lamar - Postulaciones (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    dispatch(getAllCurriculos(token, filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  const handleVerDetalles = async (identificacion, nombre, empleado_id) => {
    await putCambiarEstado(token, empleado_id, empleado.empleado_id).then(
      () => {
        const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${nombre}`;

        window.open(URL_GET_PDF, "_blank");
      }
    );
  };

  const handleVerDetallesAnexos = (empleado_id, identificacion) => {
    dispatch(getCurriculoPDFAnexos(token, empleado_id, identificacion))
      .then(() => {
        const URL_GET_PDF_ANEXOS = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/Anexos ${identificacion}.zip`;

        window.open(URL_GET_PDF_ANEXOS, "_blank");
      })
      .catch((error) => {
        return error;
      });
  };

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
    if (paginaActual < curriculos.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1)).then(() => {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Postulaciones</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            onChange={handleChangeFiltersSelect}
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
        <div className="flex flex-col place-content-between">
          <Label htmlFor="area_interes_id">Filtrar por área de interés</Label>
          <Select
            id="area_interes_id"
            name="area_interes_id"
            onChange={handleChangeFilters}
            value={filters.area_interes_id}
          >
            <option value="">Todos</option>
            {areas_interes_activas?.length
              ? areas_interes_activas?.map(
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
          <Label htmlFor="idioma_id">Filtrar por idiomas</Label>
          <Select
            id="idioma_id"
            name="idioma_id"
            onChange={handleChangeFilters}
            value={filters.idioma_id}
          >
            <option value="">Todos</option>
            {idiomas_activos?.length
              ? idiomas_activos?.map(
                  (idioma, i) =>
                    idioma.activo && (
                      <option
                        key={i}
                        name={idioma.nombre}
                        value={idioma.idioma_id}
                      >
                        {idioma.nombre}
                      </option>
                    )
                )
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
            <option value="Pendiente por revisar">Pendiente por revisar</option>
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
                      Nombre Completos
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
                    Número de identificación
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Teléfono</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Correo</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Áreas de Interés</div>
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
                  <div className="flex items-center">Estado</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Revisado Por</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {curriculos === "No existen curriculos" ||
              !curriculos.curriculos?.length ? (
                <tr>
                  <td colSpan="9" className="text-center p-2">
                    <p>¡No existen registros!</p>
                  </td>
                </tr>
              ) : (
                curriculos.curriculos?.map((curriculo, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="p-4">
                      {curriculo.Empleado.apellidos}{" "}
                      {curriculo.Empleado.nombres}
                    </td>
                    <td className="p-4">
                      {curriculo.Empleado.tipo_identificacion}
                      {curriculo.Empleado.numero_identificacion}
                    </td>
                    <td className="p-4">
                      {curriculo.Empleado.telefono ||
                        "Sin registrar / No posee"}
                    </td>
                    <td className="p-4">
                      {curriculo.Empleado.correo || "Sin registrar / No posee"}
                    </td>
                    <td className="p-4">
                      {curriculo.Areas_Interes?.map(
                        (area, index) =>
                          `${area.nombre}${
                            index !== curriculo.Areas_Interes.length - 1
                              ? ", "
                              : ""
                          }`
                      )}
                    </td>
                    <td className="p-4">
                      {DDMMYYYY(curriculo.updatedAt)}
                    </td>
                    <td className="p-4">
                      {curriculo.revisado_por_id
                        ? "Revisado"
                        : "Pendiente por revisar"}
                    </td>
                    <td className="p-4">
                      {curriculo.revisado_por_id
                        ? `${curriculo.RevisadoPor.nombres} ${curriculo.RevisadoPor.apellidos} (${curriculo.RevisadoPor.tipo_identificacion}-${curriculo.RevisadoPor.numero_identificacion})`
                        : "Pendiente por revisar"}
                    </td>
                    <td className="p-4 flex gap-2 items-center">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleVerDetalles(
                            `${curriculo.Empleado.tipo_identificacion}${curriculo.Empleado.numero_identificacion}`,
                            curriculo.Empleado.Documentos_Empleados[0].nombre,
                            curriculo.Empleado.empleado_id
                          )
                        }
                      >
                        PDF
                      </Button>
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleVerDetallesAnexos(
                            curriculo.Empleado.empleado_id,
                            `${curriculo.Empleado.tipo_identificacion}${curriculo.Empleado.numero_identificacion}`
                          )
                        }
                      >
                        Anexos
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
            curriculos.totalRegistros
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
              curriculos.cantidadPaginas
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
                  paginaActual >= curriculos.cantidadPaginas
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
