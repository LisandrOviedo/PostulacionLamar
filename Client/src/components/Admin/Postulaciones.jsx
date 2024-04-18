import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getAllCurriculos,
  getCurriculo,
  postPaginaActual,
  postLimitePorPagina,
  postFiltros,
  deleteFiltros,
} from "../../redux/curriculos/curriculoAction";

import { getAllAreasInteresActivas } from "../../redux/areasinteres/areainteresAction";

import { Button, Input, Label, Select, Title } from "../UI";

export function Postulaciones() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const curriculos = useSelector((state) => state.curriculos.curriculos);

  const paginaActual = useSelector((state) => state.curriculos.paginaActual);

  const limitePorPagina = useSelector(
    (state) => state.curriculos.limitePorPagina
  );

  const filtros = useSelector((state) => state.curriculos.filtros);

  const areas_interes_activas = useSelector(
    (state) => state.areas_interes.areas_interes_activas
  );

  const [filters, setFilters] = useState({
    cedula: filtros.cedula || "",
    apellidos: filtros.apellidos || "",
    area_interes_id: filtros.area_interes_id || "",
    estado: filtros.estado || "",
  });

  const handleChangePagination = (e) => {
    const { value } = e.target;

    dispatch(postLimitePorPagina(value));
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
    dispatch(postFiltros(filters));
  };

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllAreasInteresActivas());

    document.title = "Grupo Lamar - Postulaciones (Admin)";

    return () => {
      document.title = "Grupo Lamar";
    };
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllCurriculos(filtros, paginaActual, limitePorPagina));
  }, [filtros, paginaActual, limitePorPagina]);

  const convertirFecha = (fecha) => {
    const isoDateString = fecha;
    const isoDate = new Date(isoDateString);
    const day = String(isoDate.getDate()).padStart(2, "0");
    const month = String(isoDate.getMonth() + 1).padStart(2, "0");
    const year = String(isoDate.getFullYear());
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const handleVerDetalles = (curriculo_id) => {
    dispatch(getCurriculo(curriculo_id))
      .then(() => {
        navigate(`/curriculoDetalle/${curriculo_id}`);
      })
      .catch((error) => {
        return error;
      });
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
        <div className="flex items-end justify-center sm:col-span-2 lg:col-span-1 lg:justify-start gap-2">
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
                    Nombre Completo
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
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
                  <div className="flex items-center">Áreas de Interés</div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Grado Instrucción
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">
                    Últ. Modif.
                    <a href="#">
                      <img
                        src="/sort.svg"
                        alt="Sort.svg"
                        className="w-3 h-3 ms-1.5"
                      ></img>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-4 py-3">
                  <div className="flex items-center">Estado</div>
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
                    <td className="px-4 py-4">
                      {curriculo.Empleado.apellidos}{" "}
                      {curriculo.Empleado.nombres}
                    </td>
                    <td className="px-4 py-4">{curriculo.Empleado.cedula}</td>
                    <td className="px-4 py-4">{curriculo.Empleado.telefono}</td>
                    <td className="px-4 py-4">{curriculo.Empleado.correo}</td>
                    <td className="px-4 py-4">
                      {curriculo.Areas_Interes.map(
                        (area, index) =>
                          `${area.nombre}${
                            index !== curriculo.Areas_Interes.length - 1
                              ? ", "
                              : ""
                          }`
                      )}
                    </td>
                    <td className="px-4 py-4">{curriculo.grado_instruccion}</td>
                    <td className="px-4 py-4">
                      {convertirFecha(curriculo.updatedAt)}
                    </td>
                    <td className="px-4 py-4">{curriculo.estado}</td>
                    <td className="px-4 py-4">
                      <Button
                        className="m-0"
                        onClick={() =>
                          handleVerDetalles(curriculo.curriculo_id)
                        }
                      >
                        Detalles
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Mostrando{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {paginaActual * limitePorPagina - limitePorPagina}-
              {paginaActual * limitePorPagina > curriculos.totalRegistros
                ? curriculos.totalRegistros
                : paginaActual * limitePorPagina}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {curriculos.totalRegistros}
            </span>{" "}
            registros
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <span
                onClick={() => console.log("presionastexd")}
                // className={`inline-block ${
                //   isLoad.areas_interes ? null : "border-red-500"
                // }`}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 
                ${
                  paginaActual === 1
                    ? null
                    : "cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                Pág. Anterior
              </span>
            </li>

            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {Math.ceil(
                  curriculos.totalRegistros / limitePorPagina
                ).toString()}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
