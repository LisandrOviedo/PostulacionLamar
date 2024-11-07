import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllVacantes } from "../../redux/vacantes/vacantesActions";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";

import { Button, Input, Label, Select, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

export function Vacantes() {
  const navigate = useNavigate();

  const tableRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const [vacantes, setVacantes] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(2);

  const [areasInteresActivas, setAreasInteresActivas] = useState([]);

  const [filters, setFilters] = useState({
    buscar_por: "nombre",
    buscar: "",
    area_interes_id: "",
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

    const dataVacanteDetail = await getAllVacantes(token, filters, 1, value);

    setVacantes(dataVacanteDetail);
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

    const dataVacantes = await getAllVacantes(
      token,
      {
        buscar_por: "nombre",
        buscar: "",
        area_interes_id: "",
        activo: "",
        orden_campo: "",
        orden_por: "",
      },
      1,
      limitePorPagina
    );

    setVacantes(dataVacantes);
  };

  const handleFind = async () => {
    if (paginaActual !== 1) {
      setPaginaActual(1);
    }

    const dataVacantes = await getAllVacantes(
      token,
      filters,
      1,
      limitePorPagina
    );

    setVacantes(dataVacantes);
  };

  useEffect(() => {
    window.scroll(0, 0);

    handleFind();

    (async function () {
      const dataAreasInteresActivas = await getAllAreasInteresActivas(token);

      setAreasInteresActivas(dataAreasInteresActivas);
    })();

    document.title = "Grupo Lamar - Vacantes (Admin)";

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

      const dataVacantes = await getAllVacantes(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setVacantes(dataVacantes);
    } else if (filters.orden_campo === name && filters.orden_por === "ASC") {
      setFilters((prevFilters) => ({ ...prevFilters, orden_por: "DESC" }));

      const dataVacantes = await getAllVacantes(
        token,
        { ...filters, orden_por: "DESC" },
        1,
        limitePorPagina
      );

      setVacantes(dataVacantes);
    } else if (filters.orden_campo === name && filters.orden_por === "DESC") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: "",
        orden_por: "",
      }));

      const dataVacantes = await getAllVacantes(
        token,
        { ...filters, orden_campo: "", orden_por: "" },
        1,
        limitePorPagina
      );

      setVacantes(dataVacantes);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        orden_campo: name,
        orden_por: "ASC",
      }));

      const dataVacantes = await getAllVacantes(
        token,
        { ...filters, orden_campo: name, orden_por: "ASC" },
        1,
        limitePorPagina
      );

      setVacantes(dataVacantes);
    }
  };

  const paginaAnterior = async () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);

      const dataVacantes = await getAllVacantes(
        token,
        filters,
        paginaActual - 1,
        limitePorPagina
      );

      setVacantes(dataVacantes);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginaSiguiente = async () => {
    if (paginaActual < vacantes.cantidadPaginas) {
      setPaginaActual(paginaActual + 1);

      const dataVacantes = await getAllVacantes(
        token,
        filters,
        paginaActual + 1,
        limitePorPagina
      );

      setVacantes(dataVacantes);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVerDetalles = (vacante_id) => {
    navigate(`/admin/vacantes/${vacante_id}`);
  };

  const handleChangePage = async (page) => {
    if (paginaActual !== page) {
      setPaginaActual(page);

      const dataVacantes = await getAllVacantes(
        token,
        filters,
        page,
        limitePorPagina
      );

      setVacantes(dataVacantes);

      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Title>Vacantes</Title>
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
            <option value="nombre">Nombre de la vacante</option>
            <option value="ubicacion">Ubicación</option>
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
                      id="nombre"
                      name="nombre"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Nombre De La Vacante
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
                  <div className="flex items-center">Ubicación</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Área De Interés</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Estado</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    <span
                      id="createdAt"
                      name="createdAt"
                      onClick={changeOrder}
                      className="text-black hover:text-black flex items-center"
                    >
                      Creado
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
                  <div className="flex items-center">Creado Por</div>
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
                  <div className="flex items-center">Postulados</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Acción</div>
                </th>
              </tr>
            </thead>
            {vacantes.vacantes && vacantes.vacantes.length > 0 && (
              <tbody>
                {vacantes.vacantes.map((vacante, i) => (
                  <tr
                    key={i}
                    className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300"
                  >
                    <td className="p-4">{vacante.nombre}</td>
                    <td className="p-4">{vacante.ubicacion}</td>
                    <td className="p-4">{vacante.Areas_Intere.nombre}</td>
                    <td className="p-4">
                      {vacante.activo ? "Activo" : "Inactivo"}
                    </td>
                    <td className="p-4">{DDMMYYYYHHMM2(vacante.createdAt)}</td>
                    <td className="p-4">
                      {vacante.CreadoPor.nombres} {vacante.CreadoPor.apellidos}{" "}
                      ({vacante.CreadoPor.tipo_identificacion}-
                      {vacante.CreadoPor.numero_identificacion})
                    </td>
                    <td className="p-4">{DDMMYYYYHHMM2(vacante.updatedAt)}</td>
                    <td className="p-4">{vacante.Vacantes_Empleados.length}</td>
                    <td className="p-4">
                      <Button
                        className="m-0 w-auto text-xs"
                        onClick={() => handleVerDetalles(vacante.vacante_id)}
                      >
                        Ver postulados
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
            vacantes.totalRegistros
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
              vacantes.cantidadPaginas
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
                  paginaActual >= vacantes.cantidadPaginas
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
