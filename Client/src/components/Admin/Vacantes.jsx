import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getAllVacantes,
  postVacante,
  putActivo,
} from "../../redux/vacantes/vacantesActions";

import { getAllAreasInteresActivas } from "../../redux/areasInteres/areasInteresActions";

import { Button, Input, Label, Select, Span, TextArea, Title } from "../UI";

import {
  calcularPaginasARenderizar,
  infoPaginador,
} from "../../utils/paginacion";

import { DDMMYYYYHHMM2 } from "../../utils/formatearFecha";

import validations from "../../utils/validacionesVacantes";

import { MdCancel, MdVideoCameraBack } from "react-icons/md";

import Swal from "sweetalert2";

export default function Vacantes() {
  const navigate = useNavigate();

  const tableRef = useRef(null);

  const token = useSelector((state) => state.empleados.token);

  const empleado = useSelector((state) => state.empleados.empleado);

  const [showModalCrearVacante, setShowModalCrearVacante] = useState(false);

  const [vacantes, setVacantes] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  const [limitePorPagina, setLimitePorPagina] = useState(15);

  const [areasInteresActivas, setAreasInteresActivas] = useState([]);

  const [crearVacante, setCrearVacante] = useState({
    creado_por_id: empleado.empleado_id,
    anos_experiencia: 1,
  });

  const [errors, setErrors] = useState({});

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

  const handleOpenModal = () => {
    if (!showModalCrearVacante) {
      setShowModalCrearVacante(true);
    }
  };

  const handleCloseModal = () => {
    setShowModalCrearVacante(false);

    setCrearVacante({
      creado_por_id: empleado.empleado_id,
      anos_experiencia: 1,
    });
    setErrors({});
  };

  const handleValidate = (e) => {
    const { name, value } = e.target;

    setCrearVacante({ ...crearVacante, [name]: value });
    setErrors(validations({ ...crearVacante, [name]: value }));
  };

  const handleCrearVacante = async () => {
    await postVacante(token, crearVacante);

    handleCloseModal();

    handleFind();
  };

  const handleChangeActivo = (vacante_id) => {
    Swal.fire({
      text: "¿Seguro que desea activar / desactivar la vacante?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await putActivo(token, vacante_id);

        const dataVacantes = await getAllVacantes(
          token,
          filters,
          paginaActual,
          limitePorPagina
        );

        setVacantes(dataVacantes);
      }
    });
  };

  return (
    <>
      <div
        className={`mt-24 sm:mt-32 flex min-h-full flex-1 flex-col items-center px-6 lg:px-8 mb-8 ${
          showModalCrearVacante && "opacity-50 pointer-events-none"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title>Vacantes</Title>
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
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Select>
          </div>
          <div
            id="tabla"
            ref={tableRef}
            className="flex flex-col sm:flex-row sm:items-end justify-center sm:col-span-2 md:col-span-3 gap-2"
          >
            <Button className="m-0 w-auto" onClick={handleFind}>
              Buscar
            </Button>
            <Button className="m-0 w-auto" onClick={handleResetFilters}>
              Restablecer Filtros
            </Button>
            <Button
              className="m-0 w-auto bg-green-600 hover:bg-green-600/[.5]"
              onClick={handleOpenModal}
            >
              Crear Vacante
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
                        Nombre
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
                    <div className="flex items-center">Estado Vacante</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="createdAt"
                        name="createdAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Creada El
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
                    <div className="flex items-center">Creada Por</div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        id="updatedAt"
                        name="updatedAt"
                        onClick={changeOrder}
                        className="text-black hover:text-black flex items-center"
                      >
                        Últ. Modificación
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
                    <div className="flex items-center">Cant. Postulados</div>
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
                        {vacante.activo ? "Activa" : "Inactiva"}
                      </td>
                      <td className="p-4">
                        {DDMMYYYYHHMM2(vacante.createdAt)}
                      </td>
                      <td className="p-4">
                        {vacante.CreadoPor.nombres}{" "}
                        {vacante.CreadoPor.apellidos} (
                        {vacante.CreadoPor.tipo_identificacion}-
                        {vacante.CreadoPor.numero_identificacion})
                      </td>
                      <td className="p-4">
                        {DDMMYYYYHHMM2(vacante.updatedAt)}
                      </td>
                      <td className="p-4">
                        {vacante.Vacantes_Empleados.length}
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button
                          className="m-0 w-auto text-xs"
                          onClick={() => handleVerDetalles(vacante.vacante_id)}
                        >
                          Ver postulados
                        </Button>
                        <Button
                          className={`m-0 w-auto text-xs ${
                            vacante.activo
                              ? "bg-red-500 hover:bg-red-600 "
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          onClick={() => handleChangeActivo(vacante.vacante_id)}
                        >
                          {vacante.activo ? "Inactivar" : "Activar"}
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
      {/* Main modal */}
      {showModalCrearVacante && (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center">
          <div className="p-4 max-h-full sm:min-w-[600px]">
            {/* <!-- Modal content --> */}
            <div className="bg-gray-400 rounded-lg border-2 border-white overflow-y-auto max-h-[90vh]">
              {/* <!-- Modal header --> */}
              <div className="grid sm:grid-cols-2 p-4 md:p-5 border-b rounded-t gap-6">
                <div>
                  <Label htmlFor="nombreVacante" errors={errors.nombre}>
                    Nombre de la vacante
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="nombreVacante"
                      name="nombre"
                      onChange={handleValidate}
                      errors={errors.nombre}
                    />
                    {errors.nombre && (
                      <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                    )}
                  </div>
                  {errors.nombre && (
                    <Span className="m-0">{errors.nombre}</Span>
                  )}
                </div>
                <div>
                  <Label htmlFor="ubicacion" errors={errors.ubicacion}>
                    Ubicación de la vacante
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="ubicacion"
                      name="ubicacion"
                      onChange={handleValidate}
                      errors={errors.ubicacion}
                    />
                    {errors.ubicacion && (
                      <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                    )}
                  </div>
                  {errors.ubicacion && (
                    <Span className="m-0">{errors.ubicacion}</Span>
                  )}
                </div>
                <div>
                  <Label htmlFor="departamento" errors={errors.departamento}>
                    Departamento
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="departamento"
                      name="departamento"
                      onChange={handleValidate}
                      errors={errors.departamento}
                    />
                    {errors.departamento && (
                      <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                    )}
                  </div>
                  {errors.departamento && (
                    <Span className="m-0">{errors.departamento}</Span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="nivel_educativo"
                    errors={errors.nivel_educativo}
                  >
                    Nivel educativo
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="nivel_educativo"
                      name="nivel_educativo"
                      onChange={handleValidate}
                      errors={errors.nivel_educativo}
                    />
                    {errors.nivel_educativo && (
                      <MdCancel className="text-red-600 absolute right-2 top-[30%] text-xl" />
                    )}
                  </div>
                  {errors.nivel_educativo && (
                    <Span className="m-0">{errors.nivel_educativo}</Span>
                  )}
                </div>
                <div>
                  <Label htmlFor="anos_experiencia">Años de experiencia</Label>
                  <Input
                    type="number"
                    id="anos_experiencia"
                    name="anos_experiencia"
                    value={crearVacante.anos_experiencia}
                    onChange={handleValidate}
                    min="0"
                    max="20"
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="area_interes_id2">Área de interés</Label>
                  <Select
                    id="area_interes_id2"
                    name="area_interes_id"
                    onChange={handleValidate}
                    value={crearVacante.area_interes_id}
                  >
                    <option value="">Seleccione</option>
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
                <div className="sm:col-span-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <TextArea
                    id="descripcion"
                    name="descripcion"
                    type="textarea"
                    rows="4"
                    onChange={handleValidate}
                    placeholder="Ejemplo: Proactivo. Manejo de Excel. Atención al cliente."
                  />
                </div>
                <div className="flex justify-between sm:col-span-2">
                  <Button
                    className="m-0 w-auto text-xs"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="m-0 w-auto bg-green-600 hover:bg-green-600/[.5] text-xs"
                    onClick={handleCrearVacante}
                  >
                    Crear Vacante
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
