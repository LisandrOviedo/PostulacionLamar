import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllPruebasEmpleados,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
} from "../../redux/pruebasEmpleados/pruebasEmpleadosActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

export function PruebasEmpleados() {
  const dispatch = useDispatch();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const pruebas_empleados = useSelector(
    (state) => state.pruebas_empleados.pruebas_empleados
  );

  const paginaActual = useSelector(
    (state) => state.pruebas_empleados.paginaActual
  );

  const limitePorPagina = useSelector(
    (state) => state.pruebas_empleados.limitePorPagina
  );

  const filtros = useSelector((state) => state.pruebas_empleados.filtros);

  const [filters, setFilters] = useState({
    cedula: filtros.cedula || "",
    apellidos: filtros.apellidos || "",
    prueba: filtros.prueba || "",
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

        if (value === "cedula") {
          updatedFilters.apellidos = "";
        } else if (value === "apellidos") {
          updatedFilters.cedula = "";
        }

        return { ...updatedFilters, [value]: valueBuscarPor };
      });
    }
  };

  const handleResetFilters = () => {
    dispatch(deleteFiltros()).then(function () {
      window.location.reload();
    });
  };

  const handleFind = () => {
    dispatch(postPaginaActual(1)).then(() => {
      dispatch(postFiltros(filters));
    });
  };

  useEffect(() => {
    window.scroll(0, 0);

    document.title = "Grupo Lamar - Pruebas Empleados (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(
      getAllPruebasEmpleados(token, filtros, paginaActual, limitePorPagina)
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
      dispatch(postPaginaActual(paginaActual - 1));
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < pruebas_empleados.cantidadPaginas) {
      dispatch(postPaginaActual(paginaActual + 1));
    }
  };

  const handleVerResultados = (cedula, prueba_nombre) => {
    const URL_GET_RESULTADOS = `${URL_SERVER}/documentos_empleados/documento/${cedula}/${prueba_nombre}`;

    window.open(URL_GET_RESULTADOS, "_blank");
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Pruebas de Empleados</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
          <Label htmlFor="buscar_por">Buscar por</Label>
          <Select
            id="buscar_por"
            name="buscar_por"
            onChange={handleChangeFiltersSelect}
            defaultValue={filtros.apellidos ? "apellidos" : "cedula"}
          >
            <option value="cedula">Número de cédula</option>
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
                : filtros.cedula
                ? `${filtros.cedula}`
                : ""
            }
          />
        </div>
        <div className="flex flex-col place-content-between">
          <Label htmlFor="prueba">Filtrar por prueba</Label>
          <Select
            id="prueba"
            name="prueba"
            onChange={handleChangeFilters}
            value={filters.prueba}
          >
            <option value="">Todos</option>
            <option value="Kostick">Kostick</option>
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
        <div className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start gap-2">
          <a href="#tabla">
            <Button className="m-0 w-auto" onClick={handleFind}>
              Buscar
            </Button>
          </a>
          <a href="#tabla">
            <Button className="m-0 w-auto" onClick={handleResetFilters}>
              Restablecer Filtros
            </Button>
          </a>
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
                    <a
                      href="#tabla"
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
                            ? "/SortAZ.svg"
                            : filters.orden_campo === "apellidos" &&
                              filters.orden_por === "DESC"
                            ? "/SortZA.svg"
                            : "/Sort.svg"
                        }
                        alt="Icon Sort"
                        className="w-5 h-5 ms-1.5 cursor-pointer"
                      />
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Cédula</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Teléfono</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Correo</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <a
                      href="#tabla"
                      id="prueba"
                      name="prueba"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Prueba
                      <img
                        name="prueba"
                        src={
                          filters.orden_campo === "prueba" &&
                          filters.orden_por === "ASC"
                            ? "/SortAZ.svg"
                            : filters.orden_campo === "prueba" &&
                              filters.orden_por === "DESC"
                            ? "/SortZA.svg"
                            : "/Sort.svg"
                        }
                        alt="Icon Sort"
                        className="w-5 h-5 ms-1.5 cursor-pointer"
                      />
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <a
                      href="#tabla"
                      id="createdAt"
                      name="createdAt"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Fecha Aplicación
                      <img
                        name="createdAt"
                        src={
                          filters.orden_campo === "createdAt" &&
                          filters.orden_por === "ASC"
                            ? "/SortAZ.svg"
                            : filters.orden_campo === "createdAt" &&
                              filters.orden_por === "DESC"
                            ? "/SortZA.svg"
                            : "/Sort.svg"
                        }
                        alt="Icon Sort"
                        className="w-5 h-5 ms-1.5 cursor-pointer"
                      />
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {pruebas_empleados === "No existen respuestas de empleados" ||
              !pruebas_empleados.pruebas_empleados?.length ? (
                <tr>
                  <td colSpan="9" className="text-center p-2">
                    <p>¡No existen registros!</p>
                  </td>
                </tr>
              ) : (
                pruebas_empleados.pruebas_empleados?.map((prueba, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-4">
                      {prueba.Empleado.apellidos} {prueba.Empleado.nombres}
                    </td>
                    <td className="px-4 py-4">{prueba.Empleado.cedula}</td>
                    <td className="px-4 py-4">
                      {prueba.Empleado.telefono || "Sin registrar"}
                    </td>
                    <td className="px-4 py-4">
                      {prueba.Empleado.correo || "Sin registrar"}
                    </td>
                    <td className="px-4 py-4">{prueba.prueba}</td>
                    <td className="px-4 py-4">{DDMMYYYY(prueba.createdAt)}</td>
                    <td className="px-4 py-4 flex gap-2 items-center">
                      <Button
                        className="m-0 w-auto"
                        onClick={() =>
                          handleVerResultados(
                            prueba.Empleado.cedula,
                            prueba.nombre
                          )
                        }
                      >
                        Ver resultados
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
            pruebas_empleados.totalRegistros
          )}
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#tabla"
                onClick={paginaAnterior}
                className={`flex items-center hover:text-gray-500 justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                ${
                  paginaActual <= 1
                    ? "cursor-default"
                    : "cursor-pointer hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Pág. Anterior
              </a>
            </li>
            {calcularPaginasARenderizar(
              paginaActual,
              pruebas_empleados.cantidadPaginas
            ).map((page) => (
              <li key={page}>
                <a
                  href="#tabla"
                  onClick={() => dispatch(postPaginaActual(page))}
                  className={`cursor-pointer text-black flex items-center justify-center px-3 h-8 border border-gray-300 hover:bg-blue-100 hover:text-black dark:border-gray-700 dark:bg-gray-700 dark:text-white ${
                    page === paginaActual
                      ? "font-semibold text-blue-600 hover:text-blue-600 bg-blue-50"
                      : ""
                  }`}
                >
                  {page}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#tabla"
                onClick={paginaSiguiente}
                className={`flex items-center hover:text-gray-500 justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                ${
                  paginaActual >= pruebas_empleados.cantidadPaginas
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Pág. Siguiente
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}