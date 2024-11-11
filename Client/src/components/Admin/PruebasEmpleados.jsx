import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getAllPruebasEmpleados } from "../../redux/pruebasEmpleados/pruebasEmpleadosActions";

import { Button, Date, Input, Label, Select, Span, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import validations from "../../utils/validacionesPruebasEmpleados";

import { DDMMYYYY } from "../../utils/formatearFecha";

export function PruebasEmpleados() {
  const tableRef = useRef(null);

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [pruebasEmpleados, setPruebasEmpleados] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(2);

  const [errors, setErrors] = useState({});

  const [filters, setFilters] = useState({
    numero_identificacion: "",
    apellidos: "",
    prueba: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: empleado.empresa_id,
    fecha_desde: "",
    fecha_hasta: "",
  });

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataPruebasEmpleados = await getAllPruebasEmpleados(
      token,
      filters,
      1,
      value
    );

    setPruebasEmpleados(dataPruebasEmpleados);
  };

  const handleChangeFilters = (e) => {
    const { name, value } = e.target;

    setFilters({ ...filters, [name]: value });

    setErrors(validations({ ...filters, [name]: value }));
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
      prueba: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
      fecha_desde: "",
      fecha_hasta: "",
    });

    setErrors(
      validations({
        numero_identificacion: "",
        apellidos: "",
        prueba: "",
        orden_campo: "",
        orden_por: "",
        empresa_id: empleado.empresa_id,
        fecha_desde: "",
        fecha_hasta: "",
      })
    );

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");
    const fecha_desde = document.getElementById("fecha_desde");
    const fecha_hasta = document.getElementById("fecha_hasta");

    buscarPor.selectedIndex = 0;
    inputSearch.value = null;
    fecha_desde.value = null;
    fecha_hasta.value = null;

    const dataPruebasEmpleados = await getAllPruebasEmpleados(
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

    setPruebasEmpleados(dataPruebasEmpleados);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataPruebasEmpleados = await getAllPruebasEmpleados(
      token,
      filters,
      1,
      limitePorPagina
    );

    setPruebasEmpleados(dataPruebasEmpleados);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Pruebas Empleados (Admin)";

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

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        {
          ...filters,
          orden_campo: name,
          orden_por: "ASC",
        },
        1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        {
          ...filters,
          orden_por: "DESC",
        },
        1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        {
          ...filters,
          orden_campo: "",
          orden_por: "",
        },
        1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        {
          ...filters,
          orden_campo: name,
          orden_por: "ASC",
        },
        1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < pruebasEmpleados.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVerResultados = (identificacion, prueba_nombre) => {
    const URL_GET_RESULTADOS = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${prueba_nombre}`;

    window.open(URL_GET_RESULTADOS, "_blank");
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataPruebasEmpleados = await getAllPruebasEmpleados(
        token,
        filters,
        page,
        limitePorPagina
      );

      setPruebasEmpleados(dataPruebasEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Pruebas de Empleados</Title>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 w-full">
        <div>
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
        <div className="flex items-end">
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
        <div>
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
        <div>
          <Label htmlFor="fecha_desde" errors={errors.fechas}>
            Fecha desde
          </Label>
          <Date
            id="fecha_desde"
            type="datetime-local"
            name="fecha_desde"
            onChange={handleChangeFilters}
            errors={errors.fechas}
          />
        </div>
        <div>
          <Label htmlFor="fecha_hasta" errors={errors.fechas}>
            Fecha hasta
          </Label>
          <Date
            id="fecha_hasta"
            type="datetime-local"
            name="fecha_hasta"
            onChange={handleChangeFilters}
            errors={errors.fechas}
          />
          {errors.fechas && <Span className="m-0">{errors.fechas}</Span>}
        </div>
        <div>
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
          className="flex justify-center sm:col-span-2 md:col-span-3 gap-2"
        >
          <div
            className={`${Object.keys(errors).length && "opacity-50"}`}
            disabled={Object.keys(errors).length}
          >
            <Button className="m-0 w-auto" onClick={handleFind}>
              Buscar
            </Button>
          </div>

          <Button className="m-0 w-auto" onClick={handleResetFilters}>
            Restablecer Filtros
          </Button>
        </div>
      </div>
      <div className="mt-6 sm:mx-auto w-full">
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
                  <div className="flex items-center">
                    <span
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
                            ? "./SortAZ.svg"
                            : filters.orden_campo === "prueba" &&
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
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            {pruebasEmpleados.pruebasEmpleados &&
              pruebasEmpleados.pruebasEmpleados.length > 0 && (
                <tbody>
                  {pruebasEmpleados.pruebasEmpleados.map((prueba, i) => (
                    <tr
                      key={i}
                      className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                    >
                      <td className="p-4">
                        {prueba.Empleado.apellidos} {prueba.Empleado.nombres}
                      </td>
                      <td className="p-4">
                        {prueba.Empleado.tipo_identificacion}
                        {prueba.Empleado.numero_identificacion}
                      </td>
                      <td className="p-4">
                        {prueba.Empleado.telefono || "Sin registrar"}
                      </td>
                      <td className="p-4">
                        {prueba.Empleado.correo || "Sin registrar"}
                      </td>
                      <td className="p-4">{prueba.prueba}</td>
                      <td className="p-4">{DDMMYYYY(prueba.createdAt)}</td>
                      <td className="p-4 flex gap-2 items-center">
                        <Button
                          className="m-0 w-auto"
                          onClick={() =>
                            handleVerResultados(
                              `${prueba.Empleado.tipo_identificacion}${prueba.Empleado.numero_identificacion}`,
                              prueba.nombre
                            )
                          }
                        >
                          Ver resultados
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
            pruebasEmpleados.totalRegistros
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
              pruebasEmpleados.cantidadPaginas
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
                    paginaActual >= pruebasEmpleados.cantidadPaginas
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
