import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getAllEmpleados,
  putActivo,
  resetPassword,
} from "../../redux/empleados/empleadosActions";

import { postFichaIngresoPDF } from "../../redux/fichasIngresos/fichasIngresosActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYY } from "../../utils/formatearFecha";

import Swal from "sweetalert2";

export default function Empleados() {
  const tableRef = useRef(null);

  const navigate = useNavigate();

  const URL_SERVER = import.meta.env.VITE_URL_SERVER;

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [empleados, setEmpleados] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [filters, setFilters] = useState({
    numero_identificacion: "",
    apellidos: "",
    activo: "",
    orden_campo: "",
    orden_por: "",
    empresa_id: empleado.empresa_id,
  });

  const handleChangePagination = async (e) => {
    const { value } = e.target;

    setLimitePorPagina(value);

    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataEmpleados = await getAllEmpleados(token, filters, 1, value);

    setEmpleados(dataEmpleados);
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

  const handleResetFilters = async () => {
    setFilters({
      numero_identificacion: "",
      apellidos: "",
      activo: "",
      orden_campo: "",
      orden_por: "",
      empresa_id: empleado.empresa_id,
    });

    const buscarPor = document.getElementById("buscar_por");
    const inputSearch = document.getElementById("input_search");
    const activo = document.getElementById("activo");

    buscarPor.selectedIndex = 0;
    inputSearch.value = "";
    activo.selectedIndex = 0;

    const dataEmpleados = await getAllEmpleados(
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

    setEmpleados(dataEmpleados);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataEmpleados = await getAllEmpleados(
      token,
      filters,
      1,
      limitePorPagina
    );

    setEmpleados(dataEmpleados);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    document.title = "Grupo Lamar - Empleados (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  const handleVerFicha = async (empleado_id, identificacion) => {
    const response = await postFichaIngresoPDF(
      token,
      empleado_id,
      identificacion
    );

    Swal.fire({
      text: `Ficha de ingreso del empleado ${identificacion} generada ¿Deseas abrirla?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const URL_GET_PDF = `${URL_SERVER}/documentos_empleados/documento/${identificacion}/${response.data}`;
        window.open(URL_GET_PDF, "_blank");
      }
    });
  };

  const handleVerDetalles = async (empleado_id) => {
    navigate(`/admin/empleados/${empleado_id}`);
  };

  const changeOrder = async (e) => {
    const { name } = e.target;

    if (!filters.orden_campo) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_por: "DESC",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataEmpleados = await getAllEmpleados(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < empleados.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChangeActivo = (empleado_id) => {
    Swal.fire({
      text: "¿Seguro que desea activar / desactivar el empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putActivo(token, empleado_id);

        const dataEmpleados = await getAllEmpleados(
          token,
          filters,
          paginaActual,
          limitePorPagina
        );

        setEmpleados(dataEmpleados);
      }
    });
  };

  const handleReiniciarClave = (empleado_id) => {
    Swal.fire({
      text: "¿Seguro que desea reiniciar la clave del empleado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await resetPassword(token, empleado_id);
      }
    });
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataEmpleados = await getAllEmpleados(
        token,
        filters,
        page,
        limitePorPagina
      );

      setEmpleados(dataEmpleados);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Empleados</Title>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5 w-full">
        <div className="flex flex-col place-content-between">
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
        <div className="flex w-full items-end">
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

            {empleados.empleados && empleados.empleados.length > 0 && (
              <tbody>
                {empleados.empleados.map((empleado, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
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
                    <td className="p-4">{DDMMYYYY(empleado.updatedAt)}</td>
                    <td className="p-4 flex gap-2">
                      {empleado.Fichas_Ingresos[0]?.ficha_ingreso_id && (
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() =>
                            handleVerFicha(
                              empleado.empleado_id,
                              `${empleado.tipo_identificacion}${empleado.numero_identificacion}`
                            )
                          }
                        >
                          Ver Ficha
                        </Button>
                      )}

                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() => handleVerDetalles(empleado.empleado_id)}
                      >
                        Detalles
                      </Button>
                      <Button
                        className="m-0 w-auto text-xs bg-yellow-400 hover:bg-yellow-500"
                        onClick={() =>
                          handleReiniciarClave(empleado.empleado_id)
                        }
                      >
                        Reiniciar Clave
                      </Button>
                      <Button
                        className={`m-0 w-auto text-xs ${
                          empleado.activo
                            ? "bg-red-500 hover:bg-red-600 "
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={() => handleChangeActivo(empleado.empleado_id)}
                      >
                        {empleado.activo ? "Inactivar" : "Activar"}
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
            empleados.totalRegistros
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
              empleados.cantidadPaginas
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
                  paginaActual >= empleados.cantidadPaginas
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
